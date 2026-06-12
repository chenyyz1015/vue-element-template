# 企业级 Vue 前端项目模板

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板，集成 Pinia、Element Plus、Axios、UnoCSS 及 AI 开发工具配置。

## 技术栈

| 类别       | 技术                                                 | 版本（`package.json`） |
| ---------- | ---------------------------------------------------- | ---------------------- |
| 框架       | Vue 3 (Composition API + `<script setup lang="ts">`) | ^3.5                   |
| 构建       | Vite                                                 | ^7                     |
| 语言       | TypeScript                                           | ^5.9                   |
| 状态管理   | Pinia                                                | ^3                     |
| 状态持久化 | pinia-plugin-persistedstate                          | ^4                     |
| UI 组件    | Element Plus                                         | ^2.14                  |
| 国际化     | vue-i18n（Composition API，auto-import）             | ^11                    |
| HTTP       | Axios                                                | ^1.13                  |
| 样式       | UnoCSS                                               | ^66                    |
| 组合式工具 | @vueuse/core（auto-import）                          | ^14                    |
| 日期       | dayjs（中文 locale，auto-import）                    | ^1.11                  |
| 工具函数   | lodash-es（按需手动 import）                         | ^4.18                  |
| SVG 图标   | unplugin-svg-component（`src/assets/icons`）         | ^0.12                  |
| 代码规范   | ESLint + Stylelint + Commitlint                      | ^9 / ^17 / ^19         |

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

### 组件命名规范

| 类型           | 目录规范          | 入口文件    | 私有子组件                       |
| -------------- | ----------------- | ----------- | -------------------------------- |
| 非业务公共组件 | `Com*` PascalCase | `index.vue` | —                                |
| 业务公共组件   | `Biz*` PascalCase | `index.vue` | —                                |
| 页面           | kebab-case 目录   | ...         | `components/*.vue`（PascalCase） |
| 布局           | PascalCase 目录   | `index.vue` | `components/*.vue`（PascalCase） |

同级目录可放置 `types.d.ts`、`constants.ts`、`helpers.ts` 等辅助文件。

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
- `src/components/` 下公共组件（`Com`_ 非业务型、`Biz_` 业务型，PascalCase 目录）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（`main.ts` 中注册 i18n 实例）
- `lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`，禁止全量 import）

### 国际化

- 语言包放 `src/i18n/locales/`，类型基准为 `zh-CN.json`（见 `src/i18n/types.ts`）
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
- 单文件组件宜 **≤300 行**（含 style）；超出则拆子组件、同级 `useXxx.ts` / `helpers.ts` 或 `styles/` partial（见 `.claude/rules/code-style.md`）
- 异步逻辑统一使用 `async/await`，禁止 `.then()` / `.catch()` 链式调用（Element Plus 反馈组件方法如 `ElMessageBox.alert/confirm/prompt` 除外）
- 除特殊情况外，方法统一使用箭头函数；存量重构时同步迁移 `function` 声明（见 `.claude/rules/code-style.md`「函数定义」「重构要求」）
- 双向绑定优先 `defineModel`；`defineEmits` 自定义事件名使用 kebab-case（见 `.claude/rules/code-style.md`「双向绑定」）
- 路径别名：`@/` → `src/`
- CSS 类名：BEM + SMACSS `l-`\* + scoped `@apply`（见 `.claude/rules/css-naming.md`）
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

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                             | 说明                                                        | 默认值                                                                                    | 适用范围              |
| -------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `VITE_APP_NAME`                  | 项目名（`ui-ux-pro-max -p`、宜与 `package.json` name 一致） | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_APP_TITLE`                 | 应用展示标题（与 i18n `app.title` 对齐）                    | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_GITHUB_URL`                | GitHub 仓库地址（导航/页脚/关于等外链）                     | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_API_BASE_URL`              | API 基础地址                                                | `/api`                                                                                    | 全部 env 文件         |
| `VITE_API_TIMEOUT`               | 请求超时（毫秒）                                            | `60_000`                                                                                  | 全部 env 文件         |
| `VITE_API_PROXY_MAP`             | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`）     | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |
| `VITE_SENTRY_ENABLED`            | 是否启用 Sentry（须同时配置有效 DSN）                       | 开发 `false`，stage/production `true`                                                     | 全部 env 文件         |
| `VITE_SENTRY_DSN`                | Sentry DSN（敏感项建议放 `*.local`）                        | 空                                                                                        | 全部 env 文件         |
| `VITE_SENTRY_ENVIRONMENT`        | 上报环境标识                                                | `development` / `stage` / `production`                                                    | 全部 env 文件         |
| `VITE_SENTRY_RELEASE`            | Release 版本（Source Map 上传与事件聚类须一致）             | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_SENTRY_TRACES_SAMPLE_RATE` | 性能追踪采样率 0–1                                          | 开发 `0`，stage/production `0.1`                                                          | 全部 env 文件         |
| `VITE_SENTRY_PROJECT_SLUG`       | Sentry 项目 slug（MCP / 构建上传；默认同 `VITE_APP_NAME`）  | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_POSTHOG_ENABLED`           | 是否启用 PostHog（须同时配置有效 KEY）                      | 开发 `false`，stage/production `true`                                                     | 全部 env 文件         |
| `VITE_POSTHOG_KEY`               | PostHog API Key（敏感项建议放 `*.local`）                   | 空                                                                                        | 全部 env 文件         |
| `VITE_POSTHOG_HOST`              | PostHog 实例地址                                            | 空                                                                                        | 全部 env 文件         |
| `VITE_CRYPTO_SECRET`             | Crypto 加解密密钥（16/24/32 位，敏感项建议放 `*.local`）    | 空                                                                                        | 全部 env 文件         |
| `VITE_CRYPTO_IV`                 | Crypto 加解密 IV（固定 16 位，敏感项建议放 `*.local`）      | 空                                                                                        | 全部 env 文件         |

**构建期 Source Map**：`SENTRY_UPLOAD_SOURCEMAPS`、`SENTRY_AUTH_TOKEN`、`SENTRY_ORG`、`SENTRY_URL`（自托管必填）；模板 `.env.sentry-build-plugin.example`。插件 `vite/plugins/plugin-sentry.ts`；`build.sourcemap: "hidden"` 仅在上传开启时生效，上传后删除 `dist/**/*.map`。

`VITE_API_PROXY_MAP` 由 `vite.config.ts` 通过 `vite/helpers/parse.ts` 解析，配置 dev server 多路径代理；stage / production 构建不使用该变量。

**Sentry**：仅当 `VITE_SENTRY_ENABLED=true` 且 `VITE_SENTRY_DSN` 非空时生效；DSN 等敏感项建议放在 `.env.development.local` / `.env.production.local`（已 gitignore），勿提交仓库。初始化与 API 异常上报见 `src/sentry/`；生产堆栈定位源码需构建期上传 Source Map。单次请求可用 `skipSentryReport` 跳过上报（见 `.claude/rules/api-conventions.md`）。修复闭环 Skill：`.cursor/skills/sentry-fix-workflow/`；Resolved：`npm run sentry:resolve` 使用 `.env.sentry-resolve.local` 的 **User Token**（`event:write`）；构建用 Organization Token 仅 `org:ci`。
