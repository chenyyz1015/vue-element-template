# Vue Element Template

基于 Vite + Vue 3 + TypeScript 的企业级前端项目模板，集成 Pinia、Element Plus、Axios、UnoCSS 及 AI 开发工具配置。

## 特性

- ⚡️ Vite 7 — 极速开发体验
- 🖖 Vue 3 — Composition API + `<script setup lang="ts">`
- 🔷 TypeScript — 完整类型支持
- 📦 Pinia — 状态管理 + 持久化
- 🎨 Element Plus — 企业级 UI 组件库
- 🌍 vue-i18n — 国际化
- 🎯 UnoCSS — 原子化 CSS
- 🌐 Axios — HTTP 请求封装
- 📊 Sentry — 异常监控
- 📈 PostHog — 用户行为分析
- 🔐 Crypto — 加解密工具
- 🧩 VueUse / dayjs / lodash-es — 内置工具库
- 🖼️ SVG 图标组件 — 零配置使用
- 🤖 AI 工具支持 — Claude Code / Codex / Cursor 开箱即用
- 📏 ESLint + Stylelint + Commitlint — 代码规范保障

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（默认 http://localhost:5173）
npm run build      # 类型检查 + 生产构建
npm run build:stage  # 预发构建
npm run lint       # 代码检查
npm run lint:fix   # 自动修复
```

## 项目结构

```
src/
├── api/          # HTTP 请求（Axios 封装 + 拦截器）
├── assets/       # 静态资源（icons/、images/、fonts/ 等）
├── components/   # 公共组件（Com* 非业务 / Biz* 业务，自动引入）
├── composables/  # 组合式函数（auto-import）
├── directives/   # 自定义指令（v-permission、v-role 等）
├── i18n/         # 国际化语言包
├── layouts/      # 布局组件
├── router/       # 路由配置
├── stores/       # Pinia Store（Setup Store + 持久化）
├── styles/       # 全局样式 / Element Plus 主题
├── types/        # 全局类型声明
├── utils/        # 工具函数
└── views/        # 页面组件
```

## 文档

- 完整开发约定见 [`CLAUDE.md`](CLAUDE.md) + [`.claude/rules/`](.claude/rules/)
- UI 设计规范见 [`design-system/`](design-system/)
- 环境变量配置见 `.env.development` / `.env.stage` / `.env.production`

## AI 工具

本项目预置 Claude Code、Codex、Cursor 三套工具配置，目录结构如下：

```
├── .claude/   # Claude Code（规则权威源）
├── .codex/    # Codex
├── .cursor/   # Cursor
└── .agents/   # commands / skills 统一管理
```

对齐约定：规则详文以 `.claude/rules/*.md` 为准；`commands` / `skills` 通过 `.agents/` 软链接共享。

## License

MIT
