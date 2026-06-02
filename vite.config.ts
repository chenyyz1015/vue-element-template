import { cwd } from "node:process";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import {
  manualChunks,
  mergeSentryEnv,
  parseProxy,
  resolveSentryBuildConfig,
} from "./vite/helpers";
import { plugins } from "./vite/plugins";
import { pluginSentry } from "./vite/plugins/plugin-sentry";

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, cwd(), ["VITE_"]);
  const sentryEnv = mergeSentryEnv(loadEnv(mode, cwd(), ["SENTRY_"]));
  const proxy = parseProxy(viteEnv.VITE_API_PROXY_MAP);
  const sentryOptions = { viteEnv, sentryEnv };
  const sentryBuild = resolveSentryBuildConfig(sentryOptions);

  return {
    build: {
      // element-plus 按需 + manualChunks 后 vendor 约 750kB，高于默认 500kB 阈值
      chunkSizeWarningLimit: 800,
      sourcemap: sentryBuild.shouldGenerateSourcemap ? "hidden" : false,
      rollupOptions: {
        output: { manualChunks },
      },
    },
    plugins: [...plugins, ...pluginSentry(sentryOptions)],
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
