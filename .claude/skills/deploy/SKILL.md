---
name: deploy
description: 执行项目构建与部署流程，包括 lint 检查、类型检查、生产构建和部署验证。在用户请求部署、发布、上线时使用。
---

# 部署工作流

## 触发场景

- 用户请求部署、发布、上线
- 用户执行 `/project:deploy` 命令
- CI/CD 流水线构建阶段

## 环境配置

项目通过 Vite 模式加载对应 env 文件：

| 环境        | 配置文件           | 启动/构建命令                    |
| ----------- | ------------------ | -------------------------------- |
| development | `.env.development` | `npm run dev`                       |
| stage       | `.env.stage`       | `npm run build:stage`               |
| production  | `.env.production`  | `npm run build`（默认 production 模式） |

### 环境变量

stage / production 三个 env 文件结构一致；`VITE_API_PROXY_MAP` 仅存在于 `.env.development`，供开发服务器多路径代理使用。

| 变量                   | 说明                                      | 当前默认值                                                                 | 适用范围              |
| -------------------- | --------------------------------------- | --------------------------------------------------------------------- | ------------------- |
| `VITE_APP_TITLE`     | 应用标题                                    | `Vue Element Template`                                                | 全部 env 文件           |
| `VITE_API_BASE_URL`  | API 基础地址                                | `/api`                                                                | 全部 env 文件           |
| `VITE_API_TIMEOUT`   | 请求超时（毫秒）                                | `60_000`                                                              | 全部 env 文件           |
| `VITE_API_PROXY_MAP` | 开发代理配置（JSON 数组：`[前缀, 目标地址, 重写前缀]`） | `[["/api","http://localhost:8080","/api"],["/upload","http://localhost:8080","/upload"]]` | 仅 `.env.development` |

> 代码层 fallback：`VITE_API_BASE_URL` 默认 `/api`，`VITE_API_TIMEOUT` 默认 `15_000`（见 `src/api/constants.ts`）。env 文件中的值会覆盖 fallback。

### 部署注意

- 当前各环境 `VITE_API_BASE_URL` 均为相对路径 `/api`，静态托管或 Nginx 需配置反向代理将 `/api` 转发至后端服务。
- 开发环境 `vite.config.ts` 通过 `vite/helpers/parse.ts` 解析 `VITE_API_PROXY_MAP` 配置 dev server 代理（仅 `npm run dev` 生效）；本地代理可在 `.env.development` 或 `.env.development.local` 中修改。
- 开发服务器端口：`5173`（`vite.config.ts`）。

## 部署流程

### Step 1: 预检

```bash
git status          # 确认工作区干净
npm run lint           # Prettier + ESLint + Stylelint
npm run build          # vue-tsc + vite build
```

任何步骤失败则中止部署，先修复问题。

stage 环境构建：

```bash
npm run lint
npm run build:stage
```

### Step 2: 环境确认

1. 确认目标环境对应的 env 文件（见上表）
2. 检查 `VITE_API_BASE_URL` 是否指向正确的 API 网关/后端地址
3. 确认 env 文件不含开发调试配置或敏感信息

### Step 3: 构建

```bash
# production（默认）
npm run build

# stage
npm run build:stage
```

产物输出到 `dist/` 目录。

### Step 4: 部署

根据平台选择部署方式：

**静态托管（Nginx / OSS / CDN / Vercel / Netlify）：**

1. 上传 `dist/` 目录内容
2. 配置 SPA fallback：`try_files $uri $uri/ /index.html;`
3. 配置 `/api` 反向代理至后端（当前 env 使用相对路径 `/api`）

**Docker（可选，项目未内置 Dockerfile）：**

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
# 需自行提供 nginx.conf，含 SPA fallback 与 /api 反向代理
```

### Step 5: 验证

- [ ] 首页加载正常
- [ ] 客户端路由跳转正常
- [ ] API 请求返回正确（`/api` 代理生效）
- [ ] 静态资源加载正常
- [ ] 控制台无报错

## 回滚策略

保留上一版本构建产物，出现问题时：

1. 停止当前部署
2. 恢复上一版本 `dist/`
3. 验证服务恢复

## 注意事项

- 不在部署过程中修改代码
- 生产环境禁用 source map（Vite 默认 production 不生成）
- env 文件已纳入版本控制，修改 API 地址后需重新构建才能生效（`VITE_*` 变量在构建时注入）
