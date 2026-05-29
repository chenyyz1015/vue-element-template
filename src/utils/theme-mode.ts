import { storage } from "@/utils/storage";

export type ThemeMode = "light" | "dark";

/** 明暗模式存储键 */
export const THEME_MODE_KEY = "THEME_MODE";

const themeModeStorage = storage.local.toStorageLike();

/** 供 useColorMode 使用的存储适配器 */
export const getThemeModeStorage = () => themeModeStorage;

/** 获取已保存的明暗模式 */
export const getThemeMode = (): ThemeMode | null => {
  const raw = themeModeStorage.getItem(THEME_MODE_KEY);
  if (raw === "light" || raw === "dark") {
    return raw;
  }
  return null;
};

/** 启动时在 html 上同步明暗 class，减少闪烁 */
export const initThemeMode = () => {
  const mode = getThemeMode() ?? "light";
  document.documentElement.classList.toggle("dark", mode === "dark");
};
