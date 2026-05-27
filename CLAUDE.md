# Vue Element Template

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板，集成 Pinia、Element Plus、Axios、UnoCSS 及 AI 开发工具配置。

## 技术栈


| 类别     | 技术                                                   | 版本（`package.json`） |
| ------ | ---------------------------------------------------- | ------------------ |
| 框架     | Vue 3 (Composition API + `<script setup lang="ts">`) | ^3.5               |
| 构建     | Vite                                                 | ^7                 |
| 语言     | TypeScript                                           | ^5.9               |
| 状态管理   | Pinia                                                | ^3                 |
| 状态持久化  | pinia-plugin-persistedstate                            | ^4                 |
| UI 组件  | Element Plus                                         | ^2.14              |
| 国际化    | vue-i18n（Composition API，auto-import）                | ^11                |
| HTTP   | Axios                                                | ^1.13              |
| 样式     | UnoCSS                                               | ^66                |
| 组合式工具  | @vueuse/core（auto-import）                            | ^14                |
| 日期     | dayjs（中文 locale，auto-import）                         | ^1.11              |
| 工具函数   | lodash-es（按需手动 import）                               | ^4.18              |
| SVG 图标 | unplugin-svg-component（`src/assets/icons`）           | ^0.12              |
| 代码规范   | ESLint + Stylelint + Commitlint                      | ^9 / ^17 / ^19     |


## 项目结构

```
vite/
├── helpers/                 # Vite 配置辅助函数（如 parseProxy）
│   ├── parse.ts
│   └── index.ts
└── plugins/                 # Vite 插件（kebab-case 单文件）
    ├── plugin-vue.ts
    ├── unocss.ts
    ├── unplugin-auto-import.ts
    ├── unplugin-vue-components.ts
    ├── unplugin-svg-component.ts
    └── index.ts

types/                       # 构建生成的类型声明
├── auto-imports.d.ts
├── components.d.ts
└── svg-component.d.ts

src/
├── assets/icons/            # SVG 图标（unplugin-svg-component）
├── components/              # 公共组件（kebab-case 目录 + index.vue，auto-import）
│   ├── com-hello-card/      # 非业务型（com- 前缀）
│   └── com-page-header/
├── composables/             # 组合式函数（auto-import，camelCase：useXxx.ts）
│   └── useLocale.ts         # 语言切换
├── i18n/                    # 国际化（locales、createI18n）
├── layouts/                 # 布局组件（kebab-case 目录 + index.vue，手动引入）
│   └── default-layout/
├── router/                  # 路由配置
├── api/                     # HTTP 请求（request + modules + types）
├── stores/                  # Pinia
│   ├── persisted-state.ts   # 持久化插件配置 + Pinia key 生成
│   └── modules/             # Store 模块（auto-import，kebab-case）
│       └── app.ts
├── styles/                  # 全局样式
│   ├── index.scss
│   └── element/
│       ├── var.scss         # Element Plus 主题变量
│       └── index.scss       # Element Plus base 样式
├── types/                   # 全局类型声明（env.d.ts 等）
├── utils/                   # 通用工具函数
│   ├── auth.ts              # Token 读写封装
│   ├── locale.ts            # 语言偏好读写封装
│   ├── dayjs.ts             # dayjs 预配置
│   └── storage.ts           # 底层浏览器缓存封装
└── views/                   # 页面组件（kebab-case 目录 + index.vue）
    ├── home/
    │   └── index.vue
    └── about/
        ├── index.vue
        ├── constants.ts
        └── components/      # 页面私有子组件（PascalCase，手动引入）
            └── TechStackTable.vue
```

### 组件命名规范


| 类型      | 目录规范               | 入口文件        | 私有子组件                          |
| ------- | ------------------ | ----------- | ------------------------------ |
| 非业务公共组件 | `com-*` kebab-case | `index.vue` | —                              |
| 业务公共组件  | `biz-*` kebab-case | `index.vue` | —                              |
| 页面      | kebab-case         | `index.vue` | `components/*.vue`（PascalCase） |
| 布局      | kebab-case         | `index.vue` | `components/*.vue`（PascalCase） |


同级目录可放置 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件。

## 开发约定

### 自动引入

以下模块通过 `unplugin-auto-import` 自动引入，**无需手动 import**：

- `vue`（ref, computed, watch 等）
- `vue-router`（useRouter, useRoute 等）
- `pinia`（defineStore, storeToRefs 等）
- `vue-i18n`（useI18n 等）
- `src/composables/` 下的组合式函数（文件名 `useXxx.ts`，箭头函数导出）
- `src/stores/modules/` 下的 Store（kebab-case 文件名，箭头函数导出）
- `@vueuse/core` 组合式 API
- `dayjs`（`src/utils/dayjs.ts` 预配置）

