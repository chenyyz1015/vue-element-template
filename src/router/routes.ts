import type { RouteRecordRaw } from "vue-router";
import { FORBIDDEN_PATH, HOME_PATH, LOGIN_PATH, NOT_FOUND_PATH, REGISTER_PATH, SERVER_ERROR_PATH } from "./constants";

/** 应用启动时即注册的路由（不含通配符兜底） */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_PATH,
  },
  {
    path: HOME_PATH,
    name: "Index",
    meta: { titleKey: "router.index" },
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: LOGIN_PATH,
    name: "Login",
    meta: { titleKey: "router.login" },
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: REGISTER_PATH,
    name: "Register",
    meta: { titleKey: "router.register" },
    component: () => import("@/views/auth/register.vue"),
  },
  {
    path: FORBIDDEN_PATH,
    name: "Forbidden",
    meta: { titleKey: "router.403" },
    component: () => import("@/views/error/403.vue"),
  },
  {
    path: NOT_FOUND_PATH,
    name: "NotFound",
    meta: { titleKey: "router.404" },
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: SERVER_ERROR_PATH,
    name: "ServerError",
    meta: { titleKey: "router.500" },
    component: () => import("@/views/error/500.vue"),
  },
];
