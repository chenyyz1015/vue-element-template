# AGENTS.md

> 通用 AI Agent 指令文件，兼容 Cursor、Windsurf、GitHub Copilot 等主流 AI 开发工具。

## 项目概述

Vue 3 + TypeScript 企业级前端模板。技术栈：Vite、Pinia、pinia-plugin-persistedstate、Element Plus、vue-i18n、Axios、UnoCSS、VueUse、dayjs、lodash-es、unplugin-svg-component。

## 项目标识（二次定制）

克隆或改名后，**先更新** `.env.*` 中的 **`VITE_APP_NAME`**、`VITE_APP_TITLE`、`VITE_GITHUB_URL`，并同步 `package.json` `name`、i18n `app.title`（标识说明见 `design-system/PROJECT.md`）。

- AI / ui-ux-pro-max：`--persist -p "<VITE_APP_NAME>"`（读取 `.env.*` → `VITE_APP_NAME`）
- 浏览器缓存前缀：见 `PROJECT.md` → `storageKeyPrefix`（默认 `VUE_ELEMENT_TEMPLATE_`，可在 `src/utils/storage.ts` 修改）
- **勿在 Skill / Agent 文档中写死某一固定项目名**；以 **`VITE_APP_NAME`** 或 `package.json` → `name` 为准

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
- `src/components/` — 公共组件（`com-`_ 非业务型、`biz-_` 业务型）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（main.ts 注册 i18n）

### 组件目录规范

| 类型           | 目录规范                             | 示例                                                     |
| -------------- | ------------------------------------ | -------------------------------------------------------- |
| 非业务公共组件 | `com-`\* + `index.vue`               | `components/com-page-header/index.vue`                   |
| 业务公共组件   | `biz-*` + `index.vue`                | `components/biz-user-card/index.vue`                     |
| 页面           | kebab-case + `index.vue`             | `views/user-profile/index.vue`                           |
| 页面私有子组件 | PascalCase，放 `components/`         | `views/about/components/TechStackTable.vue`              |
| 布局           | kebab-case + `index.vue`             | `layouts/default-layout/index.vue`                       |
| 布局私有子组件 | PascalCase，放 `components/`         | `layouts/default-layout/components/DefaultNav.vue`       |
| Composable     | camelCase 文件名，use 前缀，箭头函数 | `composables/useLocale.ts`                               |
| Store 模块     | kebab-case 文件名，use 前缀箭头函数  | `stores/modules/user-profile.ts` → `useUserProfileStore` |

### 代码规范

- Vue 组件：`<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 单文件组件宜 **≤300 行**；超出则拆子组件或同级逻辑/样式文件（见 `.claude/rules/code-style.md`）
- 异步逻辑：统一 `async/await`，禁止 `.then()` / `.catch()` 链式调用
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
├── helpers/                 # Vite 配置辅助函数
└── plugins/                 # Vite 插件（kebab-case 单文件，见 vite/plugins/index.ts）

types/                       # 构建生成的类型声明（auto-imports、components、svg-component）

src/
├── assets/                  # 静态资源（icons/ images/ fonts/ videos/ audio/）
│   └── icons/               # SVG（unplugin-svg-component → SvgIcon）
├── components/              # 公共组件（com-*/biz-* + index.vue，auto-import）
├── composables/             # 组合式函数（auto-import，camelCase：useXxx.ts）
├── i18n/                    # 国际化（locales、createI18n）
├── layouts/                 # 布局组件
├── router/                  # 全局路由
├── directives/              # 自定义指令（modules/ + index.ts → app.use）
│   ├── index.ts             # directivesPlugin 统一注册
│   └── modules/             # kebab-case，按业务功能划分（如 permission.ts）
├── api/                     # HTTP 请求（request + modules + types）
├── stores/                  # Pinia
│   ├── persisted-state.ts   # 持久化插件 + Pinia key 生成
│   └── modules/             # Store 模块（app、user、permission 等）
├── styles/                  # index.scss、theme/semantic-vars、element/var.scss
├── types/                   # 全局类型声明（env.d.ts 等）
├── utils/                   # 工具函数（storage 底层 + auth/locale/permission 封装）
└── views/                   # 页面组件
```

## AI 配置目录

