import type { ThemeMode } from "@/utils/theme-mode";
import { applyElementPlusPrimaryColor } from "@/utils/element-plus-theme";
import {
  DEFAULT_PRIMARY_COLOR,
  getThemePrimaryColor,
} from "@/utils/theme-color";
import { getThemeModeStorage, THEME_MODE_KEY } from "@/utils/theme-mode";

export const useThemeMode = () => {
  const mode = useColorMode<ThemeMode>({
    attribute: "class",
    modes: {
      dark: "dark",
      light: "",
    },
    storageKey: THEME_MODE_KEY,
    storage: getThemeModeStorage(),
    initialValue: "light",
  });

  const isDark = computed(() => mode.value === "dark");

  const setMode = (value: ThemeMode) => {
    mode.value = value;
  };

  const toggleMode = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
  };

  watch(mode, () => {
    const color = getThemePrimaryColor() ?? DEFAULT_PRIMARY_COLOR;
    applyElementPlusPrimaryColor(color);
  });

  return {
    mode,
    isDark,
    setMode,
    toggleMode,
  };
};
