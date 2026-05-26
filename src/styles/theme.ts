/**
 * 应用默认定制主题（唯一配置入口，Element Plus + UnoCSS 共用）
 * 修改后 dev/build 会自动同步到 src/styles/element/var.scss
 */
export const appTheme = {
  colors: {
    /** 品牌主色（蓝） */
    primary: "#2563eb",
    success: "#16a34a",
    warning: "#d97706",
    danger: "#dc2626",
    error: "#dc2626",
    info: "#64748b",
  },
  radius: {
    base: "6px",
    small: "4px",
  },
} as const;
