import type { AppRouteRecordRaw } from "./types";
import { FORBIDDEN_PATH, LOGIN_PATH, NOT_FOUND_PATH } from "./constants";
import { publicAppRoutes } from "./modules/app";

/** 系统级常量路由（始终注册，不参与动态权限过滤） */
const systemRoutes: AppRouteRecordRaw[] = [
  {
    path: LOGIN_PATH,
    name: "Login",
    component: () => import("@/views/login/index.vue"),
    meta: { titleKey: "route.login", requiresAuth: false, hidden: true },
  },
  {
    path: FORBIDDEN_PATH,
    name: "Forbidden",
    component: () => import("@/views/forbidden/index.vue"),
    meta: { titleKey: "route.forbidden", requiresAuth: false, hidden: true },
  },
  {
    path: NOT_FOUND_PATH,
    name: "NotFound",
    component: () => import("@/views/not-found/index.vue"),
    meta: { titleKey: "route.notFound", requiresAuth: false, hidden: true },
  },
];

/** 应用启动时即注册的路由（系统路由 + 公开业务路由；不含通配符兜底） */
export const constantRoutes: AppRouteRecordRaw[] = [
  ...systemRoutes,
  ...publicAppRoutes,
];
