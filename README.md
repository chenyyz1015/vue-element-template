# Vue Element Template

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板。

## 特性

- ⚡️ Vite 6 — 极速开发体验
- 🖖 Vue 3 — Composition API + `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 🔷 TypeScript — 完整类型支持
- 📦 Pinia — 官方状态管理
- 🎨 Element Plus — 企业级 UI 组件库
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
src/
├── components/
│   ├── com-hello-card/          # 非业务型公共组件（auto-import）
│   │   ├── index.vue
│   │   └── types.ts
│   └── com-page-header/
│       └── index.vue
├── composables/                   # 组合式函数（auto-import）
├── layouts/
│   └── default-layout/            # 布局（手动引入）
│       └── index.vue
├── router/
├── api/                         # HTTP 请求
│   ├── request.ts               # Axios 封装
│   ├── modules/                 # 业务 API 模块
│   └── types/                   # 接口类型（模块名.d.ts）
├── stores/                        # Pinia Store（auto-import）
├── types/
├── utils/                         # 通用工具函数
└── views/
    ├── home/
    │   ├── index.vue
    │   └── components/            # 页面私有子组件（PascalCase，手动引入）
    │       └── CounterPanel.vue
    └── about/
        ├── index.vue
        ├── constants.ts
        └── components/
            └── TechStackTable.vue
```

## 组件命名规范

| 类型                | 规范                                  | 示例                                            |
| ------------------- | ------------------------------------- | ----------------------------------------------- |
| 非业务公共组件      | `com-*` kebab-case 目录 + `index.vue` | `com-hello-card/index.vue` → `<ComHelloCard />` |
| 业务公共组件        | `biz-*` kebab-case 目录 + `index.vue` | `biz-order-card/index.vue` → `<BizOrderCard />` |
| 页面                | kebab-case 目录 + `index.vue`         | `views/user-profile/index.vue`                  |
| 页面/布局私有子组件 | PascalCase，放 `components/` 子目录   | `CounterPanel.vue`                              |

## 主题定制

默认定制色在 [`src/styles/theme.ts`](src/styles/theme.ts) 中维护（主色 `#2563eb` 等），会同步到 Element Plus 与 UnoCSS（`text-primary` 等工具类）。修改后重新运行 `npm run dev` 或 `npm run build` 即可。

## 自动引入

以下 API 无需手动 import：

- `vue`、`vue-router`、`pinia`
- `@vueuse/core`、`dayjs`
- `src/composables/` 下的组合式函数
- `src/stores/` 下的 Store
- Element Plus 组件与反馈 API（`ElMessage` 等，按需）
- `src/components/` 下公共组件（按需）
- `<SvgIcon />`（`src/assets/icons/*.svg`，`main.ts` 已注册）

### SVG 图标

将 `.svg` 放入 [`src/assets/icons/`](src/assets/icons/)，在模板中使用：

```vue
<SvgIcon name="home" class="text-primary text-xl" />
```

`name` 为文件名（不含 `.svg`），支持 TypeScript 智能提示（`src/types/svg-component.d.ts`）。

以下需手动 import：布局组件、页面/布局私有子组件、同级辅助文件（`types.ts`、`constants.ts` 等）、`lodash-es` 函数（如 `import { cloneDeep } from 'lodash-es'`）。

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                | 说明               | 默认值                 |
| ------------------- | ------------------ | ---------------------- |
| `VITE_APP_TITLE`    | 应用标题           | `Vue Element Template` |
| `VITE_API_BASE_URL` | API 基础地址       | `/api`                 |
| `VITE_API_TIMEOUT`  | 请求超时（毫秒）   | `60_000`               |

开发环境 `vite.config.ts` 将 `/api` 代理至 `http://localhost:3000`；stage / production 部署时需自行配置反向代理。部署流程见 `.claude/skills/deploy/SKILL.md`。

## License

MIT
