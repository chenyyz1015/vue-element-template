import type { ThemeMode } from "@/utils/theme-mode";
import { applyElementPlusPrimaryColor } from "@/utils/element-plus-theme";
import { getThemeModeStorage, THEME_MODE_KEY } from "@/utils/theme-mode";

export const useThemeMode = createSharedComposable(() => {
  const { primaryColor } = useThemeColor();

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

  const toggleMode = () => {
    mode.value = mode.value === "dark" ? "light" : "dark";
  };

  watch(mode, () => {
    applyElementPlusPrimaryColor(primaryColor.value);
  });

  return {
    mode,
    isDark,
    toggleMode,
  };
});
