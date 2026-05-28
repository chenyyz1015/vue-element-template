import type { Locale, MessageSchema } from "./types";
import { createI18n } from "vue-i18n";
import { getLocale } from "@/utils/locale";
import { DEFAULT_LOCALE, FALLBACK_LOCALE } from "./constants";
import enUS from "./locales/en-US.json";
import zhCN from "./locales/zh-CN.json";

function getInitialLocale(): Locale {
  const stored = getLocale();
  if (stored === "zh-CN" || stored === "en-US") {
    return stored;
  }
  return DEFAULT_LOCALE;
}

export const i18n = createI18n<[MessageSchema], Locale>({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: FALLBACK_LOCALE,
  messages: {
    "zh-CN": zhCN,
    "en-US": enUS,
  },
});

export { DEFAULT_LOCALE, LOCALE_OPTIONS } from "./constants";
export type { Locale, MessageSchema } from "./types";
