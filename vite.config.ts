import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import { plugins } from "./vite/plugins";
import { generateElementVarScss } from "./vite/scripts/generate-element-var";

generateElementVarScss();

export default defineConfig({
  plugins,
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
