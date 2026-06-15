import type { Router } from "vue-router";
import NProgress from "nprogress";
import { cancelAllPendingRequests } from "@/api/request/pending";
import { i18n } from "@/i18n";
import { getToken } from "@/utils/auth";
import { LOGIN_PATH, ROUTE_WHITE_LIST } from "./constants";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false });

const t = i18n.global.t;

/** 注册路由守卫 */
export const setupRouterGuard = (router: Router) => {
  router.beforeEach(async (to, _from, next) => {
    NProgress.start();

    cancelAllPendingRequests();

    const token = getToken();

    if (token) {
      // 已登录
      if (to.path === LOGIN_PATH) {
        // 重定向回首页
        NProgress.done();
        next({ path: "/" });
      } else {
        // ...
      }
    } else {
      if (ROUTE_WHITE_LIST.includes(to.path)) {
        // 白名单
        next();
      } else {
        // 非白名单
        NProgress.done();
        next({ path: LOGIN_PATH, query: { redirect: to.fullPath } });
      }
    }
  });

  router.afterEach((to) => {
    NProgress.done();

    const titleKey = to.meta.titleKey;
    const appTitle = t("app.title");
    document.title = titleKey ? `${t(titleKey)} | ${appTitle}` : appTitle;
  });
};
