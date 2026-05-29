import type { AppRouteRecordRaw } from "../types";

/** 公开业务路由（无需登录，注册于 constantRoutes） */
export const publicAppRoutes: AppRouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/devtools-landing/index.vue"),
    meta: { titleKey: "route.home", icon: "home", requiresAuth: false },
  },
  {
    path: "/demo",
    name: "Demo",
    component: () => import("@/views/demo/index.vue"),
    meta: { titleKey: "route.demo", icon: "home", requiresAuth: false },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/about/index.vue"),
    meta: { titleKey: "route.about", icon: "info", requiresAuth: false },
  },
  {
    path: "/devtools",
    redirect: "/",
  },
];
