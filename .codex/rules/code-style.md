# 代码风格规范

## 通用

- 使用 2 空格缩进，LF 换行
- 文件末尾保留一个空行
- 优先使用 `const`，需要重新赋值时使用 `let`，避免 `var`
- 使用 ESModule（`import` / `export`），不使用 CommonJS

## TypeScript

- 启用 strict 模式，避免 `any`（必要时用 `unknown`）
- 优先使用 `interface` 定义对象类型，`type` 用于联合/交叉类型
- 未使用的变量以 `_` 前缀命名（如 `_unused`）
- 函数参数和返回值需显式标注类型

## 函数定义

- 除特殊情况外，统一使用**箭头函数**定义方法（组件 `<script setup>` 内、composable、Store、同级 `helpers.ts` / `useXxx.ts` 等）
- **例外**（可保留 `function` 声明）：
  - `src/api/` 模块的 HTTP 请求封装（可按现有习惯使用 `export function`，便于与后端接口一一对应）
  - 必须提升（hoist）的相互递归（极少数场景）
  - 第三方库类型签名强制要求具名 `function` 时从宽
- Vue 生命周期钩子（`onMounted` 等）使用回调时，回调体内部方法仍优先箭头函数

```typescript
// ❌ 不要这样做（组件 / composable / helpers 内）
function handleSubmit() {
  // ...
}

async function fetchData() {
  // ...
}

// ✅ 推荐写法
const handleSubmit = () => {
  // ...
};

const fetchData = async () => {
  // ...
};
```

## 重构要求

对存量代码做规范化重构时，除 BEM、TS Props、`async/await`、箭头函数等约定外，还应：

- 将 `function foo()` / `async function foo()` 迁移为 `const foo = () =>` / `const foo = async () =>`（`src/api/` 等例外目录不在批量迁移范围内，除非该文件已在改动范围内）
- 将 `props` + `emit('update:xxx')` / `computed` 包装的双向绑定迁移为 **`defineModel`**（见下文「双向绑定」）
- 自定义事件名调整为 **kebab-case**，满足 ESLint `vue/custom-event-name-casing`（模板侧已用 kebab-case 的，同步修正 `defineEmits` 声明）

## 异步编程

- 统一使用 `async/await` 处理异步逻辑，**禁止使用 `.then()` / `.catch()` 链式调用**
  - **例外**：Element Plus 反馈组件提供的全局方法（如 `ElMessageBox.alert`、`ElMessageBox.confirm`、`ElMessageBox.prompt` 等），这些 API 返回的 Promise 仅用于确认操作，无实际异步数据流，可继续使用 `.then()` 链式调用
- 异步函数声明为 `async`，用 `await` 等待结果，用 `try/catch` 处理错误
- 仅在 Axios 拦截器等必须返回 Promise 的回调中可使用 `Promise.reject()` 或 `throw`

## Vue 单文件组件

- 统一使用 `<script setup lang="ts">`
- 统一使用 `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- Props 使用 `defineProps` + TypeScript 类型
- Emits 使用 `defineEmits` + 类型声明；**非 v-model 自定义事件名使用 kebab-case**（与 ESLint `vue/custom-event-name-casing` 一致，如 `query-table`、`set-layout`）
- **双向绑定**优先使用 Vue 3.4+ **`defineModel`**，替代 `defineProps` + `defineEmits('update:xxx')` + `computed` 包装，减少样板代码
- **体量**：单文件组件（含 `<script>`、`<template>`、`<style>`）**宜控制在约 300 行以内**，优先保证可读性；超出时按职责拆分，而非堆叠注释或折叠大块代码
- **DOM 模板引用**：统一使用 `useTemplateRef('xxx')` 通过字符串参数指定 ref 名称，**禁止**使用 `const xxx = ref<HTMLElement | null>(null)` 方式声明与模板引用的强绑定
- **方法定义**：除特殊情况外，组件内方法统一使用箭头函数（`const handleXxx = () => {}`）；存量重构时同步迁移

### 双向绑定（defineModel）

- 默认 v-model（`modelValue` / `update:modelValue`）使用 `defineModel<T>()`
- 命名 v-model（如 `v-model:visible`、`v-model:show-search`）使用 `defineModel<T>('visible')` 等
- `defineModel` 通过 auto-import 注入，**禁止**手动 `import { defineModel } from 'vue'`

## 目录与命名规范

### 公共组件（`src/components/`）

- 目录名：**PascalCase**，以 `index.vue` 作为组件入口
- 分类前缀：`Com` 非业务型、`Biz` 业务型
- 通过 `unplugin-vue-components` 自动引入，**禁止手动 import**

### 页面组件（`src/views/`）

- 目录名：**kebab-case**
- 页面私有子组件放 `components/` 子目录，文件名 **PascalCase**，在页面中**手动 import**

### 布局组件（`src/layouts/`）

- 目录名：**PascalCase**，以 `index.vue` 作为布局入口
- 布局私有子组件放 `components/` 子目录，文件名 **PascalCase**
- 在 `App.vue` 或路由配置中**手动 import** 布局组件

## 自动引入

- vue / vue-router / pinia / vue-i18n / @vueuse/core / dayjs — **禁止手动 import**
- `src/composables/` composables、`src/stores/modules/` stores — **禁止手动 import**
- `src/components/` 公共组件、Element Plus 组件 — **禁止手动 import**
- 布局组件、页面/布局私有子组件、同级辅助文件 — **允许且应手动 import**

## Pinia Store

- 使用 Setup Store 风格（`defineStore` + 箭头函数）
- Store 模块放 `src/stores/modules/`，文件名 **kebab-case**
- 需持久化的 Store 在 `defineStore` 第三参数配置 `persist`；临时状态（如 `loading`）用 `pick` / `omit` 排除
