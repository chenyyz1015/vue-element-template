import SvgIcon from "~virtual/svg-component";
import App from "./App.vue";
import router from "./router";

import "@/styles/element/index.scss";
import "virtual:uno.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.component(SvgIcon.name ?? "SvgIcon", SvgIcon);

app.mount("#app");
