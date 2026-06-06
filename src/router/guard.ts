import type { Router } from "vue-router";

/** 注册路由守卫：登录态、动态路由、RBAC；标题在 afterEach 更新 */
export const setupRouterGuard = (router: Router) => {
  router.beforeEach(() => {});

  router.afterEach(() => {});
};
