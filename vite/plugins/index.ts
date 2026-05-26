import type { PluginOption } from "vite";
import { pluginVue } from "./plugin-vue";
import { unocss } from "./unocss";
import { unpluginAutoImport } from "./unplugin-auto-import";
import { unpluginSvgComponent } from "./unplugin-svg-component";
import { unpluginVueComponents } from "./unplugin-vue-components";

export const plugins: PluginOption[] = [
  pluginVue(),
  unocss(),
  unpluginAutoImport(),
  unpluginVueComponents(),
  unpluginSvgComponent(),
];
