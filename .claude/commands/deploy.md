---
description: 执行项目构建与部署流程
argument-hint: [environment]
---

# 部署

目标环境：$ARGUMENTS（默认 production，可选 stage）

## 环境配置

| 环境        | 配置文件           | 构建命令                           |
| ----------- | ------------------ | ---------------------------------- |
| stage       | `.env.stage`       | `npm run build:stage`              |
| production  | `.env.production`  | `npm run build`                    |

| 变量                | 说明             | 默认值                 |
| ------------------- | ---------------- | ---------------------- |
| `VITE_APP_TITLE`    | 应用标题         | `Vue Element Template` |
| `VITE_API_BASE_URL` | API 基础地址     | `/api`                 |
| `VITE_API_TIMEOUT`  | 请求超时（毫秒） | `60_000`               |

> 各环境 `VITE_API_BASE_URL` 当前均为 `/api`，部署时需配置 Nginx/CDN 将 `/api` 反向代理至后端。

## 部署前检查

1. 确认当前分支和未提交变更：

   ```bash
   git status
   git log --oneline -5
   ```

2. 运行完整检查：

   ```bash
   npm run lint
   npm run build                    # production
   # 或
   npm run build:stage              # stage
   ```

3. 确认环境变量：
   - 检查目标 env 文件（`.env.production` 或 `.env.stage`）
   - 确认 `VITE_API_BASE_URL`、`VITE_API_TIMEOUT` 符合目标环境

## 构建

```bash
# production
npm run build

# stage
npm run build:stage
```

构建产物位于 `dist/` 目录。

## 部署步骤

根据实际部署平台执行（示例）：

### 静态托管（Nginx / OSS / CDN）

1. 上传 `dist/` 目录内容
2. 配置 SPA 路由回退：`try_files $uri $uri/ /index.html;`
3. 配置 `/api` 反向代理至后端服务

### Docker（可选，项目未内置 Dockerfile）

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
# 需自行提供 nginx.conf，含 SPA fallback 与 /api 反向代理
```

## 部署后验证

- [ ] 首页正常加载
- [ ] 路由跳转正常
- [ ] API 请求正常（`/api` 代理生效）
- [ ] 静态资源加载正常

## 回滚

保留上一版本 `dist/` 备份，出现问题时快速回滚。
