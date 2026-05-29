import type { Router } from "vue-router";
import { i18n } from "@/i18n";
import { getToken } from "@/utils/auth";
import { FORBIDDEN_PATH, LOGIN_PATH, ROUTE_WHITE_LIST } from "./constants";
import { canAccessRoute } from "./helpers";

const setDocumentTitle = (titleKey?: string) => {
  const appTitle = i18n.global.t("app.title");
  document.title = titleKey
    ? `${i18n.global.t(titleKey)} | ${appTitle}`
    : appTitle;
};

const isWhiteListed = (path: string) =>
  ROUTE_WHITE_LIST.some((item) => path === item || path.startsWith(`${item}/`));

/** 注册路由守卫：标题、登录态、动态路由、RBAC */
export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    setDocumentTitle(to.meta.titleKey);

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

    if (to.meta.requiresAuth && !isWhiteListed(to.path)) {
      next({
        path: LOGIN_PATH,
        query: { redirect: to.fullPath },
      });
      return;
    }

    next();
  });
};
