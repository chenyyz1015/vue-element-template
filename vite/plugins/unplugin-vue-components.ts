import type { PluginOption } from "vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export function unpluginVueComponents(): PluginOption {
  return Components({
    dirs: ["src/components"],
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    dts: "./types/components.d.ts",
  });
}
