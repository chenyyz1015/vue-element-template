import type { Router, RouteRecordNameGeneric, RouteRecordRaw } from "vue-router";
import { constantRoutes } from "./routes";

/** 动态路由注入完成后追加 404 兜底（必须最后注册） */
export const addFallbackRoute = (router: Router) => {
  /** 404 通配符路由名 */
  const NOT_FOUND_CATCHALL_NAME = "NotFoundCatchAll";

  const fallbackRoute: RouteRecordRaw = {
    path: "/:pathMatch(.*)*",
    name: NOT_FOUND_CATCHALL_NAME,
    component: () => import("@/views/error/404.vue"),
    meta: { hidden: true },
  };

  if (router.hasRoute(NOT_FOUND_CATCHALL_NAME)) {
    router.removeRoute(NOT_FOUND_CATCHALL_NAME);
  }

  router.addRoute(fallbackRoute);
};

/** 移除动态注入的路由，保留 constantRoutes */
export const resetRouter = (router: Router) => {
  const constantRouteNames = new Set<RouteRecordNameGeneric>(
    constantRoutes.map((route) => route.name).filter((name): name is RouteRecordNameGeneric => Boolean(name))
  );

  router.getRoutes().forEach((route) => {
    if (route.name && !constantRouteNames.has(route.name)) {
      router.removeRoute(route.name);
    }
  });
};
