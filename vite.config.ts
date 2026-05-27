import { cwd } from "node:process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import { parseProxy } from "./vite/helpers";
import { plugins } from "./vite/plugins";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, cwd(), ["VITE_"]);
  const proxy = parseProxy(env.VITE_API_PROXY_MAP);
  return {
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
      proxy,
    },
  };
});
