import type { PluginOption } from "vite";
import type { SentryBuildOptions } from "../helpers/sentry-build";
import {
  createSentryVitePlugin,
  resolveSentryBuildConfig,
} from "../helpers/sentry-build";

/** 构建期 Sentry Source Map 插件（依赖 SENTRY_* 与 VITE_SENTRY_RELEASE） */
export function pluginSentry(options: SentryBuildOptions): PluginOption[] {
  const config = resolveSentryBuildConfig(options);
  const plugin = createSentryVitePlugin(config);
  return plugin ? [plugin] : [];
}

export { resolveSentryBuildConfig } from "../helpers/sentry-build";
