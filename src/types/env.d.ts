/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TITLE: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_API_BASE_URL: string;
  readonly VITE_API_PROXY_MAP: string;
  readonly VITE_API_TIMEOUT: string;
  readonly VITE_SENTRY_ENABLED: string;
  readonly VITE_SENTRY_DSN: string;
  readonly VITE_SENTRY_ENVIRONMENT: string;
  readonly VITE_SENTRY_RELEASE: string;
  readonly VITE_SENTRY_TRACES_SAMPLE_RATE: string;
  readonly VITE_SENTRY_PROJECT_SLUG: string;
  readonly VITE_POSTHOG_ENABLED: string;
  readonly VITE_POSTHOG_KEY: string;
  readonly VITE_POSTHOG_HOST: string;
  readonly VITE_CRYPTO_SECRET: string;
  readonly VITE_CRYPTO_IV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
