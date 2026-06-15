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

## 开发约定

项目的所有详细规则见 `.claude/rules/` 目录：

| 规则文件             | 内容                                              |
| -------------------- | ------------------------------------------------- |
| `code-style.md`      | 组件命名、自动引入、国际化、缓存、Pinia、代码规范 |
| `api-conventions.md` | API 请求封装、响应格式、环境变量                  |
| `css-naming.md`      | BEM、SMACSS、OOCSS、`@apply` 约束                 |
| `directives.md`      | 自定义指令目录与 RBAC                             |

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

本项目遵循 [Claude Code 官方推荐项目结构](https://docs.anthropic.com/en/docs/claude-code)，并兼容 Cursor、Codex 等主流 AI 开发工具。

```
├── design-system/                 # UI / AI 设计 SSOT
├── CLAUDE.md                      # Claude Code 项目指令
├── AGENTS.md                      # Codex / GitHub Copilot 通用项目指令
├── .claude/                       # Claude Code（规则与命令权威源）
│   ├── settings.json
│   ├── rules/
│   ├── commands/
│   ├── agents/
│   └── skills/
├── .codex/                        # Codex
│   ├── config.toml
│   ├── prompts/
│   ├── agents/
│   └── skills/
└── .cursor/                       # Cursor
    ├── rules/
    ├── commands/
    ├── agents/
    └── skills/
```

**对齐约定**：规则详文以 `.claude/rules/*.md` 为准，Cursor 侧为 `.cursor/rules/*.mdc` 摘要；`commands` / `skills` 多工具共享软链接到 `.agents/` 统一管理。
