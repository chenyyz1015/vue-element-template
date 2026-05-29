import type {
  RouteLocationNormalized,
  Router,
  RouteRecordNameGeneric,
  RouteRecordRaw,
} from "vue-router";
import type { AppRouteRecordRaw } from "./types";
import { canAccessByMeta } from "@/utils/permission";
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
