import type { SentryApiErrorPayload, SentryApiErrorSource } from "./types";
import type { CustomRequestConfig, RequestError } from "@/api/types/common";
import * as Sentry from "@sentry/vue";
import { getSentryConfig, sanitizeForSentry } from "./config";
import { SENTRY_API_ERROR_TYPE } from "./types";

function resolveRequestUrl(config?: CustomRequestConfig): string | undefined {
  if (!config?.url) {
    return undefined;
  }
  const base = config.baseURL ?? import.meta.env.VITE_API_BASE_URL ?? "";
  if (config.url.startsWith("http")) {
    return config.url;
  }
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = config.url.startsWith("/")
    ? config.url
    : `/${config.url}`;
  return `${normalizedBase}${normalizedPath}`;
}

function buildApiErrorPayload(
  error: RequestError,
  config: CustomRequestConfig | undefined,
  source: SentryApiErrorSource
): SentryApiErrorPayload {
  return {
    type: SENTRY_API_ERROR_TYPE,
    source,
    message: error.message,
    request: {
      method: config?.method?.toUpperCase(),
      url: resolveRequestUrl(config),
      baseURL: config?.baseURL,
    },
    http:
      error.httpStatus !== undefined ? { status: error.httpStatus } : undefined,
    business: error.bizCode !== undefined ? { code: error.bizCode } : undefined,
    response: error.responseData
      ? { body: sanitizeForSentry(error.responseData) }
      : undefined,
    meta: {
      canceled: error.canceled,
      timestamp: new Date().toISOString(),
    },
  };
}

function resolveSource(error: RequestError): SentryApiErrorSource {
  if (error.canceled) {
    return "network";
  }
  if (error.bizCode !== undefined) {
    return "business";
  }
  if (error.httpStatus !== undefined) {
    return "http";
  }
  return "network";
}

/** 将 API 请求错误按统一格式上报至 Sentry */
export function captureApiRequestError(
  error: RequestError,
  config?: CustomRequestConfig
): void {
  const { enabled } = getSentryConfig();
  if (!enabled || error.canceled || config?.skipSentryReport) {
    return;
  }

  const source = resolveSource(error);
  const payload = buildApiErrorPayload(error, config, source);

  Sentry.withScope((scope) => {
    scope.setTag("error.type", SENTRY_API_ERROR_TYPE);
    scope.setTag("error.source", source);
    if (payload.request.method) {
      scope.setTag("http.method", payload.request.method);
    }
    if (payload.request.url) {
      scope.setTag("http.url", payload.request.url);
    }
    if (payload.http?.status !== undefined) {
      scope.setTag("http.status_code", String(payload.http.status));
    }
    if (payload.business?.code !== undefined) {
      scope.setTag("biz.code", String(payload.business.code));
    }

    scope.setContext("api_error", { ...payload });
    scope.setFingerprint([
      SENTRY_API_ERROR_TYPE,
      payload.request.method ?? "UNKNOWN",
      payload.request.url ?? "UNKNOWN",
      String(payload.http?.status ?? "none"),
      String(payload.business?.code ?? "none"),
    ]);

    Sentry.captureException(error);
  });
}
