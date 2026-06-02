export interface SentryRuntimeConfig {
  enabled: boolean;
  dsn: string;
  environment: string;
  release?: string;
  tracesSampleRate: number;
  projectSlug: string;
}

const SENSITIVE_KEYS = new Set([
  "password",
  "passwd",
  "token",
  "accesstoken",
  "access_token",
  "refreshtoken",
  "refresh_token",
  "authorization",
  "secret",
  "apikey",
  "api_key",
]);

function parseBoolean(
  value: string | undefined,
  defaultValue: boolean
): boolean {
  if (value === undefined || value === "") {
    return defaultValue;
  }
  return value === "true" || value === "1";
}

function parseSampleRate(value: string | undefined): number {
  if (!value) {
    return 0;
  }
  const rate = Number(value);
  if (Number.isNaN(rate) || rate < 0) {
    return 0;
  }
  return rate > 1 ? 1 : rate;
}

/** 从 Vite 环境变量解析 Sentry 静态配置 */
export function getSentryConfig(): SentryRuntimeConfig {
  const dsn = import.meta.env.VITE_SENTRY_DSN?.trim() ?? "";
  const enabledFromEnv = parseBoolean(
    import.meta.env.VITE_SENTRY_ENABLED,
    false
  );
  const enabled = enabledFromEnv && Boolean(dsn);

  const environment =
    import.meta.env.VITE_SENTRY_ENVIRONMENT?.trim() ||
    import.meta.env.MODE ||
    "development";

  const release = import.meta.env.VITE_SENTRY_RELEASE?.trim() || undefined;

  const projectSlug =
    import.meta.env.VITE_SENTRY_PROJECT_SLUG?.trim() ||
    import.meta.env.VITE_APP_NAME?.trim() ||
    "vue-element-template";

  const tracesSampleRate = parseSampleRate(
    import.meta.env.VITE_SENTRY_TRACES_SAMPLE_RATE
  );

  return {
    enabled,
    dsn,
    environment,
    release,
    tracesSampleRate,
    projectSlug,
  };
}

/** 递归脱敏对象中的敏感字段（浅层键名匹配，不修改原对象） */
export function sanitizeForSentry<T>(value: T, depth = 0): T {
  if (depth > 4 || value === null || value === undefined) {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map((item) => sanitizeForSentry(item, depth + 1)) as T;
  }

  if (typeof value !== "object") {
    return value;
  }

  const result: Record<string, unknown> = {};
  for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key.toLowerCase())) {
      result[key] = "[Filtered]";
      continue;
    }
    result[key] = sanitizeForSentry(child, depth + 1);
  }
  return result as T;
}
