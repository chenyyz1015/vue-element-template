import type { ComponentSize } from "element-plus";

interface SizeFontVars {
  "--el-font-size-extra-large": string;
  "--el-font-size-large": string;
  "--el-font-size-medium": string;
  "--el-font-size-base": string;
  "--el-font-size-small": string;
  "--el-font-size-extra-small": string;
}

/** 不同 size 对应的 Element Plus 字体 CSS 变量 */
export const SIZE_FONT_MAP: Record<ComponentSize, SizeFontVars> = {
  large: {
    "--el-font-size-extra-large": "22px",
    "--el-font-size-large": "20px",
    "--el-font-size-medium": "18px",
    "--el-font-size-base": "16px",
    "--el-font-size-small": "14px",
    "--el-font-size-extra-small": "13px",
  },
  default: {
    "--el-font-size-extra-large": "20px",
    "--el-font-size-large": "18px",
    "--el-font-size-medium": "16px",
    "--el-font-size-base": "14px",
    "--el-font-size-small": "13px",
    "--el-font-size-extra-small": "12px",
  },
  small: {
    "--el-font-size-extra-large": "18px",
    "--el-font-size-large": "16px",
    "--el-font-size-medium": "14px",
    "--el-font-size-base": "12px",
    "--el-font-size-small": "11px",
    "--el-font-size-extra-small": "10px",
  },
  "": {
    "--el-font-size-extra-large": "20px",
    "--el-font-size-large": "18px",
    "--el-font-size-medium": "16px",
    "--el-font-size-base": "14px",
    "--el-font-size-small": "13px",
    "--el-font-size-extra-small": "12px",
  },
};

/** 不同 size 对应的 html 根字号 */
export const HTML_FONT_SIZE_MAP: Record<ComponentSize, string> = {
  large: "16px",
  default: "14px",
  small: "12px",
  "": "14px",
};
