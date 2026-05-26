import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/home/index.vue"),
    meta: { title: "首页" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("@/views/about/index.vue"),
    meta: { title: "关于" },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
  document.title = `${to.meta.title ?? "页面"} | Vue Element Template`;
});

export default router;
