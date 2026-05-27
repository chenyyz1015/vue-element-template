import type { RouteLocationNormalized, RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { i18n } from "@/i18n";

const routes: RouteRecordRaw[] = [
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

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
  const titleKey = to.meta.titleKey;
  const appTitle = i18n.global.t("app.title");

  document.title = titleKey
    ? `${i18n.global.t(titleKey)} | ${appTitle}`
    : appTitle;
});

export default router;
