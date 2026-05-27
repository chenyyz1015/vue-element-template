import type { Locale } from "@/i18n/types";
import elementEn from "element-plus/es/locale/lang/en";
import elementZhCn from "element-plus/es/locale/lang/zh-cn";
import { LOCALE_OPTIONS } from "@/i18n/constants";
import { setLocale as setLocaleCache } from "@/utils/locale";

const elementLocales = {
  "zh-CN": elementZhCn,
  "en-US": elementEn,
} as const;

export const useLocale = () => {
  const { locale, t } = useI18n();

  const elementLocale = computed(() => elementLocales[locale.value as Locale]);

  const setLocale = (value: Locale) => {
    locale.value = value;
    setLocaleCache(value);
  };

  return {
    locale,
    t,
    elementLocale,
    localeOptions: LOCALE_OPTIONS,
    setLocale,
  };
};
