---
name: sentry-fix-workflow
description: Triages Sentry issues via Sentry official MCP, classifies api_request_error vs runtime errors for this Vue app, implements fixes, verifies with npm run build, and resolves issues via scripts/sentry-resolve.sh. Use when fixing Sentry-reported exceptions, closing the monitoring loop, or investigating production errors from this project.
---

# Sentry 异常修复工作流

将 **Sentry 上报 → MCP 拉取 → 分辨归属 → 修复代码 → 构建验证 → 脚本 Resolved 闭环** 固化为标准流程。

## 前置

- 本地已配置 **Sentry 官方 MCP**（`mcp__sentry`，远程 HTTP 服务 `https://mcp.sentry.dev/mcp`，支持 OAuth 认证）。
- 项目 Sentry 初始化见 `src/sentry/`；环境变量见 `.env.*` 中 `VITE_SENTRY_*`。
- **闭环脚本**：`scripts/sentry-resolve.sh`（`npm run sentry:resolve`）。`SENTRY_URL`/`SENTRY_ORG` 可与构建共用；**Organization Token 仅 `org:ci`**，resolve 需 `.env.sentry-resolve.local` 中的 **`SENTRY_RESOLVE_AUTH_TOKEN`**（User Auth Token，`event:write`）。
- API 请求异常统一 `type: api_request_error`，上下文键 `api_error`（见 `src/sentry/types.ts`）。
- 生产堆栈若仍为 `assets/index-*.js`，检查 `VITE_SENTRY_RELEASE` 与构建期 Source Map 上传（`SENTRY_*`，见 README 环境变量）。

## 工作流

```
Task Progress:
- [ ] 1. 拉取待处理 Issue
- [ ] 2. 分辨是否为本项目异常
- [ ] 3. 定位根因并修复
- [ ] 4. npm run build 验证
- [ ] 5. 闭环（复现确认 + sentry-resolve）
```

### Step 1：拉取 Issue

1. 读取 `VITE_SENTRY_PROJECT_SLUG`（空则用 `VITE_APP_NAME`）作为 `project_slug`。
2. 调用 MCP `list_projects` 确认项目 slug 存在。
3. 调用 `list_issues`：
   - `project_slug`: 上一步 slug
   - `query`: `is:unresolved`（可按需加 `level:error`、`error.type:api_request_error`）
   - `limit`: 10–25
4. 对候选 Issue 调用 `get_issue_with_stacktrace`（`issue_id` 为数字 ID 或短 ID）。

### Step 2：分辨归属

按优先级判断 **是否应由当前仓库修复**：

| 信号 | 本项目 | 通常排除 |
|------|--------|----------|
| `contexts.api_error.type` = `api_request_error` | ✅ API 层 | — |
| 栈帧在 `src/` 且路径为 `.vue`/`.ts` | ✅ 应用代码 | — |
| 栈帧仅在 `node_modules`、浏览器扩展、chunk 哈希且无 `src/` | ❌ | 第三方/环境 |
| `environment` 与当前修复目标环境不一致 | ⚠️ 先确认 | 其他环境噪声 |
| 重复 401/登录过期且无代码变更 | ⚠️ 预期行为 | 可调采样或过滤 |

**api_request_error** 字段对照：

- `request.url` / `http.method` → `src/api/request/`
- `business.code` → `src/api/request/response.ts` 业务码
- `http.status` → `src/api/request/error.ts` HTTP 映射

非 API 类：查 Vue 组件栈、`router`、`stores`；使用 `systematic-debugging` skill。

### Step 3：修复

1. 最小改动修复根因，遵循 `AGENTS.md` / `.claude/rules/code-style.md`。
2. API 相关：优先修后端契约或前端错误处理，**不要**为掩盖问题关闭 `captureApiRequestError`。
3. 敏感信息不得写入上报载荷；脱敏逻辑在 `src/sentry/config.ts` `sanitizeForSentry`。
4. 若需本地复现：在 `.env.development.local` 设置 `VITE_SENTRY_ENABLED=true` 与有效 `VITE_SENTRY_DSN`。

### Step 4：验证

```bash
npm run build
```

失败则继续修复，不得标记闭环完成。

### Step 5：闭环（自动 Resolved）

1. 确认原路径不再产生新事件（或属预期行为则 `--status ignored`）。
2. 对**已修复且已验证**的 Issue 执行：

```bash
# 数字 ID 或短 ID（MCP 返回的均可）
npm run sentry:resolve -- 4
npm run sentry:resolve -- VUE-ELEMENT-TEMPLATE-4

# 多个 Issue
npm run sentry:resolve -- 4 5

# 仅预览请求
bash scripts/sentry-resolve.sh --dry-run 4
```

3. Resolve 用 User Token（`event:write`），勿用仅 `org:ci` 的 Organization Token；或 UI 手动 Resolve / MCP。
4. 回复用户：根因、修改文件、验证命令、Resolved 的 Issue ID。

## 输出模板

```markdown
## Sentry 修复报告

### Issue
- ID / 短 ID：
- 标题：
- 环境：

### 归属
- [ ] 本项目需修复 / [ ] 外部或预期行为

### 根因
（一两句话）

### 修改
- `path` — 说明

### 验证
- [ ] `npm run build` 通过
- [ ] 复现路径说明

### 闭环
- Sentry Resolved：`npm run sentry:resolve -- <id>` 已执行 / 否（原因）
```

## MCP 工具速查

| 工具 | 用途 |
|------|------|
| `list_projects` | 确认 org 内项目 |
| `list_issues` | 未解决 Issue 列表 |
| `get_issue_with_stacktrace` | Issue + 最新堆栈（首选） |
| `get_issue` / `get_latest_event` | 仅需元数据或单事件时 |

Sentry 官方 MCP 提供 16 个工具，以上为 Issue 修复流程的常用子集。

## 附加说明

- 开发环境默认 `VITE_SENTRY_ENABLED=false`，避免污染 Issue 列表。
- 与 `security-review` 并行：修复时检查是否泄露 Token/PII 至 `api_error.response.body`。
- **勿**对未修复、未验证的 Issue 执行 resolve，避免掩盖真实故障。
