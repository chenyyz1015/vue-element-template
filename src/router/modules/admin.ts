import type { AppRouteRecordRaw } from "../types";

/**
 * 受保护业务路由示例（登录后按 RBAC 动态注入）
 * meta.permissions / meta.roles 控制路由级访问
 */
export const adminRoutes: AppRouteRecordRaw[] = [
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/admin/index.vue"),
    meta: {
      titleKey: "route.admin",
      icon: "info",
      requiresAuth: true,
      permissions: ["admin:view"],
    },
  },
];
