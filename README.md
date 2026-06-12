# Vue Element Template

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板。

## 特性

- ⚡️ Vite 7 — 极速开发体验
- 🖖 Vue 3 — Composition API + `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 🔷 TypeScript — 完整类型支持
- 📦 Pinia — 官方状态管理（pinia-plugin-persistedstate 持久化）
- 🎨 Element Plus — 企业级 UI 组件库
- 🌍 vue-i18n — 国际化（Composition API + TypeScript 类型推导）
- 🎯 UnoCSS — 原子化 CSS
- 🌐 Axios — HTTP 请求封装（失败可上报 Sentry，`skipSentryReport` 可按请求关闭）
- 📊 Sentry — 异常监控（`@sentry/vue`，配置见环境变量）
- 📈 PostHog — 用户行为分析（User Store 内 login/getInfo/logout 自动关联埋点）
- 🔐 Crypto — 加解密工具（AES，环境变量管理密钥）
- 🧩 VueUse / dayjs — 内置并 auto-import
- 📦 lodash-es — 内置，按需手动 import（tree-shaking）
- 🖼️ unplugin-svg-component — `src/assets/icons` SVG 图标组件
- 🤖 AI 工具配置 — Claude Code / Cursor 开箱即用
- 📏 ESLint + Stylelint + Commitlint — 代码规范保障

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 生产构建
npm run build

# 预发构建
npm run build:stage
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
├── .codex/                        # Codex（与 .claude 目录对齐）
│   ├── config.toml
│   ├── rules/
│   ├── prompts/
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

## 组件命名规范

| 类型                | 规范                                 | 示例                                              |
| ------------------- | ------------------------------------ | ------------------------------------------------- |
| 非业务公共组件      | `Com*` PascalCase 目录 + `index.vue` | `ComHelloCard/index.vue` → `<ComHelloCard />`     |
| 业务公共组件        | `Biz*` PascalCase 目录 + `index.vue` | `BizOrderCard/index.vue` → `<BizOrderCard />`     |
| 页面                | kebab-case 目录                      | `views/auth/login.vue`、`views/auth/register.vue` |
| 页面/布局私有子组件 | PascalCase，放 `components/` 子目录  | `views/user/components/UserProfile.vue`           |

## CSS 类名

- **BEM**：`block__element`、`block--modifier`（模板语义化类名）
- **SMACSS**：跨区块结构 `l-container`、`l-section` 等
- **OOCSS**：色板与字体变量（如 `src/views/<page>/styles/_tokens.scss`）
- **UnoCSS**：在 `<style lang="scss" scoped>` 内通过 `@apply` 注入，避免模板堆叠长串 utility

完整约定见 `[.claude/rules/css-naming.md](.claude/rules/css-naming.md)`。

## 主题定制

Element Plus 主题变量在 `src/styles/element/var.scss` 中维护（主色 `#2563eb` 等），通过 `vite.config.ts` 的 `scss.additionalData` 全局注入；`src/styles/element/index.scss` 负责引入 Element Plus base 样式。修改后重新运行 `npm run dev` 或 `npm run build` 即可。

## 国际化

