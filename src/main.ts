// import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgComponent from "~virtual/svg-component";
import { directivesPlugin } from "@/directives";
import { initSentry } from "@/sentry";
import { initPosthog } from "@/utils/posthog";
import { initThemePrimaryColor } from "@/utils/theme-color";
import { initThemeMode } from "@/utils/theme-mode";
import App from "./App.vue";

import { i18n } from "./i18n";
import router from "./router";
import { persistedState } from "./stores/persisted-state";
import "@/styles/index.scss";
import "virtual:uno.css";

const bootstrap = () => {
  const app = createApp(App);

  initThemeMode();
  initThemePrimaryColor();
  initSentry(app);
  initPosthog();

  const pinia = createPinia();
  pinia.use(persistedState);

  app.use(pinia);
  app.use(i18n);
  app.use(router);
  app.use(directivesPlugin);

  /**
   * 全局注册 ElementPlus 图标
   * vite/plugins 内置了 ElementPlusIconsResolver 图标按需加载
   * 以上方式二选其一即可
   */
  // for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  //   app.component(key, component);
  // }

  // 包装 SvgIcon，统一添加 .svg-icon 类名
  const SvgIcon = defineComponent({
    name: "SvgIcon",
    inheritAttrs: false,
    setup(_, { attrs, slots }) {
      return () => {
        const { class: cls, ...rest } = attrs;
        return h(SvgComponent, { ...rest, class: cls ? ["svg-icon", cls] : "svg-icon" }, slots.default);
      };
    },
  });
  app.component("SvgIcon", SvgIcon);

  app.mount("#app");
};

bootstrap();
