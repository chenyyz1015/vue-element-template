---
name: code-style
description: Vue 3 + TypeScript 项目代码风格规范，涵盖箭头函数、async/await、defineModel、组件目录、Pinia Store、命名约定、自动引入等。在编写或审查 Vue 组件、composable、store 时参考。
---

# 代码风格规范

## 通用

- 2 空格缩进，LF 换行
- 文件末尾保留一个空行
- 优先 `const`，需要重新赋值时用 `let`，避免 `var`
- 使用 ESModule（`import` / `export`），不使用 CommonJS

## TypeScript

- 启用 strict 模式，避免 `any`（必要时用 `unknown`）
- 优先使用 `interface` 定义对象类型，`type` 用于联合/交叉类型
- 未使用的变量以 `_` 前缀命名（如 `_unused`）
- 函数参数和返回值需显式标注类型

## 函数定义

- 除特殊情况外，统一使用**箭头函数**定义方法
- **例外**（可保留 `function` 声明）：
  - `src/api/` 模块的 HTTP 请求封装
  - 必须提升（hoist）的相互递归
  - 第三方库类型签名强制要求具名 `function` 时

```typescript
// ❌ 不要这样做
function handleSubmit() { }
async function fetchData() { }

// ✅ 推荐写法
const handleSubmit = () => { };
const fetchData = async () => { };
```

## 重构要求

对存量代码做规范化重构时：
- 将 `function foo()` 迁移为 `const foo = () =>`
- 将 `props` + `emit('update:xxx')` / `computed` 包装迁移为 **`defineModel`**
- 自定义事件名调整为 **kebab-case**

## 异步编程

- 统一使用 `async/await`，**禁止** `.then()` / `.catch()` 链式调用
- Element Plus 反馈组件方法（`ElMessageBox.alert/confirm/prompt`）除外

## 双向绑定

优先使用 `defineModel` 替代 `defineProps` + `defineEmits('update:xxx')`：

```vue
<script setup lang="ts">
// ✅ 推荐
const modelValue = defineModel<string>();
const visible = defineModel<boolean>("visible");

// ❌ 旧方式
const props = defineProps<{ modelValue: string }>();
const emit = defineEmits<{ "update:modelValue": [value: string] }>();
</script>
```

## 单文件组件

- 顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 宜 ≤300 行；超出则拆子组件或同级逻辑/样式文件

## 自动引入（禁止手动 import）

- `vue` — ref, computed, watch, onMounted 等
- `vue-router` — useRouter, useRoute
- `pinia` — defineStore, storeToRefs
- `vue-i18n` — useI18n
- `src/composables/` — 所有组合式函数
- `src/stores/modules/` — 所有 Pinia Store 模块
- `@vueuse/core` — useLocalStorage, useDebounceFn 等
- `dayjs` — 已配置中文 locale
- `<SvgIcon name="xxx" />` — 图标目录 `src/assets/icons/`
- Element Plus 组件
- `src/components/` 公共组件（`Com_` / `Biz_` 前缀）

## 需手动 import

- `lodash-es` — 按函数引入（如 `import { cloneDeep } from 'lodash-es'`），禁止全量
- `@/utils/auth`、`@/utils/locale` 等缓存封装
- `src/layouts/` 布局组件
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.d.ts`、`constants.ts`、`helpers.ts` 等
- `src/i18n/index.ts`

## 组件目录规范

| 类型           | 目录规范                             | 示例                                                 |
| -------------- | ------------------------------------ | ---------------------------------------------------- |
| 非业务公共组件 | `Com*` + `index.vue`                 | `components/ComPageHeader/index.vue`                 |
| 业务公共组件   | `Biz*` + `index.vue`                 | `components/BizUserCard/index.vue`                   |
| 页面           | kebab-case 目录                      | `views/auth/login.vue`、`views/auth/register.vue`    |
| 页面私有子组件 | PascalCase，放 `components/`         | `views/user/components/UserProfile.vue`              |
| 布局           | PascalCase 目录 + `index.vue`        | `layouts/DefaultLayout/index.vue`                    |
| 布局私有子组件 | PascalCase，放 `components/`         | `layouts/DefaultLayout/components/ThemeControls.vue` |
| Composable     | camelCase 文件名，use 前缀，箭头函数 | `composables/useLocale.ts`                           |
| Store 模块     | kebab-case 文件名，use 前缀箭头函数  | `stores/modules/user.ts` → `useUserStore`            |

## Pinia Store

- Setup Store 风格（`defineStore` + 箭头函数）
- Store 模块放 `src/stores/modules/`，文件名 **kebab-case**
- 导出命名：`useXxxStore`（camelCase）
- 持久化配置：`src/stores/persisted-state.ts`
- 跨 Store 引用在 setup 函数内完成，避免循环依赖

```typescript
// src/stores/modules/app.ts
export const useAppStore = defineStore(
  "app",
  () => {
    const loading = ref(false);
    const title = ref("");
    const setTitle = (value: string) => { title.value = value; };
    return { loading, title, setTitle };
  },
  { persist: { pick: ["title"] } }
);
```

## 缓存（Storage）

- 底层 `src/utils/storage.ts`：`storage.local` / `storage.session`
- 逻辑 key：**UPPER_SNAKE_CASE**；物理 key 前缀 `VUE_ELEMENT_TEMPLATE_`
- 业务读写：`@/utils/auth`（Token）、`@/utils/locale`（语言偏好）

## 命名约定

| 类型                   | 规范                                    | 示例                         |
| ---------------------- | --------------------------------------- | ---------------------------- |
| 常量                   | UPPER_SNAKE_CASE                        | `API_BASE_URL`               |
| 工具函数               | camelCase，箭头函数                     | `formatDate`                 |
| 组件/composable 内方法 | camelCase，箭头函数                     | `const handleSubmit = () =>` |
| 配置文件               | ESModule 格式                           | —                            |

完整原文见 `.claude/rules/code-style.md`。
