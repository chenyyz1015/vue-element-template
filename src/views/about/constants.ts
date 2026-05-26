export interface TechItem {
  name: string;
  desc: string;
}

export const TECH_STACK: TechItem[] = [
  { name: "Vite", desc: "下一代前端构建工具" },
  { name: "Vue 3", desc: "渐进式 JavaScript 框架" },
  { name: "TypeScript", desc: "类型安全的 JavaScript 超集" },
  { name: "Pinia", desc: "Vue 官方状态管理库" },
  { name: "Element Plus", desc: "Vue 3 组件库" },
  { name: "UnoCSS", desc: "原子化 CSS 引擎" },
  { name: "Axios", desc: "HTTP 请求库" },
  { name: "VueUse", desc: "组合式工具集（自动引入）" },
  { name: "dayjs", desc: "日期处理（中文 locale）" },
  { name: "lodash-es", desc: "工具函数（按需手动 import）" },
  { name: "unplugin-svg-component", desc: "SVG 图标组件" },
];
