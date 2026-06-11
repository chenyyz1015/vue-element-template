import type { Locale } from "@/i18n/types";
import { storage } from "@/utils/storage";

/** 语言偏好存储键 */
const LOCALE_KEY = "LOCALE";

/** 获取语言偏好 */
export const getLocale = (): Locale | null => {
  return storage.local.get<Locale>(LOCALE_KEY);
};

/** 设置语言偏好 */
export const setLocale = (locale: Locale) => {
  storage.local.set<Locale>(LOCALE_KEY, locale);
};

/** 清除语言偏好 */
export const removeLocale = () => {
  storage.local.remove(LOCALE_KEY);
};
