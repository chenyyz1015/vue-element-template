import type { PluginOption } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

export function unpluginAutoImport(): PluginOption {
  return AutoImport({
    imports: [
      "vue",
      "pinia",
      "@vueuse/core",
      "vue-router",
      {
        from: "./src/utils/dayjs",
        imports: [["default", "dayjs"]],
      },
    ],
    dirs: ["src/composables", "src/stores"],
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    dts: "./types/auto-imports.d.ts",
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
    },
  });
}
