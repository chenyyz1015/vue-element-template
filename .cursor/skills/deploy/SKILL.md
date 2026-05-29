---
name: deploy
description: 执行项目构建与部署流程，包括 lint 检查、类型检查、生产构建和部署验证。在用户请求部署、发布、上线时使用。
---

# 部署工作流

完整部署流程见 `.cursor/skills/deploy/SKILL.md`。

## 快速流程

```bash
npm run lint    # Prettier + ESLint + Stylelint
npm run build   # production：vue-tsc + vite build
# stage：npm run build:stage
# 部署 dist/ 到目标平台
```

## 环境配置

| 环境        | 配置文件           | 构建命令                |
| ----------- | ------------------ | ----------------------- |
| development | `.env.development` | `npm run dev`（非部署） |
| stage       | `.env.stage`       | `npm run build:stage`   |
| production  | `.env.production`  | `npm run build`         |

| 变量                 | 说明                                                    | 默认值                | 适用范围              |
| -------------------- | ------------------------------------------------------- | --------------------- | --------------------- |
| `VITE_APP_TITLE`     | 应用标题（与 `PROJECT.md` displayName 对齐）            | 见 `.env.*`           | 全部 env 文件         |
| `VITE_API_BASE_URL`  | API 基础地址                                            | `/api`                | 全部 env 文件         |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）                                        | `60_000`              | 全部 env 文件         |
| `VITE_API_PROXY_MAP` | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`） | 见 `.env.development` | 仅 `.env.development` |

## 部署前确认

- 工作区无未提交变更
- 目标 env 文件中 `VITE_API_BASE_URL`、`VITE_API_TIMEOUT` 正确（当前均为 `/api` / `60_000`，需配置服务端反向代理）
- lint 和 build 均通过

## 部署后验证

- 首页加载、路由跳转、API 请求（`/api` 代理）、控制台无报错
