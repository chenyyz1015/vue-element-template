import type { Router } from "vue-router";
import { i18n } from "@/i18n";
import { getToken } from "@/utils/auth";
import { canAccessByMeta } from "@/utils/permission";
import {
  FORBIDDEN_PATH,
  LOGIN_PATH,
  NOT_FOUND_PATH,
  ROUTE_WHITE_LIST,
} from "./constants";
import {
  addFallbackRoute,
  canAccessRoute,
  findAsyncRouteByPath,
  isPublicAppPath,
} from "./helpers";

const setDocumentTitle = (titleKey?: string) => {
  const appTitle = i18n.global.t("app.title");
  document.title = titleKey
    ? `${i18n.global.t(titleKey)} | ${appTitle}`
    : appTitle;
};

const isWhiteListed = (path: string) =>
  ROUTE_WHITE_LIST.some((item) => path === item || path.startsWith(`${item}/`));

/** 注册路由守卫：登录态、动态路由、RBAC；标题在 afterEach 更新 */
export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    const token = getToken();
    const userStore = useUserStore();
    const permissionStore = usePermissionStore();

    if (token) {
      if (to.path === LOGIN_PATH) {
        next({ path: "/" });
        return;
      }

      if (!permissionStore.isRoutesGenerated) {
        try {
          await userStore.fetchUserInfo();
          const accessRoutes = permissionStore.generateRoutes(
            userStore.roles,
            userStore.permissions
          );
          accessRoutes.forEach((route) => router.addRoute(route));
          addFallbackRoute(router);
          next({ ...to, replace: true });
          return;
        } catch {
          await userStore.logout();
          next({
            path: LOGIN_PATH,
            query: { redirect: to.fullPath },
          });
          return;
        }
      }

      if (to.matched.length === 0) {
        const asyncRoute = findAsyncRouteByPath(to.path);

        if (
          asyncRoute &&
          !canAccessByMeta(
            asyncRoute.meta,
            userStore.roles,
            userStore.permissions
          )
        ) {
          next({ path: FORBIDDEN_PATH });
          return;
        }

        next({ path: NOT_FOUND_PATH });
        return;
      }

      if (
        to.meta.requiresAuth &&
        !canAccessRoute(to, userStore.roles, userStore.permissions)
      ) {
        next({ path: FORBIDDEN_PATH });
        return;
      }

      next();
      return;
    }

    if (isWhiteListed(to.path) || isPublicAppPath(to.path)) {
      next();
      return;
    }

    const asyncRoute = findAsyncRouteByPath(to.path);

    if (asyncRoute?.meta?.requiresAuth) {
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
      });
      return;
    }

    if (to.matched.length === 0) {
      next({ path: NOT_FOUND_PATH });
      return;
    }

    next();
  });

  router.afterEach((to) => {
    setDocumentTitle(to.meta.titleKey);
  });
};
