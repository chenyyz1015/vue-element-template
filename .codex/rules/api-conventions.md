# API 约定

## 目录结构

```
src/api/
├── request/             # 请求封装目录
├── index.ts             # 统一导出
├── constants.ts         # 常量配置
├── modules/             # 按业务域拆分的 API 模块
└── types/               # 接口类型定义（模块名.d.ts）
```

## 请求封装

所有 HTTP 请求通过 `src/api/request/` 统一封装。对外从 `@/api/request` 或 `@/api` 引入。

### 扩展配置 `CustomRequestConfig`

| 字段 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `showError` | `boolean` | `true` | 是否自动弹出错误提示 |
| `skipAuth` | `boolean` | `false` | 是否跳过 Token 注入 |
| `skipBizCheck` | `boolean` | `false` | 是否跳过业务 `code` 校验 |
| `cancelDuplicate` | `boolean` | `true` | 是否取消重复请求 |
| `skipSentryReport` | `boolean` | `false` | 是否跳过 Sentry 异常上报 |

```typescript
import { get, post, put, patch, del, upload, download } from "@/api/request";

// GET 请求
const { data } = await get<User[]>("/users");

// 公开接口（无需 Token）
await post("/auth/login", body, { skipAuth: true });
```

## 响应格式

```typescript
interface ApiResponse<T = unknown> {
  code: number; // 0 或 200 表示成功
  data: T;
  message: string;
}
```

## 类型定义

- 所有接口类型定义放在 `src/api/types/` 目录
- 文件命名：**模块名.d.ts**（如 `auth.d.ts`）
- 通用类型放在 `common.d.ts`（`ApiResponse`、`PageParams`、`PageResult` 等）

## 错误处理

- 统一使用 `async/await` + `try/catch`，**禁止使用 `.then()` / `.catch()` 链式调用**
- 可捕获 `RequestError` 做精细化处理

## 环境变量

| 变量 | 说明 | 适用范围 |
|------|------|----------|
| `VITE_APP_NAME` | 项目名 | 全部 env 文件 |
| `VITE_APP_TITLE` | 应用展示标题 | 全部 env 文件 |
| `VITE_API_BASE_URL` | API 基础路径 | 全部 env 文件 |
| `VITE_API_TIMEOUT` | 请求超时（毫秒） | 全部 env 文件 |
| `VITE_API_PROXY_MAP` | 开发代理配置 | 仅 `.env.development` |
| `VITE_SENTRY_ENABLED` | 是否启用 Sentry | 全部 env 文件 |
| `VITE_SENTRY_DSN` | Sentry DSN（敏感，放 `*.local`） | 全部 env 文件 |
| `VITE_SENTRY_ENVIRONMENT` | 上报环境标识 | 全部 env 文件 |
| `VITE_SENTRY_RELEASE` | Release 版本 | 全部 env 文件 |
| `VITE_SENTRY_TRACES_SAMPLE_RATE` | 性能追踪采样率 0–1 | 全部 env 文件 |
| `VITE_SENTRY_PROJECT_SLUG` | Sentry 项目 slug | 全部 env 文件 |
| `VITE_POSTHOG_ENABLED` | 是否启用 PostHog | 全部 env 文件 |
| `VITE_POSTHOG_KEY` | PostHog API Key（敏感，放 `*.local`） | 全部 env 文件 |
| `VITE_POSTHOG_HOST` | PostHog 实例地址 | 全部 env 文件 |
| `VITE_CRYPTO_SECRET` | Crypto 加解密密钥（敏感，放 `*.local`） | 全部 env 文件 |
| `VITE_CRYPTO_IV` | Crypto 加解密 IV（敏感，放 `*.local`） | 全部 env 文件 |

## 命名约定

| 类型 | 规范 | 示例 |
|------|------|------|
| API 模块文件 | 业务域 camelCase | `auth.ts` |
| 类型定义文件 | 模块名.d.ts | `auth.d.ts` |
| API 函数 | 动词 + 名词 camelCase | `getUserList` |
| 类型/接口 | PascalCase | `User` |
| 请求路径 | kebab-case | `/user-profiles` |

## 分页约定

```typescript
interface PageParams {
  page: number; // 页码，从 1 开始
  size: number; // 每页条数
}

interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}
```
