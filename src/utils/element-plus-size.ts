import type { ComponentSize } from "element-plus";
import { HTML_FONT_SIZE_MAP, SIZE_FONT_MAP } from "@/constants";
import { storage } from "./storage";

const SIZE_KEY = "SIZE";

export const getSize = (): ComponentSize | null => {
  return storage.local.get<ComponentSize>(SIZE_KEY);
};

export const setSize = (size: ComponentSize) => {
  storage.local.set<ComponentSize>(SIZE_KEY, size);
};

export const removeSize = () => {
  storage.local.remove(SIZE_KEY);
};

/** 调整全局 Element Plus 和 html 根字体大小 */
export const applyElementPlusFontSize = (size: ComponentSize): void => {
  const root = document.documentElement;

  // 1. 全局 rem 基准：影响所有使用 CSS 浏览器默认值的非 Element Plus 文字
  root.style.fontSize = HTML_FONT_SIZE_MAP[size] || "14px";

  // 2. Element Plus 字体 CSS 变量：控制 el-* 组件的字体大小
  const vars = SIZE_FONT_MAP[size];
  if (vars) {
    for (const [key, value] of Object.entries(vars)) {
      root.style.setProperty(key, value);
    }
  } else {
    for (const [key, value] of Object.keys(SIZE_FONT_MAP.default)) {
      root.style.setProperty(key, value);
    }
  }

  root.setAttribute("data-size", size);
};
