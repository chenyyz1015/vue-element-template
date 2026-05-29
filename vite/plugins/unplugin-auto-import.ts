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
      "vue-i18n",
      {
        from: "./src/utils/dayjs",
        imports: [["default", "dayjs"]],
      },
      {
        "@vueuse/core": [["usePermission", "useBrowserPermission"]],
      },
    ],
    dirs: ["src/composables", "src/stores/modules"],
    // 排除 @vueuse/core 预设中的 usePermission，改由上方别名导入为 useBrowserPermission
    ignore: ["usePermission"],
    resolvers: [ElementPlusResolver({ importStyle: "sass" })],
    dts: "./types/auto-imports.d.ts",
    eslintrc: {
      enabled: true,
      filepath: "./.eslintrc-auto-import.json",
    },
  });
}
