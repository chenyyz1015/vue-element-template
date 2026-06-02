import type { ComponentResolver } from "unplugin-vue-components/types";
import * as ElementPlusIcons from "@element-plus/icons-vue";

const iconNames = new Set(Object.keys(ElementPlusIcons));

/** 按需解析模板中的 Element Plus 图标组件（避免 main.ts 全量注册） */
export function ElementPlusIconsResolver(): ComponentResolver {
  return {
    type: "component",
    resolve: (name) => {
      if (!iconNames.has(name)) return;
      return { name, from: "@element-plus/icons-vue" };
    },
  };
}
