import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { appTheme } from "./src/styles/theme";

export default defineConfig({
  theme: {
    colors: {
      primary: appTheme.colors.primary,
      success: appTheme.colors.success,
      warning: appTheme.colors.warning,
      danger: appTheme.colors.danger,
      error: appTheme.colors.error,
      info: appTheme.colors.info,
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
  },
});
