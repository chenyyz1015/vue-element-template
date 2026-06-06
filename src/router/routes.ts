import type { RouteRecordRaw } from "vue-router";

/** 应用启动时即注册的路由（系统路由 + 公开业务路由；不含通配符兜底） */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Login",
    component: () => import("@/views/home/index.vue"),
  },
];
