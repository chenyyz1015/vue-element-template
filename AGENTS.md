# AGENTS.md

> 通用 AI Agent 指令文件，兼容 Cursor、Windsurf、GitHub Copilot 等主流 AI 开发工具。

## 项目概述

Vue 3 + TypeScript 企业级前端模板。技术栈：Vite、Pinia、pinia-plugin-persistedstate、Element Plus、vue-i18n、Axios、UnoCSS、VueUse、dayjs、lodash-es、unplugin-svg-component。

## 核心约定

### 自动引入（重要）

以下模块通过 `unplugin-auto-import` 自动引入，**禁止手动 import**：

- `vue` — ref, computed, watch, onMounted 等
- `vue-router` — useRouter, useRoute 等
- `pinia` — defineStore, storeToRefs 等
- `vue-i18n` — useI18n 等
- `src/composables/` — 所有组合式函数
- `src/stores/modules/` — 所有 Pinia Store 模块
- `@vueuse/core` — 如 useLocalStorage、useDebounceFn
- `dayjs` — 已配置中文 locale（勿 `import dayjs from 'dayjs'`）

**需手动 import**：

- `lodash-es` — 按函数引入（如 `import { cloneDeep } from 'lodash-es'`），禁止全量 import
- `@/utils/auth`、`@/utils/locale` 等缓存封装 — 禁止直接 import `@/utils/storage`

### 缓存（Storage）

- 底层 `src/utils/storage.ts`：`storage.local` / `storage.session`，方法 `get<T>` / `set<T>` / `remove` / `clear`
- 逻辑 key：**UPPER_SNAKE_CASE**；物理 key 前缀 `VUE_ELEMENT_TEMPLATE_`；违规 key 控制台警告
- 业务读写：`@/utils/auth`（Token）、`@/utils/locale`（语言偏好）
- Pinia 持久化：`src/stores/persisted-state.ts`（`getPiniaPersistKey` + `persistedState`）

以下组件通过 `unplugin-vue-components` 或插件注册，**禁止手动 import**：

- `<SvgIcon name="xxx" />` — 图标目录 `src/assets/icons/`，`name` 为文件名（不含扩展名）
- Element Plus 组件
- `src/components/` — 公共组件（`Com`_ 非业务型、`Biz_` 业务型，PascalCase 目录）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.d.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（main.ts 注册 i18n）

### 组件目录规范

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

### 代码规范

- Vue 组件：`<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 单文件组件宜 **≤300 行**；超出则拆子组件或同级逻辑/样式文件（见 `.claude/rules/code-style.md`）
- 异步逻辑：统一 `async/await`，禁止 `.then()` / `.catch()` 链式调用（Element Plus 反馈组件方法如 `ElMessageBox.alert/confirm/prompt` 除外）
- 函数定义：除特殊情况外（如 `src/api/` 请求封装），统一使用箭头函数；存量重构时同步迁移 `function` 声明（见 `.claude/rules/code-style.md`）
- 双向绑定：优先使用 `defineModel` 替代 `defineProps` + `defineEmits('update:xxx')`；非 v-model 自定义事件名使用 kebab-case
- 配置文件：ESModule 格式
- Lint：ESLint + Stylelint + Commitlint
- 路径别名：`@/` → `src/`
- CSS 类名：BEM + SMACSS `l-*` + scoped `@apply`（见 `.claude/rules/css-naming.md`）

### 开发原则

1. 最小改动范围 — 不做无关重构
2. 遵循现有代码风格和命名约定
3. 代码应自解释，仅在复杂逻辑处添加注释
4. 不编写 trivial 测试

## 项目结构

```
vite/
├── helpers/                       # Vite 配置辅助函数
└── plugins/                       # Vite 插件

types/                             # 构建生成的类型声明

src/
├── assets/                        # 静态资源
├── components/                    # 公共组件
├── composables/                   # 组合式函数
├── constants/                     # 全局常量
├── i18n/                          # 国际化
├── layouts/                       # 布局组件
├── router/                        # 全局路由
├── directives/                    # 全局自定义指令
├── api/                           # HTTP 请求
├── stores/                        # Pinia
├── styles/                        # 全局样式
├── types/                         # 全局类型声明
├── utils/                         # 工具类函数
└── views/                         # 页面组件
```

## AI 工具支持

本项目遵循 [Claude Code 官方推荐项目结构](https://docs.anthropic.com/en/docs/claude-code)，并兼容 Cursor 等主流 AI 开发工具。

```
├── design-system/                 # UI / AI 设计 SSOT
├── .claude/                       # Claude Code（规则与命令权威源）
│   ├── settings.json
│   ├── rules/
│   ├── commands/
│   ├── agents/
│   └── skills/
└── .cursor/                       # Cursor（与 .claude 目录对齐）
    ├── rules/
    ├── commands/
    ├── agents/
    └── skills/
```

**对齐约定**：规则详文以 `.claude/rules/*.md` 为准，Cursor 侧为 `.cursor/rules/*.mdc` 摘要；`agents` / `commands` / `skills` 两侧内容一致，维护时 Skill 与脚本内路径分别使用 `.claude/` 或 `.cursor/` 前缀。

### 斜杠命令（Claude Code：`/project:<name>` · Cursor：同名命令文件）

## 常用命令

```bash
npm run dev          # 开发服务器
npm run build        # 类型检查 + 构建
npm run build:stage  # 类型检查 + 预发构建
npm run lint         # 代码检查
npm run lint:fix     # 自动修复
```

## 提交规范

Conventional Commits：`feat:`、`fix:`、`docs:`、`style:`、`refactor:`、`perf:`、`test:`、`build:`、`ci:`、`chore:`
