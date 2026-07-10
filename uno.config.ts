import presetLegacyCompat from "@unocss/preset-legacy-compat";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from "unocss";
import { getPresetIconsConfig } from "./scripts/unocss-preset-icons";

const { safelist, collections } = getPresetIconsConfig();

export default defineConfig({
  presets: [
    presetWind3(),
    presetAttributify({ attributify: false }),
    presetIcons({
      scale: 1.2,
      warn: true,
      // 设置图标的默认 CSS 属性
      extraProperties: {
        display: "inline-block",
        width: "1em",
        height: "1em",
      },
      collections,
    }),
    presetTypography(),
    presetWebFonts(),
    presetLegacyCompat({
      commaStyleColorFunction: true,
      legacyColorSpace: true,
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  // 注册本地图标类名
  safelist,
  shortcuts: {
    "flex-center": "flex items-center justify-center",
    "flex-between": "flex items-center justify-between",
  },
});