基于 [vue-i18n](https://vue-i18n.intlify.dev/)（Composition API，`legacy: false`）：

- 语言包：`src/i18n/locales/`（默认 `zh-CN`、`en-US`）
- 实例配置：`src/i18n/index.ts`，在 `main.ts` 中 `app.use(i18n)`
- 语言切换：`useLocale()` composable（通过 `src/utils/locale.ts` 持久化，同步 Element Plus locale）
- 路由标题：路由 `meta.titleKey` 对应语言包 key，由 `router.afterEach` 与 `App.vue` 监听 locale 更新 `document.title`

模板与脚本中使用 `useI18n()` 的 `t()`（已 auto-import）：

```vue
<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <p>{{ t("home.description") }}</p>
</template>
```

新增语言：在 `src/i18n/locales/` 添加语言文件，并更新 `src/i18n/constants.ts` 与 `src/i18n/types.ts` 中的 `Locale` 类型。

## Pinia 持久化

基于 [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)：

- 插件注册：`src/stores/persisted-state.ts`（含 `getPiniaPersistKey`），在 `main.ts` 中 `pinia.use(persistedState)`
- Store 模块：`src/stores/modules/`（kebab-case 文件名，如 `app.ts`）
- 存储驱动：`storage.local.toStorageLike()`，逻辑 key 由 `getPiniaPersistKey` 生成（如 `app` → `PINIA_APP`，实际存储为 `VUE_ELEMENT_TEMPLATE_PINIA_APP`）
- Store 按需开启：在 `defineStore` 第三参数设置 `persist: true` 或 `{ pick: ['field'] }`
- 临时状态（如 `loading`）勿持久化，使用 `pick` / `omit` 精确控制

## 缓存（Storage）

底层封装：`src/utils/storage.ts`，导出 `storage.local` / `storage.session`。**禁止**在业务代码、composables、Store 模块中直接 import；仅允许在 `src/utils/` 业务封装文件及 `src/stores/persisted-state.ts` 中使用。

| 约定     | 说明                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| 逻辑 key | **UPPER_SNAKE_CASE**（如 `ACCESS_TOKEN`、`LOCALE`、`PINIA_APP`），不符合时 `console.warn` |
| 物理 key | 前缀 `VUE_ELEMENT_TEMPLATE_` + 逻辑 key（如 `VUE_ELEMENT_TEMPLATE_LOCALE`）               |
| 序列化   | `set<T>` 自动 `JSON.stringify`，`get<T>` 自动 `JSON.parse`                                |
| 实例     | `storage.local` → `localStorage`，`storage.session` → `sessionStorage`                    |

| 方法                         | 说明                            |
| ---------------------------- | ------------------------------- |
| `get<T>(key, defaultValue?)` | 读取并反序列化为 `T`            |
| `set<T>(key, value)`         | 写入 `T` 并 JSON 序列化         |
| `remove(key)`                | 删除指定 key                    |
| `clear()`                    | 清除所有带前缀的 key            |
| `toStorageLike()`            | 供 Pinia 持久化插件使用的适配器 |

| 封装文件                    | 导出                                       | 职责                        |
| --------------------------- | ------------------------------------------ | --------------------------- |
| `utils/auth.ts`             | `getToken` / `setToken` / `removeToken`    | Token（`ACCESS_TOKEN`）     |
| `utils/locale.ts`           | `getLocale` / `setLocale` / `removeLocale` | 语言偏好（`LOCALE`）        |
| `stores/persisted-state.ts` | `getPiniaPersistKey` / `persistedState`    | Pinia 持久化插件与 key 生成 |

```typescript
import { setToken } from "@/utils/auth";
import { setLocale } from "@/utils/locale";

setToken("xxx");
setLocale("zh-CN");
```

引用关系：`api/request/interceptors.ts` → `auth.ts`；`i18n/index.ts`、`composables/useLocale.ts` → `locale.ts`；`main.ts` → `persisted-state.ts`。

## 自动引入

以下 API 无需手动 import：

- `vue`、`vue-router`、`pinia`、`vue-i18n`（`useI18n` 等）
- `@vueuse/core`、`dayjs`
- `src/composables/` 下的组合式函数（`useXxx.ts`，箭头函数导出）
- `src/stores/modules/` 下的 Store（kebab-case 文件名，箭头函数导出）
- Element Plus 组件与反馈 API（`ElMessage` 等，按需）
- `src/components/` 下公共组件（按需）
- `<SvgIcon />`（`src/assets/icons/*.svg`，`main.ts` 已注册）

### SVG 图标

将 `.svg` 放入 `[src/assets/icons/](src/assets/icons/)`，在模板中使用：

```vue
<SvgIcon name="home" class="text-primary text-xl" />
```

`name` 为文件名（不含 `.svg`），支持 TypeScript 智能提示（`types/svg-component.d.ts`）。

以下需手动 import：布局组件、页面/布局私有子组件、同级辅助文件（`types.d.ts`、`constants.ts` 等）、`lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`）。

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                             | 说明                                                       | 默认值                                                                                    | 适用范围              |
| -------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `VITE_APP_NAME`                  | 项目名（宜与 `package.json` name 一致）                    | `vue-element-template`                                                                    | 全部 env 文件         |
| `VITE_APP_TITLE`                 | 应用展示标题                                               | `Vue Element Template`                                                                    | 全部 env 文件         |
| `VITE_GITHUB_URL`                | GitHub 仓库地址                                            | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_API_BASE_URL`              | API 基础地址                                               | `/api`                                                                                    | 全部 env 文件         |
| `VITE_API_TIMEOUT`               | 请求超时（毫秒）                                           | `60_000`                                                                                  | 全部 env 文件         |
| `VITE_API_PROXY_MAP`             | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`）    | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |
| `VITE_SENTRY_ENABLED`            | 是否启用 Sentry（须同时配置有效 `VITE_SENTRY_DSN`）        | 开发 `false`，stage/production `true`                                                     | 全部 env 文件         |
| `VITE_SENTRY_DSN`                | Sentry DSN（敏感项，建议写在 `.env.*.local`）              | 空                                                                                        | 全部 env 文件         |
| `VITE_SENTRY_ENVIRONMENT`        | Sentry 上报环境标识                                        | `development` / `stage` / `production`                                                    | 全部 env 文件         |
| `VITE_SENTRY_RELEASE`            | Release 版本（与 Source Map 上传、事件聚类一致）           | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_SENTRY_TRACES_SAMPLE_RATE` | 性能追踪采样率（0–1）                                      | 开发 `0`，stage/production `0.1`                                                          | 全部 env 文件         |
| `VITE_SENTRY_PROJECT_SLUG`       | Sentry 项目 slug（MCP / 构建上传；空则同 `VITE_APP_NAME`） | 见 `.env.*`                                                                               | 全部 env 文件         |
| `VITE_POSTHOG_ENABLED`           | 是否启用 PostHog（须同时配置有效 KEY）                     | 开发 `false`，stage/production `true`                                                     | 全部 env 文件         |
| `VITE_POSTHOG_KEY`               | PostHog API Key（敏感项建议放 `*.local`）                  | 空                                                                                        | 全部 env 文件         |
| `VITE_POSTHOG_HOST`              | PostHog 实例地址                                           | 空                                                                                        | 全部 env 文件         |
| `VITE_CRYPTO_SECRET`             | Crypto 加解密密钥（16/24/32 位，敏感项建议放 `*.local`）   | 空                                                                                        | 全部 env 文件         |
| `VITE_CRYPTO_IV`                 | Crypto 加解密 IV（固定 16 位，敏感项建议放 `*.local`）     | 空                                                                                        | 全部 env 文件         |

**构建期 Source Map（`npm run build` / `build:stage`，变量不进前端 bundle）**

| 变量                        | 说明                                                       | 配置位置                                  |
| --------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| `SENTRY_UPLOAD_SOURCEMAPS`  | 为 `true` 时生成 `hidden` sourcemap 并上传                 | `.env.sentry-build-plugin` 或 CI          |
| `SENTRY_AUTH_TOKEN`         | Organization Auth Token（UI 固定 `org:ci`，仅构建上传）    | 同上（勿提交仓库）                        |
| `SENTRY_RESOLVE_AUTH_TOKEN` | User Auth Token（`event:write`，`npm run sentry:resolve`） | `.env.sentry-resolve.local`（见 example） |
| `SENTRY_ORG`                | 组织 slug                                                  | 同上                                      |
| `SENTRY_URL`                | Sentry 根地址                                              | 同上                                      |
| `VITE_SENTRY_RELEASE`       | 须与运行时 SDK `release` 一致                              | `.env.stage` / `.env.production`          |
| `VITE_SENTRY_PROJECT_SLUG`  | 上传目标项目                                               | 同上                                      |

## License

MIT
