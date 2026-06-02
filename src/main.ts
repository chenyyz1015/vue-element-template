import SvgIcon from "~virtual/svg-component";
import { directivesPlugin } from "@/directives";
import { initSentry } from "@/sentry";
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

  const pinia = createPinia();
  pinia.use(persistedState);

  app.use(pinia);
  app.use(i18n);
  app.use(router);
  app.use(directivesPlugin);
  app.component(SvgIcon.name ?? "SvgIcon", SvgIcon);

  app.mount("#app");
};

bootstrap();
