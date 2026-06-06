import { createRouter, createWebHistory } from "vue-router";
import { setupRouterGuard } from "./guard";
import { constantRoutes } from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 }),
});

setupRouterGuard(router);

export default router;
