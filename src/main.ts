import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import SvgIcon from "~virtual/svg-component";
import App from "./App.vue";
import router from "./router";

import "@/styles/index.scss";
import "virtual:uno.css";

const bootstrap = () => {
  const app = createApp(App);

  app.use(createPinia());
  app.use(router);
  app.component(SvgIcon.name ?? "SvgIcon", SvgIcon);

  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  app.mount("#app");
};

bootstrap();
