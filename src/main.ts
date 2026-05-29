import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "~virtual/svg-component";
import { vPermission } from "@/directives/permission";
import { initThemePrimaryColor } from "@/utils/theme-color";
import { initThemeMode } from "@/utils/theme-mode";
import App from "./App.vue";
import { i18n } from "./i18n";

import router from "./router";
import { persistedState } from "./stores/persisted-state";
import "@/styles/index.scss";
import "virtual:uno.css";

const bootstrap = () => {
  initThemeMode();
  initThemePrimaryColor();
  const app = createApp(App);

  const pinia = createPinia();
  pinia.use(persistedState);

  app.use(pinia);
  app.use(i18n);
  app.use(router);
  app.directive("permission", vPermission);
  app.component(SvgIcon.name ?? "SvgIcon", SvgIcon);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.mount("#app");
};

bootstrap();
