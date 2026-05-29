import type {
  RouteLocationNormalized,
  Router,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from "vue-router";
import type { AppRouteRecordRaw } from "./types";
import { canAccessByMeta } from "@/utils/permission";
import { FORBIDDEN_PATH, NOT_FOUND_PATH } from "./constants";
import { asyncRoutes } from "./modules";
import { publicAppRoutes } from "./modules/app";
import { constantRoutes } from "./routes";

/** 按 RBAC 过滤可访问的异步路由（递归处理 children） */
export const filterAccessibleRoutes = (
  routes: AppRouteRecordRaw[],
  roles: string[],
  permissions: string[]
): AppRouteRecordRaw[] => {
  return routes.reduce<AppRouteRecordRaw[]>((result, route) => {
    const cloned = { ...route };

    if (cloned.children?.length) {
      cloned.children = filterAccessibleRoutes(
        cloned.children as AppRouteRecordRaw[],
        roles,
        permissions
      );
    }

    const accessible =
      canAccessByMeta(cloned.meta, roles, permissions) ||
      Boolean(cloned.children?.length);

    if (accessible) {
      result.push(cloned);
    }

    return result;
  }, []);
};

const constantRouteNames = new Set<RouteRecordNameGeneric>(
  constantRoutes
    .map((route) => route.name)
    .filter((name): name is RouteRecordNameGeneric => Boolean(name))
);

const normalizeRoutePath = (parentPath: string, routePath: string) => {
  if (routePath.startsWith("/")) {
    return routePath;
  }

  const base = parentPath.endsWith("/") ? parentPath.slice(0, -1) : parentPath;
  return `${base}/${routePath}`.replace(/\/+/g, "/");
};

const flattenAsyncRoutes = (
  routes: AppRouteRecordRaw[],
  parentPath = ""
): AppRouteRecordRaw[] =>
  routes.flatMap((route) => {
    const fullPath = normalizeRoutePath(parentPath, route.path);
    const current = { ...route, path: fullPath };
    const children = route.children as AppRouteRecordRaw[] | undefined;

    if (children?.length) {
      return [current, ...flattenAsyncRoutes(children, fullPath)];
    }

    return [current];
  });

const asyncRoutePathMap = flattenAsyncRoutes(asyncRoutes);

/** 异步路由表中是否存在该 path（用于未注入路由前的守卫判断） */
export const findAsyncRouteByPath = (path: string) =>
  asyncRoutePathMap.find((route) => route.path === path);

/** 404 通配符路由名（动态注入，须晚于 asyncRoutes 注册） */
export const NOT_FOUND_CATCHALL_NAME = "NotFoundCatchAll";

const resolveUnknownPath = (path: string) => {
  const asyncRoute = findAsyncRouteByPath(path);

  if (!asyncRoute) {
    return NOT_FOUND_PATH;
  }

  const userStore = useUserStore();
  const hasAccess = canAccessByMeta(
    asyncRoute.meta,
    userStore.roles,
    userStore.permissions
  );

  return hasAccess ? NOT_FOUND_PATH : FORBIDDEN_PATH;
};

const fallbackRoute: AppRouteRecordRaw = {
  path: "/:pathMatch(.*)*",
  name: NOT_FOUND_CATCHALL_NAME,
  beforeEnter: (to) => resolveUnknownPath(to.path),
  component: () => import("@/views/not-found/index.vue"),
  meta: { hidden: true },
};

/** 公开业务页 path（constantRoutes 中无需登录的路由） */
export const isPublicAppPath = (path: string) =>
  publicAppRoutes.some((route) => route.path === path);

/** 动态路由注入完成后追加 404 兜底（必须最后注册） */
export const addFallbackRoute = (router: Router) => {
  if (router.hasRoute(NOT_FOUND_CATCHALL_NAME)) {
    router.removeRoute(NOT_FOUND_CATCHALL_NAME);
  }

  router.addRoute(fallbackRoute);
};

/** 移除动态注入的路由，保留 constantRoutes */
export const resetRouter = (router: Router) => {
  router.getRoutes().forEach((route) => {
    if (route.name && !constantRouteNames.has(route.name)) {
      router.removeRoute(route.name);
    }
  });
};

/** 导航目标是否可访问（合并 matched 链上所有 meta 约束） */
export const canAccessRoute = (
  route: RouteLocationNormalized | RouteRecordRaw,
  roles: string[],
  permissions: string[]
): boolean => {
  const matched = "matched" in route ? route.matched : [route];

  return matched.every((record) =>
    canAccessByMeta(record.meta, roles, permissions)
  );
};
