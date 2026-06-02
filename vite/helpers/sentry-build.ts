import type { PluginOption } from "vite";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { cwd, env as nodeEnv } from "node:process";
import { sentryVitePlugin } from "@sentry/vite-plugin";

const SENTRY_BUILD_PLUGIN_ENV_FILE = ".env.sentry-build-plugin";

/** 读取 @sentry/vite-plugin 约定的构建 env 文件（Vite loadEnv 不会自动加载） */
export function loadSentryBuildPluginEnv(
  root: string = cwd()
): Record<string, string> {
  const filePath = resolve(root, SENTRY_BUILD_PLUGIN_ENV_FILE);
  if (!existsSync(filePath)) {
    return {};
  }

  const result: Record<string, string> = {};
  const content = readFileSync(filePath, "utf8");

  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }
    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }
    const key = trimmed.slice(0, separatorIndex).trim();
    let value = trimmed.slice(separatorIndex + 1).trim();
    if (
      (value.startsWith("\"") && value.endsWith("\"")) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    result[key] = value;
  }

  return result;
}

/**
 * 合并 SENTRY_* 环境变量（优先级从低到高）：
 * .env.sentry-build-plugin → Vite loadEnv → process.env
 */
export function mergeSentryEnv(
  loadEnvResult: Record<string, string>,
  root: string = cwd()
): Record<string, string> {
  return {
    ...loadSentryBuildPluginEnv(root),
    ...loadEnvResult,
  };
}

export interface SentryBuildOptions {
  /** Vite loadEnv 结果（含 VITE_*） */
  viteEnv: Record<string, string>;
  /** Vite loadEnv 结果（含 SENTRY_*，优先于 process.env） */
  sentryEnv?: Record<string, string>;
}

function readSentryEnv(
  sentryEnv: Record<string, string> | undefined,
  key: keyof NodeJS.ProcessEnv
): string | undefined {
  const fromLoadEnv = sentryEnv?.[key]?.trim();
  if (fromLoadEnv) {
    return fromLoadEnv;
  }
  const fromProcess = nodeEnv[key]?.trim();
  return fromProcess || undefined;
}

export interface SentryBuildConfig {
  shouldUpload: boolean;
  shouldGenerateSourcemap: boolean;
  org?: string;
  url?: string;
  authToken?: string;
  project?: string;
  release?: string;
}

/** 解析构建期 Sentry Source Map 上传配置（仅 Node / vite.config 使用） */
export function resolveSentryBuildConfig({
  viteEnv,
  sentryEnv,
}: SentryBuildOptions): SentryBuildConfig {
  const uploadFlag =
    readSentryEnv(sentryEnv, "SENTRY_UPLOAD_SOURCEMAPS") === "true";
  const authToken = readSentryEnv(sentryEnv, "SENTRY_AUTH_TOKEN");
  const org = readSentryEnv(sentryEnv, "SENTRY_ORG");
  const url = readSentryEnv(sentryEnv, "SENTRY_URL");
  const project =
    viteEnv.VITE_SENTRY_PROJECT_SLUG?.trim() || viteEnv.VITE_APP_NAME?.trim();
  const release = viteEnv.VITE_SENTRY_RELEASE?.trim();

  const shouldUpload = Boolean(
    uploadFlag && authToken && org && url && project && release
  );

  if (uploadFlag && !shouldUpload) {
    const missing: string[] = [];
    if (!authToken) missing.push("SENTRY_AUTH_TOKEN");
    if (!org) missing.push("SENTRY_ORG");
    if (!url) missing.push("SENTRY_URL");
    if (!project) missing.push("VITE_SENTRY_PROJECT_SLUG 或 VITE_APP_NAME");
    if (!release) missing.push("VITE_SENTRY_RELEASE");
    console.warn(
      `[sentry] SENTRY_UPLOAD_SOURCEMAPS=true 但未上传 Source Map，缺少: ${missing.join(", ")}`
    );
  }

  return {
    shouldUpload,
    shouldGenerateSourcemap: shouldUpload,
    org,
    url,
    authToken,
    project,
    release,
  };
}

/** 创建 Sentry Vite 插件（须放在其它插件之后） */
export function createSentryVitePlugin(
  config: SentryBuildConfig
): PluginOption | undefined {
  if (!config.shouldUpload) {
    return undefined;
  }

  return sentryVitePlugin({
    org: config.org!,
    project: config.project!,
    authToken: config.authToken!,
    url: config.url,
    release: {
      name: config.release!,
    },
    sourcemaps: {
      filesToDeleteAfterUpload: ["./dist/**/*.map"],
    },
  });
}
