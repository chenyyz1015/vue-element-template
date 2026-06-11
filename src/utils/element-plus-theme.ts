import { generate } from "@ant-design/colors";

const PRIMARY_INDEX = 5;
const DARK_INDEX = 7;
const LIGHT_LEVEL_COUNT = 9;
const DARK_BACKGROUND = "#141414";

/** 解析十六进制颜色为 RGB 分量 */
const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [
    Number.parseInt(h.substring(0, 2), 16),
    Number.parseInt(h.substring(2, 4), 16),
    Number.parseInt(h.substring(4, 6), 16),
  ];
};

/** 将 RGB 分量格式化为十六进制字符串 */
const rgbToHex = (r: number, g: number, b: number): string => {
  const toHex = (n: number) =>
    Math.round(Math.max(0, Math.min(255, n)))
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

/**
 * 将颜色与白色混合
 * @param color 原始颜色（十六进制）
 * @param percent 白色占比（0~1），0 为纯色，1 为纯白
 */
const mixWithWhite = (color: string, percent: number): string => {
  const [r, g, b] = hexToRgb(color);
  const mix = (channel: number) => channel + (255 - channel) * percent;
  return rgbToHex(mix(r), mix(g), mix(b));
};

/** 将 @ant-design/colors 色阶写入 Element Plus CSS 变量 */
export const applyElementPlusPrimaryColor = (color: string, options?: { dark?: boolean }): void => {
  const isDark = options?.dark ?? document.documentElement.classList.contains("dark");
  const palette = generate(color, isDark ? { theme: "dark", backgroundColor: DARK_BACKGROUND } : {});
  const root = document.documentElement;

  root.style.setProperty("--el-color-primary", palette[PRIMARY_INDEX]);

  /**
   * Element Plus light 色阶通过将主色与白色混合生成（参见 element-plus SCSS 源码）：
   *   --el-color-primary-light-1: mix(#fff, $color-primary, 10%);
   *   ...
   *   --el-color-primary-light-9: mix(#fff, $color-primary, 90%);
   *
   * @ant-design/colors 提供 10 色调色板，主色在 index 5：
   *  - 仅 5 个亮色（index 0~4），不够映射 9 个 light 等级;
   *  - light-1 ~ light-9 → 主色与白色按比例混合（仿 Element Plus mix 逻辑）;
   */
  for (let level = 1; level <= LIGHT_LEVEL_COUNT; level++) {
    // light-1 ~ light-9: 主色与白色按 10%~90% 混合
    // Element Plus 的 light-n 对应 mix(#fff, primary, n*10%)
    const whitePercent = level * 0.1;
    root.style.setProperty(`--el-color-primary-light-${level}`, mixWithWhite(palette[PRIMARY_INDEX], whitePercent));
  }

  root.style.setProperty("--el-color-primary-dark-2", palette[DARK_INDEX] ?? palette[PRIMARY_INDEX + 1]);
};
