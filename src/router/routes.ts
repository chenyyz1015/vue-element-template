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
    meta: {},
    component: () => import("@/views/home/index.vue"),
  },
  {
    path: LOGIN_PATH,
    name: "Login",
    meta: {},
    component: () => import("@/views/auth/login.vue"),
  },
  {
    path: REGISTER_PATH,
    name: "Register",
    meta: {},
    component: () => import("@/views/auth/register.vue"),
  },
  {
    path: FORBIDDEN_PATH,
    name: "Forbidden",
    meta: {},
    component: () => import("@/views/error/403.vue"),
  },
  {
    path: NOT_FOUND_PATH,
    name: "NotFound",
    meta: {},
    component: () => import("@/views/error/404.vue"),
  },
  {
    path: SERVER_ERROR_PATH,
    name: "ServerError",
    meta: {},
    component: () => import("@/views/error/500.vue"),
  },
];
