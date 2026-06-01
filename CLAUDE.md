# 企业级 Vue 前端项目模板

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板，集成 Pinia、Element Plus、Axios、UnoCSS 及 AI 开发工具配置。

> **二次定制**：项目名以 `.env.*` 的 **`VITE_APP_NAME`** 为准（见 `design-system/PROJECT.md`）；同步 `package.json` `name`、`VITE_APP_TITLE` 与 i18n。AI 命令中的 `-p` 使用 **`VITE_APP_NAME`**，勿写死仓库初始名称。

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
│       ├── index.vue
│       └── components/      # DefaultNav、DefaultFooter、ThemeControls
├── router/                  # 主路由、守卫、constantRoutes
│   ├── index.ts             # createRouter + setupRouterGuard
│   ├── routes.ts            # 系统路由 + 公开业务路由
│   ├── guard.ts             # 导航守卫（登录态 + RBAC）
│   ├── helpers.ts           # 路由过滤、resetRouter
│   ├── constants.ts
│   ├── types.ts
│   └── modules/             # 业务路由模块（kebab-case）
│       ├── index.ts         # asyncRoutes 聚合
│       └── *.ts             # 按业务域拆分
├── directives/              # 自定义指令（modules/ + index.ts → app.use）
│   ├── index.ts             # directivesPlugin 统一注册
│   └── modules/             # kebab-case，按业务功能划分（如 permission.ts）
├── api/                     # HTTP 请求（request + modules + types）
├── stores/                  # Pinia
│   ├── persisted-state.ts   # 持久化插件配置 + Pinia key 生成
│   └── modules/             # Store 模块（auto-import，kebab-case）
│       └── app.ts
│       ├── user.ts          # 登录态、roles、permissions
│       └── permission.ts    # 动态路由生成
├── styles/                  # 全局样式
│   ├── index.scss           # 引入 semantic-vars + Element Plus
│   ├── theme/
│   │   ├── page-semantic.scss   # 页面语义色 SCSS 源值（light/dark）
│   │   └── semantic-vars.scss   # 全局 --dl-* CSS 变量
│   └── element/
│       ├── var.scss         # Element Plus 主题变量
│       └── index.scss       # Element Plus base 样式
├── types/                   # 全局类型声明（env.d.ts 等）
├── utils/                   # 通用工具函数
│   ├── auth.ts              # Token 读写封装
│   ├── locale.ts            # 语言偏好读写封装
│   ├── permission.ts        # RBAC 匹配工具
│   ├── dayjs.ts             # dayjs 预配置
│   └── storage.ts           # 底层浏览器缓存封装
└── views/                   # 页面组件（kebab-case 目录 + index.vue）
    ├── landing/             # 首页（/），i18n 键 `landing.*`
    │   ├── constants.ts
    │   ├── components/      # HeroSection、FeaturesSection 等
    │   └── styles/          # _mixins.scss、_tokens.scss（转发全局 theme）
    ├── demo/
    ├── about/
    ├── login/
    ├── admin/
    └── …                    # forbidden、not-found 等
        └── components/      # 页面私有子组件（PascalCase，手动引入）
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
- `vue-i18n`（useI18n 等）
- `src/composables/` 下的组合式函数（文件名 `useXxx.ts`，箭头函数导出）
- `src/stores/modules/` 下的 Store（kebab-case 文件名，箭头函数导出）
- `@vueuse/core` 组合式 API
- `dayjs`（`src/utils/dayjs.ts` 预配置）

以下组件通过 `unplugin-vue-components` 按需自动引入，**无需手动 import**：

- `<SvgIcon name="图标名" />`（图标放 `src/assets/icons/*.svg`，已在 `main.ts` 注册）
- Element Plus 组件
- `src/components/` 下公共组件（`com-`_ 非业务型、`biz-_` 业务型）

以下场景**需手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `src/i18n/index.ts`（`main.ts` 中注册 i18n 实例）
- `lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`，禁止全量 import）

### 国际化

- 语言包放 `src/i18n/locales/`，类型基准为 `zh-CN.json`（见 `src/i18n/types.ts`）
- 命名空间示例：`landing.*`（首页）、`nav.*`（含 `themeColor` / `themeMode*` 等布局控件）、`demo.*`、`about.*`
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

