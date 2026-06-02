/** 统一 API 请求异常上报类型标识 */
export const SENTRY_API_ERROR_TYPE = "api_request_error" as const;

export type SentryApiErrorSource = "http" | "business" | "network";

/** 上报至 Sentry 的 API 异常结构化载荷 */
export interface SentryApiErrorPayload {
  type: typeof SENTRY_API_ERROR_TYPE;
  source: SentryApiErrorSource;
  message: string;
  request: {
    method?: string;
    url?: string;
    baseURL?: string;
  };
  http?: {
    status?: number;
  };
  business?: {
    code?: number;
  };
  response?: {
    body?: unknown;
  };
  meta: {
    canceled?: boolean;
    timestamp: string;
  };
}
