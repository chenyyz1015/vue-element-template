# Vue Element Template

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板，集成 Pinia、Element Plus、Axios、UnoCSS 及 AI 开发工具配置。

## 技术栈

| 类别       | 技术                                                 |
| ---------- | ---------------------------------------------------- |
| 框架       | Vue 3 (Composition API + `<script setup lang="ts">`) |
| 构建       | Vite 6                                               |
| 语言       | TypeScript                                           |
| 状态管理   | Pinia                                                |
| UI 组件    | Element Plus                                         |
| HTTP       | Axios                                                |
| 样式       | UnoCSS                                               |
| 组合式工具 | @vueuse/core（auto-import）                          |
| 日期       | dayjs（中文 locale，auto-import）                    |
| 工具函数   | lodash-es（按需手动 import）                         |
| SVG 图标   | unplugin-svg-component（`src/assets/icons`）         |
| 代码规范   | ESLint + Stylelint + Commitlint                      |

## 项目结构

```
src/
├── assets/icons/            # SVG 图标（unplugin-svg-component）
├── components/              # 公共组件（kebab-case 目录 + index.vue，auto-import）
│   ├── com-hello-card/      # 非业务型（com- 前缀）
│   └── com-page-header/
├── composables/             # 组合式函数（auto-import）
├── layouts/                 # 布局组件（kebab-case 目录 + index.vue，手动引入）
│   └── default-layout/
├── router/                  # 路由配置
├── api/                     # HTTP 请求（request + modules + types）
├── stores/                  # Pinia Store（auto-import）
├── types/                   # 全局类型声明
├── utils/                   # 通用工具函数
└── views/                   # 页面组件（kebab-case 目录 + index.vue）
    ├── home/
    │   ├── index.vue
    │   └── components/      # 页面私有子组件（PascalCase，手动引入）
    └── about/
```

### 组件命名规范

| 类型           | 目录规范           | 入口文件    | 私有子组件                       |
| -------------- | ------------------ | ----------- | -------------------------------- |
| 非业务公共组件 | `com-*` kebab-case | `index.vue` | —                                |
| 业务公共组件   | `biz-*` kebab-case | `index.vue` | —                                |
| 页面           | kebab-case         | `index.vue` | `components/*.vue`（PascalCase） |
| 布局           | kebab-case         | `index.vue` | `components/*.vue`（PascalCase） |

同级目录可放置 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件。

## 开发约定

### 自动引入

以下模块通过 `unplugin-auto-import` 自动引入，**无需手动 import**：

- `vue`（ref, computed, watch 等）
- `vue-router`（useRouter, useRoute 等）
- `pinia`（defineStore, storeToRefs 等）
- `src/composables/` 下的组合式函数
- `src/stores/` 下的 Store
- `@vueuse/core` 组合式 API
- `dayjs`（`src/utils/dayjs.ts` 预配置）

以下组件通过 `unplugin-vue-components` 按需自动引入，**无需手动 import**：

- `<SvgIcon name="图标名" />`（图标放 `src/assets/icons/*.svg`，已在 `main.ts` 注册）

- Element Plus 组件
- `src/components/` 下公共组件（`com-*` 非业务型、`biz-*` 业务型）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`，禁止全量 import）

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

| 工具        | 配置文件                                         |
| ----------- | ------------------------------------------------ |
| Claude Code | `CLAUDE.md`、`.claude/`                          |
| Cursor      | `.cursor/rules/`、`.cursor/skills/`、`AGENTS.md` |
| 通用        | `AGENTS.md`                                      |

详细 AI 工作流见 `.claude/commands/`、`.claude/skills/`、`.claude/agents/`。

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                | 说明               | 默认值                 |
| ------------------- | ------------------ | ---------------------- |
| `VITE_APP_TITLE`    | 应用标题           | `Vue Element Template` |
| `VITE_API_BASE_URL` | API 基础地址       | `/api`                 |
| `VITE_API_TIMEOUT`  | 请求超时（毫秒）   | `60_000`               |

部署流程见 `.claude/skills/deploy/SKILL.md`。