### 路由与 RBAC

- 根目录 `src/router/` 存放主路由、守卫、常量路由；业务路由按模块放在 `src/router/modules/`（kebab-case）
- **constantRoutes**：启动即注册（登录/403/404、公开页面）；**asyncRoutes**：登录后按权限动态 `addRoute`
- Store：`useUserStore`（登录、roles、permissions）· `usePermissionStore`（动态路由）
- Composable：`usePermission()` — `hasRole()` / `hasPermission()`
- 按钮级：`v-permission` 指令（`app.use(directivesPlugin)`，见 `src/directives/`、`.claude/rules/directives.md`）
- 详细约定见 `.claude/rules/router.md`

### 代码规范

- 遵循 ESLint、Stylelint、Commitlint 规范
- 配置文件使用 ESModule 格式（`.ts` + `"type": "module"`）
- Vue 组件统一使用 `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- 单文件组件宜 **≤300 行**（含 style）；超出则拆子组件、同级 `useXxx.ts` / `helpers.ts` 或 `styles/` partial（见 `.claude/rules/code-style.md`）
- 异步逻辑统一使用 `async/await`，禁止 `.then()` / `.catch()` 链式调用
- 路径别名：`@/` → `src/`
- CSS 类名：BEM + SMACSS `l-*` + scoped `@apply`（见 `.claude/rules/css-naming.md`）
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

| 工具        | 配置文件                                                                                 |
| ----------- | ---------------------------------------------------------------------------------------- |
| Claude Code | `CLAUDE.md`、`.claude/`                                                                  |
| Cursor      | `.cursor/rules/`、`.cursor/skills/`、`.cursor/agents/`、`.cursor/commands/`、`AGENTS.md` |
| 通用        | `AGENTS.md`                                                                              |

详细 AI 工作流见 `.claude/commands/`、`.claude/skills/`、`.claude/agents/`。`.cursor/` 目录与之对齐，运行 `node scripts/sync-ai-config.mjs` 同步 agents、commands 与路径前缀。

### AI 前端设计

> **ui-ux-pro-max** 出策略 · **pencil** 出视觉与代码 · **impeccable** 保质量

**二次定制**：项目名以 **`VITE_APP_NAME`**（`.env.*`）为准；`ui-ux-pro-max --persist -p` 与之保持一致，勿写死模板初始名称。标识说明见 `design-system/PROJECT.md`。

| Phase           | Skill / 工具                                                                     |
| --------------- | -------------------------------------------------------------------------------- |
| 1 战略规划      | `.cursor/skills/ui-ux-pro-max/`                                                  |
| 2–3 视觉 + 代码 | `.cursor/skills/pencil-design-workflow/` + Pencil MCP                            |
| 4 质量          | `.cursor/skills/impeccable/SKILL.md` + `project-bridge.md` · `/impeccable <cmd>` |

主编排：`.cursor/skills/ai-frontend-design-workflow/SKILL.md`  
项目标识：`design-system/PROJECT.md`  
运行时主题：`design-system/THEME.md`（`useThemeColor` / `useThemeMode`，与 Phase 1–4 同步）  
Agents：`design-director`（规划分派）· `design-inspector`（Phase 4 监工）

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                 | 说明                                                    | 默认值                                                                                    | 适用范围              |
| -------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `VITE_APP_NAME`      | 项目名（`ui-ux-pro-max -p`、宜与 `package.json` name 一致） | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_APP_TITLE`     | 应用展示标题（与 i18n `app.title` 对齐）                | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_GITHUB_URL`    | GitHub 仓库地址（导航/页脚/关于等外链）                 | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_API_BASE_URL`  | API 基础地址                                            | `/api`                                                                                    | 全部 env 文件         |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）                                        | `60_000`                                                                                  | 全部 env 文件         |
| `VITE_API_PROXY_MAP` | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`） | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |

`VITE_API_PROXY_MAP` 由 `vite.config.ts` 通过 `vite/helpers/parse.ts` 解析，配置 dev server 多路径代理；stage / production 构建不使用该变量。
