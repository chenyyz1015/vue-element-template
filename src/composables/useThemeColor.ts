import { presetPrimaryColors } from "@ant-design/colors";
import { applyElementPlusPrimaryColor } from "@/utils/element-plus-theme";
import { DEFAULT_PRIMARY_COLOR, getThemePrimaryColor, setThemePrimaryColor } from "@/utils/theme-color";

export interface ThemeColorPreset {
  name: string;
  value: string;
}

const themeColorPresets: ThemeColorPreset[] = Object.entries(presetPrimaryColors).map(([name, value]) => ({
  name,
  value,
}));

export const useThemeColor = createSharedComposable(() => {
  const primaryColor = ref(getThemePrimaryColor() ?? DEFAULT_PRIMARY_COLOR);

  const setPrimaryColor = (color: string) => {
    primaryColor.value = color;
    setThemePrimaryColor(color);
    applyElementPlusPrimaryColor(color);
  };

  useMutationObserver(
    document.documentElement,
    () => {
      applyElementPlusPrimaryColor(primaryColor.value);
    },
    { attributes: true, attributeFilter: ["class"] }
  );

  return {
    primaryColor,
    presetColors: themeColorPresets,
    setPrimaryColor,
  };
});
