import { applyElementPlusPrimaryColor } from "@/utils/element-plus-theme";
import { storage } from "@/utils/storage";

/** 主题色存储键 */
export const THEME_PRIMARY_COLOR_KEY = "THEME_PRIMARY_COLOR";

/** 与 SCSS 默认主色一致（见 styles/element/var.scss） */
export const DEFAULT_PRIMARY_COLOR = "#2563eb";

/** 获取已保存的主题色 */
export const getThemePrimaryColor = (): string | null => {
  return storage.local.get<string>(THEME_PRIMARY_COLOR_KEY);
};

/** 保存主题色 */
export const setThemePrimaryColor = (color: string) => {
  storage.local.set<string>(THEME_PRIMARY_COLOR_KEY, color);
};

/** 清除主题色偏好 */
export const removeThemePrimaryColor = () => {
  storage.local.remove(THEME_PRIMARY_COLOR_KEY);
};

/** 启动时应用已缓存主题色 */
export const initThemePrimaryColor = () => {
  const color = getThemePrimaryColor() ?? DEFAULT_PRIMARY_COLOR;
  applyElementPlusPrimaryColor(color);
};
