import { fileURLToPath, URL } from "node:url";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import SvgComponent from "unplugin-svg-component/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import { generateElementVarScss } from "./vite/scripts/generate-element-var";

generateElementVarScss();

export default defineConfig({
  plugins: [
    vue(),
    UnoCSS(),
    AutoImport({
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
    }),
    Components({
      dirs: ["src/components"],
      resolvers: [ElementPlusResolver({ importStyle: "sass" })],
      dts: "./types/components.d.ts",
    }),
    SvgComponent({
      iconDir: fileURLToPath(new URL("./src/assets/icons", import.meta.url)),
      preserveColor: fileURLToPath(
        new URL("./src/assets/icons/preserve-color", import.meta.url)
      ),
      dts: true,
      dtsDir: fileURLToPath(new URL("./types", import.meta.url)),
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/var.scss" as *;\n`,
      },
    },
  },
  server: {
    port: 5173,
    open: true,
    host: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
