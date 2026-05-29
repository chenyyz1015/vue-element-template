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
- 🌐 Axios — HTTP 请求封装
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

本项目遵循 [Claude Code 官方推荐项目结构](https://docs.anthropic.com/en/docs/claude-code)，并兼容 Cursor 等主流 AI 开发工具：

```
├── CLAUDE.md                  # Claude Code 项目指令
├── CLAUDE.local.md            # 个人覆盖（git ignored）
├── AGENTS.md                  # 通用 AI Agent 指令
├── .claude/
│   ├── settings.json          # 团队共享配置
│   ├── commands/              # 自定义命令 (/project:review 等)
│   ├── rules/                 # 模块化规则
│   ├── skills/                # 自动调用工作流
│   └── agents/                # 子 Agent 角色定义
└── .cursor/
    ├── rules/                 # Cursor 规则
    └── skills/                # Cursor Skills
```

### Claude Code 命令

| 命令                 | 说明       |
| -------------------- | ---------- |
| `/project:review`    | 代码审查   |
| `/project:fix-issue` | 修复 Issue |
| `/project:deploy`    | 部署流程   |

## 项目结构

```
vite/
├── helpers/                       # Vite 配置辅助函数
│   ├── parse.ts                   # 解析 VITE_API_PROXY_MAP
│   └── index.ts
└── plugins/                       # Vite 插件（kebab-case 单文件）
    ├── plugin-vue.ts
    ├── unocss.ts
    ├── unplugin-auto-import.ts
    ├── unplugin-vue-components.ts
    ├── unplugin-svg-component.ts
    └── index.ts

types/                             # 构建生成的类型声明
├── auto-imports.d.ts
├── components.d.ts
└── svg-component.d.ts

src/
├── assets/icons/                  # SVG 图标
├── components/
│   ├── com-hello-card/            # 非业务型公共组件（auto-import）
│   │   ├── index.vue
│   │   └── types.ts
│   └── com-page-header/
│       └── index.vue
├── composables/                   # 组合式函数（auto-import，camelCase：useXxx.ts）
│   └── useLocale.ts               # 语言切换（Element Plus locale 同步）
├── i18n/                          # 国际化
│   ├── index.ts                   # createI18n 实例
│   ├── constants.ts
│   ├── types.ts
│   └── locales/                   # 语言包（zh-CN、en-US）
├── layouts/
│   └── devtools-layout/           # 深色营销布局（手动引入）
│       └── index.vue
├── router/                        # 主路由、守卫、modules/ 业务路由
│   ├── index.ts
│   ├── guard.ts
│   ├── routes.ts
│   └── modules/                   # 业务路由模块（kebab-case）
├── directives/                    # 全局指令（v-permission）
├── api/                           # HTTP 请求
│   ├── constants.ts
│   ├── index.ts
│   ├── request/                   # Axios 封装
│   ├── modules/                   # 业务 API 模块
│   └── types/                     # 接口类型（模块名.d.ts）
├── stores/                        # Pinia
│   ├── persisted-state.ts         # 持久化插件配置 + Pinia key 生成
│   └── modules/                   # Store 模块（app、user、permission 等）
├── styles/
│   ├── index.scss                 # 全局样式入口
│   └── element/
│       ├── var.scss               # Element Plus 主题变量
│       └── index.scss             # Element Plus base 样式
├── types/                         # 全局类型声明（env.d.ts、i18n.d.ts 等）
├── utils/
│   ├── auth.ts                    # Token 读写封装
│   ├── locale.ts                  # 语言偏好读写封装
│   ├── permission.ts              # RBAC 匹配工具
│   ├── dayjs.ts                   # dayjs 预配置
│   └── storage.ts                 # 底层 localStorage / sessionStorage 封装
└── views/
    ├── home/
    │   └── index.vue
    └── about/
        ├── index.vue
        ├── constants.ts
        └── components/            # 页面私有子组件（PascalCase，手动引入）
            └── TechStackTable.vue
```

## 组件命名规范

| 类型                | 规范                                  | 示例                                            |
| ------------------- | ------------------------------------- | ----------------------------------------------- |
| 非业务公共组件      | `com-*` kebab-case 目录 + `index.vue` | `com-hello-card/index.vue` → `<ComHelloCard />` |
| 业务公共组件        | `biz-*` kebab-case 目录 + `index.vue` | `biz-order-card/index.vue` → `<BizOrderCard />` |
| 页面                | kebab-case 目录 + `index.vue`         | `views/user-profile/index.vue`                  |
| 页面/布局私有子组件 | PascalCase，放 `components/` 子目录   | `TechStackTable.vue`                            |

## 主题定制

Element Plus 主题变量在 `src/styles/element/var.scss` 中维护（主色 `#2563eb` 等），通过 `vite.config.ts` 的 `scss.additionalData` 全局注入；`src/styles/element/index.scss` 负责引入 Element Plus base 样式。修改后重新运行 `npm run dev` 或 `npm run build` 即可。

## 国际化

基于 [vue-i18n](https://vue-i18n.intlify.dev/)（Composition API，`legacy: false`）：

- 语言包：`src/i18n/locales/`（默认 `zh-CN`、`en-US`）
- 实例配置：`src/i18n/index.ts`，在 `main.ts` 中 `app.use(i18n)`
- 语言切换：`useLocale()` composable（通过 `src/utils/locale.ts` 持久化，同步 Element Plus locale）
- 路由标题：路由 `meta.titleKey` 对应语言包 key，由 `router` 守卫与 `App.vue` 监听 locale 更新 `document.title`

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

## 路由与 RBAC

- **目录**：`src/router/` 存放主路由与守卫；业务路由在 `src/router/modules/`（kebab-case）
- **constantRoutes**：登录/403/404 与公开页面；**asyncRoutes**：登录后按 `roles` / `permissions` 动态注册
- **Store**：`useUserStore`、`usePermissionStore`
- **按钮级**：`usePermission()`、`v-permission="'perm:code'"`
- 开发环境 Mock 账号：`admin/admin123`、`viewer/viewer123`；受保护示例页 `/admin`
- 详细约定：`.claude/rules/router.md`

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

以下需手动 import：布局组件、页面/布局私有子组件、同级辅助文件（`types.ts`、`constants.ts` 等）、`lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`）。

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                 | 说明                                                    | 默认值                                                                                    | 适用范围              |
| -------------------- | ------------------------------------------------------- | ----------------------------------------------------------------------------------------- | --------------------- |
| `VITE_APP_TITLE`     | 应用标题                                                | `Vue Element Template`                                                                    | 全部 env 文件         |
| `VITE_API_BASE_URL`  | API 基础地址                                            | `/api`                                                                                    | 全部 env 文件         |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）                                        | `60_000`                                                                                  | 全部 env 文件         |
| `VITE_API_PROXY_MAP` | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`） | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |

开发环境 `vite.config.ts` 通过 `vite/helpers/parse.ts` 解析 `VITE_API_PROXY_MAP` 配置 dev server 代理（仅 `npm run dev` 生效）；stage / production 部署时需自行配置反向代理。部署流程见 `.claude/skills/deploy/SKILL.md`。

## License

MIT