以下组件通过 `unplugin-vue-components` 按需自动引入，**无需手动 import**：

- `<SvgIcon name="图标名" />`（图标放 `src/assets/icons/*.svg`，已在 `main.ts` 注册）
- Element Plus 组件
- `src/components/` 下公共组件（`com-`* 非业务型、`biz-*` 业务型）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（`main.ts` 中注册 i18n 实例）
- `lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`，禁止全量 import）

### 国际化

- 语言包放 `src/i18n/locales/`，类型基准为 `zh-CN.ts`（见 `src/i18n/types.ts`）
- 组件内使用 `useI18n()` 的 `t()`，**禁止**手动 import `useI18n`
- 路由标题使用 `meta.titleKey`，非硬编码字符串
- 切换语言使用 `useLocale()`，通过 `src/utils/locale.ts` 持久化并同步 Element Plus locale

### 缓存（Storage）

- 底层：`src/utils/storage.ts`，导出 `storage.local` / `storage.session`
- 逻辑 key 应使用 **UPPER_SNAKE_CASE**，不符合时在控制台 `console.warn`；物理 key 前缀 `VUE_ELEMENT_TEMPLATE_`
- `get` / `set` 均支持泛型（`get<T>` / `set<T>`），自动 JSON 序列化与反序列化；`clear()` 仅清除带前缀的 key
- **禁止**业务代码、composables、Store 模块直接 import `storage`
- 业务缓存通过 `src/utils/` 封装文件读写（如 `auth.ts`、`locale.ts`）
- Pinia 持久化：`src/stores/persisted-state.ts` 注册插件，并提供 `getPiniaPersistKey`（`app` → `PINIA_APP`）

### Pinia 持久化

- 插件：`pinia-plugin-persistedstate`，配置见 `src/stores/persisted-state.ts`（含 `getPiniaPersistKey`、`persistedState`）
- Store 模块放 `src/stores/modules/`，文件名 kebab-case（如 `user-profile.ts`），导出 `useXxxStore`
- 需持久化的 Store 在 `defineStore` 第三参数配置 `persist`
- 仅持久化必要字段，临时 UI 状态（如 `loading`）使用 `pick` / `omit` 排除

### 代码规范

- 遵循 ESLint、Stylelint、Commitlint 规范
- 配置文件使用 ESModule 格式（`.ts` + `"type": "module"`）
- Vue 组件统一使用 `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 异步逻辑统一使用 `async/await`，禁止 `.then()` / `.catch()` 链式调用
- 路径别名：`@/` → `src/`
- 详细规范见 `.claude/rules/code-style.md`

### Git 提交规范

使用 Conventional Commits：

```
feat: 新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式（不影响逻辑）
refactor: 重构
perf: 性能优化
test: 测试
build: 构建相关
ci: CI 配置
chore: 其他杂项
```

## 常用命令

```bash
npm run dev          # 启动开发服务器
npm run build        # 类型检查 + 生产构建
npm run build:stage  # 类型检查 + 预发构建
npm run preview      # 预览生产构建
npm run lint         # 运行 ESLint + Stylelint
npm run lint:fix     # 自动修复 lint 问题
```

## AI 工具配置

本项目遵循 Claude Code 官方推荐的项目结构，并兼容 Cursor 等主流 AI 开发工具：


| 工具          | 配置文件                                           |
| ----------- | ---------------------------------------------- |
| Claude Code | `CLAUDE.md`、`.claude/`                         |
| Cursor      | `.cursor/rules/`、`.cursor/skills/`、`AGENTS.md` |
| 通用          | `AGENTS.md`                                    |


详细 AI 工作流见 `.claude/commands/`、`.claude/skills/`、`.claude/agents/`。

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。


| 变量                   | 说明                                      | 默认值                                                                 | 适用范围              |
| -------------------- | --------------------------------------- | ------------------------------------------------------------------- | ------------------- |
| `VITE_APP_TITLE`     | 应用标题                                    | `Vue Element Template`                                              | 全部 env 文件           |
| `VITE_API_BASE_URL`  | API 基础地址                                | `/api`                                                              | 全部 env 文件           |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）                                | `60_000`                                                            | 全部 env 文件           |
| `VITE_API_PROXY_MAP` | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`） | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |

`VITE_API_PROXY_MAP` 由 `vite.config.ts` 通过 `vite/helpers/parse.ts` 解析，配置 dev server 多路径代理；stage / production 构建不使用该变量。