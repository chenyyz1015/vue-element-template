# GitHub Copilot 指令

本项目是基于 Vite + Vue 3 + TypeScript 的前端模板。请遵循以下约定：

- 使用 `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：script → template → style
- 公共组件：kebab-case 目录 + `index.vue`，非业务型 `com-` 前缀，业务型 `biz-` 前缀，放 `src/components/`
- 页面/布局：kebab-case 目录 + `index.vue`；私有子组件 PascalCase 放 `components/` 子目录
- vue / vue-router / pinia / @vueuse/core / dayjs 及 composables、stores 禁止手动 import
- SvgIcon 全局注册，SVG 放 src/assets/icons，模板用 `<SvgIcon name="文件名" />` 勿 import
- `src/components/` 公共组件禁止手动 import
- lodash-es 按需手动 import（如 `import { cloneDeep } from 'lodash-es'`），禁止全量 import
- 布局组件、页面/布局私有子组件、同级辅助文件需手动 import
- HTTP 请求通过 `src/api/request/` 封装，业务接口放 `src/api/modules/`，类型放 `src/api/types/模块名.d.ts`
- 异步逻辑统一使用 `async/await`，禁止 `.then()` / `.catch()` 链式调用
- 样式优先使用 UnoCSS 原子类
- 详细规范见 CLAUDE.md 和 `.claude/rules/`