| 路径                | 用途                                                                                             | 工具        |
| ------------------- | ------------------------------------------------------------------------------------------------ | ----------- |
| `CLAUDE.md`         | 项目级 AI 指令                                                                                   | Claude Code |
| `AGENTS.md`         | 通用 Agent 指令                                                                                  | Cursor 等   |
| `CLAUDE.local.md`   | 个人覆盖（git ignored）                                                                          | 本地        |
| `design-system/`    | 设计 SSOT                                                                                        | UI 工作流   |
| `.claude/rules/`    | 规范详文（`code-style`、`router`、`css-naming`、`ai-frontend-design`…）                          | Claude Code |
| `.claude/commands/` | `audit`、`critique`、`polish`、`review`、`fix-issue`、`deploy`                                   | Claude Code |
| `.claude/agents/`   | `design-director`、`design-inspector`、`code-reviewer`、`security-auditor`                       | Claude Code |
| `.claude/skills/`   | 主编排 `ai-frontend-design-workflow`；`ui-ux-pro-max`、`pencil-design-workflow`、`impeccable` 等 | Claude Code |
| `.cursor/rules/`    | `.mdc` 规则摘要（详文 `.claude/rules/*.md`）                                                     | Cursor      |
| `.cursor/commands/` | 与 `.claude/commands/` 同名                                                                      | Cursor      |
| `.cursor/agents/`   | 与 `.claude/agents/` 同名                                                                        | Cursor      |
| `.cursor/skills/`   | 与 `.claude/skills/` 同名；**脚本路径用** `.cursor/skills/`                                      | Cursor      |

```
.claude/  ──对齐──▶  .cursor/
├── rules/*.md          ├── rules/*.mdc
├── commands/*.md       ├── commands/*.md
├── agents/*.md         ├── agents/*.md
└── skills/<name>/      └── skills/<name>/   # 路径前缀按工具区分
```

### `.cursor` 与 `.claude` 对齐约定

| 类型              | 权威来源                               | Cursor 侧                                   |
| ----------------- | -------------------------------------- | ------------------------------------------- |
| 规则详文          | `.claude/rules/*.md`                   | `.cursor/rules/*.mdc`（frontmatter + 摘要） |
| Skills            | 两侧各一份，内容一致                   | 脚本与命令内路径写 `.cursor/skills/`        |
| Agents / Commands | `.claude/agents/`、`.claude/commands/` | `.cursor/` 下同名文件，改路径前缀           |
| 项目级指令        | `CLAUDE.md`                            | `AGENTS.md` + `.cursor/rules/`              |

修改 `agents` / `commands` / `skills` 时须**手动同步**两侧，并检查文档与脚本中的 `.claude` / `.cursor` 前缀。

## UI 设计工作流

> **ui-ux-pro-max** 出策略 · **pencil** 出视觉与代码 · **impeccable** 保质量

当需求涉及 **设计、创建页面/组件、视觉稿、Pencil 原型、UI audit/polish** 时，自动应用 `.cursor/skills/ai-frontend-design-workflow/SKILL.md`：

| Phase      | 动作                  | 工具 / Skill                                 |
| ---------- | --------------------- | -------------------------------------------- |
| 1 战略规划 | Design System + Brief | `ui-ux-pro-max`                              |
| 2 视觉落地 | `.pen` 帧与变量       | Pencil MCP + `pencil-design-workflow`        |
| 3 代码实现 | Vue ↔ Pencil 同步     | `pencil-sync.md` + 项目 code-style           |
| 4 质量审计 | audit → polish → gate | 上游 `impeccable` v3.1 + `project-bridge.md` |

UI 变更须与 `useThemeColor` / `useThemeMode` 同步

**Gate**：Audit Health Score ≥ 14/20，无 P0/P1，`npm run build` 通过。

**主要路由：** `/` 首页（`landing`）· `/demo` 演示 · `/about` 关于 · `/devtools` 重定向至 `/`

| Agent                | 职责                                  |
| -------------------- | ------------------------------------- |
| **design-director**  | 多页面/复杂任务：Phase 1–4 规划与分派 |
| **design-inspector** | Phase 4：audit、critique、polish      |

设计产物：`design-system/` ；`design/` 仅 **`design/README.md`** 入库，`briefs/`、`pages/`、`scripts/` 等为本地临时（见 `design/README.md`）。导航 `ThemeControls` 可验证主色/明暗。

命令：`/audit` `/polish` `/critique`（pinned）· `/impeccable <cmd>` · `.claude/commands/`

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
