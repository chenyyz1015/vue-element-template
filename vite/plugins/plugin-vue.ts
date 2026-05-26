import type { PluginOption } from "vite";
import vue from "@vitejs/plugin-vue";

export function pluginVue(): PluginOption {
  return vue();
}
