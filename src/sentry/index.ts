import type { App } from "vue";
import * as Sentry from "@sentry/vue";
import { browserTracingIntegration } from "@sentry/vue";
import router from "@/router";
import { getSentryConfig, sanitizeForSentry } from "./config";

export { captureApiRequestError } from "./capture";
export { getSentryConfig, sanitizeForSentry } from "./config";
export { SENTRY_API_ERROR_TYPE } from "./types";
export type { SentryApiErrorPayload } from "./types";

/** 初始化 Sentry（配置来自环境变量；无 DSN 或未启用时不初始化） */
export function initSentry(app: App): void {
  const config = getSentryConfig();
  if (!config.enabled) {
    return;
  }

  const integrations =
    config.tracesSampleRate > 0 ? [browserTracingIntegration({ router })] : [];

  Sentry.init({
    app,
    dsn: config.dsn,
    environment: config.environment,
    release: config.release,
    enabled: config.enabled,
    tracesSampleRate: config.tracesSampleRate,
    integrations,
    attachProps: false,
    beforeSend(event) {
      if (event.request?.headers) {
        const headers = { ...event.request.headers };
        for (const key of Object.keys(headers)) {
          if (key.toLowerCase() === "authorization") {
            headers[key] = "[Filtered]";
          }
        }
        event.request.headers = headers;
      }

      const apiContext = event.contexts?.api_error;
      if (apiContext && typeof apiContext === "object") {
        event.contexts = {
          ...event.contexts,
          api_error: sanitizeForSentry(apiContext),
        };
      }

      return event;
    },
  });

  Sentry.setTag("app.name", import.meta.env.VITE_APP_NAME);
}
