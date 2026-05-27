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
- `src/components/` — 公共组件（`com-`* 非业务型、`biz-*` 业务型）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（main.ts 注册 i18n）

### 组件目录规范


| 类型      | 目录规范                       | 示例                                                 |
| ------- | -------------------------- | -------------------------------------------------- |
| 非业务公共组件 | `com-`* + `index.vue`      | `components/com-page-header/index.vue`             |
| 业务公共组件  | `biz-*` + `index.vue`      | `components/biz-user-card/index.vue`               |
| 页面      | kebab-case + `index.vue`   | `views/user-profile/index.vue`                     |
| 页面私有子组件 | PascalCase，放 `components/` | `views/about/components/TechStackTable.vue`        |
| 布局      | kebab-case + `index.vue`   | `layouts/devtools-layout/index.vue`                 |
| 布局私有子组件 | PascalCase，放 `components/` | `layouts/devtools-layout/components/DevToolsNav.vue` |
| Composable  | camelCase 文件名，use 前缀，箭头函数 | `composables/useLocale.ts`                         |
| Store 模块  | kebab-case 文件名，use 前缀箭头函数  | `stores/modules/user-profile.ts` → `useUserProfileStore` |


### 代码规范

- Vue 组件：`<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 异步逻辑：统一 `async/await`，禁止 `.then()` / `.catch()` 链式调用
- 配置文件：ESModule 格式
- Lint：ESLint + Stylelint + Commitlint
- 路径别名：`@/` → `src/`

### 开发原则

1. 最小改动范围 — 不做无关重构
2. 遵循现有代码风格和命名约定
3. 代码应自解释，仅在复杂逻辑处添加注释
4. 不编写 trivial 测试

## 项目结构

```
vite/
├── helpers/                 # Vite 配置辅助函数（如 parseProxy）
│   ├── parse.ts
│   └── index.ts
└── plugins/                 # Vite 插件（kebab-case 单文件，见 vite/plugins/index.ts）

types/                       # 构建生成的类型声明（auto-imports、components、svg-component）

src/
├── assets/icons/            # SVG 图标
├── components/              # 公共组件（com-*/biz-* + index.vue，auto-import）
├── composables/             # 组合式函数（auto-import，camelCase：useXxx.ts）
├── i18n/                    # 国际化（locales、createI18n）
├── layouts/                 # 布局（kebab-case + index.vue，手动引入）
├── router/
├── api/                     # HTTP 请求（request + modules + types）
├── stores/                  # Pinia
│   ├── persisted-state.ts   # 持久化插件 + Pinia key 生成
│   └── modules/             # Store 模块（auto-import，kebab-case）
├── styles/                  # 全局样式（element/var.scss 主题变量）
├── types/                   # 全局类型声明（env.d.ts 等）
├── utils/                   # 工具函数（storage 底层 + auth/locale 业务封装）
└── views/                   # 页面（kebab-case + index.vue）
    └── */components/        # 页面私有子组件（PascalCase，手动引入）
```

## AI 配置目录


| 目录                  | 用途            | 工具          |
| ------------------- | ------------- | ----------- |
| `CLAUDE.md`         | 项目级 AI 指令     | Claude Code |
| `.claude/commands/` | 自定义斜杠命令       | Claude Code |
| `.claude/rules/`    | 模块化规则         | Claude Code |
| `.claude/skills/`   | 自动调用工作流       | Claude Code |
| `.claude/agents/`   | 子 Agent 角色    | Claude Code |
| `.cursor/rules/`    | Cursor 规则     | Cursor      |
| `.cursor/skills/`   | Cursor Skills | Cursor      |


## UI 设计工作流（pencil-design-workflow）

当需求涉及 **设计、创建页面、创建组件、视觉稿、Pencil 原型** 时，自动应用 `.cursor/skills/pencil-design-workflow/SKILL.md`：

| Phase | 动作 | 工具 |
| ----- | ---- | ---- |
| 1 设计规划 | Design System + Brief | `ui-ux-pro-max` |
| 2 可视实现 | `.pen` 帧与变量 | Pencil MCP (`user-pencil`) |
| 3 迭代同步 | Vue 代码 ↔ Pencil | `pencil-sync.md` |

**主要路由（统一深色 devtools 风格）：** `/` 首页 · `/demo` 演示 · `/about` 关于 · `/devtools` 重定向至 `/`

复杂或多页面任务先 invoke **design-director** Agent（`.claude/agents/design-director.md`）分派角色。

设计产物目录：`design/briefs/`、`design/pages/`、`design-system/`（persist 时生成）。


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