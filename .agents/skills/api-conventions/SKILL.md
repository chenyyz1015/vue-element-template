---
name: api-conventions
description: Vue 项目 API 约定，包括请求封装、响应格式、类型定义、环境变量、错误处理等规范。在编写 API 请求代码、配置代理、处理请求错误或设计 API 模块时使用。
---

# API 约定

所有 HTTP 请求通过 `src/api/request/` 统一封装，基于 Axios。对外从 `@/api/request` 或 `@/api` 引入。

## 内置能力

| 能力       | 说明                                                    |
| ---------- | ------------------------------------------------------- |
| 请求配置   | Token 注入、`X-Request-Time`、超时、重复请求取消        |
| HTTP 错误  | 按状态码映射提示（400/401/403/404/500 等）              |
| 业务错误   | 校验 `code` 字段，非成功码统一提示并抛出 `RequestError` |
| 未授权     | HTTP 401 或业务未授权码，清除 Token 并跳转登录          |
| 网络异常   | 超时、断网、请求取消等场景独立提示                      |
| 文件场景   | `upload` 上传、`download` 下载（跳过业务 code 校验）    |
| Sentry     | HTTP/业务失败自动上报，`skipSentryReport` 可跳过        |

## 扩展配置 `CustomRequestConfig`

| 字段               | 类型      | 默认值  | 说明                     |
| ------------------ | --------- | ------- | ------------------------ |
| `showError`        | `boolean` | `true`  | 是否自动弹出错误提示     |
| `skipAuth`         | `boolean` | `false` | 是否跳过 Token 注入      |
| `skipBizCheck`     | `boolean` | `false` | 是否跳过业务 code 校验   |
| `cancelDuplicate`  | `boolean` | `true`  | 是否取消重复请求         |
| `skipSentryReport` | `boolean` | `false` | 是否跳过 Sentry 异常上报 |

## 基本用法

```typescript
import { get, post, put, patch, del, upload, download } from "@/api/request";

// GET 请求
const { data } = await get<User[]>("/users");

// 静默请求（不弹错误提示）
const { data } = await get("/users", { showError: false });

// 不上报 Sentry（如心跳、轮询）
await get("/health", { showError: false, skipSentryReport: true });

// 公开接口（无需 Token）
await post("/auth/login", body, { skipAuth: true });

// 上传文件
await upload("/files", formData);

// 下载文件
const blob = await download("/export/users");
```

## 错误对象 `RequestError`

请求失败时抛出 `RequestError`，包含：

- `message` — 错误提示
- `bizCode` — 业务错误码
- `httpStatus` — HTTP 状态码
- `responseData` — 原始响应体
- `canceled` — 是否为取消的请求

## 响应格式

后端 API 统一返回（定义于 `src/api/types/common.d.ts`）：

```typescript
interface ApiResponse<T = unknown> {
  code: number;   // 0 或 200 表示成功
  data: T;        // 业务数据
  message: string; // 提示信息
}
```

## 类型定义

- 所有接口类型定义放在 `src/api/types/` 目录
- 文件命名：**模块名.d.ts**（如 `user.d.ts`、`order.d.ts`）
- 通用类型放在 `common.d.ts`（`ApiResponse`、`PageParams`、`PageResult` 等）
- 模块 API 文件从对应 `.d.ts` 引入类型，不在模块内重复定义

## API 模块

按业务域拆分，每个模块一个文件，放在 `src/api/modules/`：

```typescript
// src/api/modules/user.ts
import { get, post } from "@/api/request";
import type { CreateUserParams, GetUserListParams, User } from "@/api/types/user";
import type { PageResult } from "@/api/types/common";

export function getUserList(params?: GetUserListParams) {
  return get<PageResult<User>>("/users", { params });
}

export function createUser(data: CreateUserParams) {
  return post<User>("/users", data);
}
```

## 统一导出

`src/api/index.ts` 导出 request 工具与各业务模块：

```typescript
export { default as request, del, get, post, put } from "./request";
export * from "./modules/user";
export * from "./modules/order";
```

## 错误处理

- 统一使用 `async/await` + `try/catch`，禁止 `.then()` / `.catch()` 链式调用
- 可捕获 `RequestError` 做精细化处理

```typescript
import { getUserList } from "@/api/modules/user";
import type { RequestError } from "@/api/types/common";

const fetchUsers = async () => {
  try {
    const { data } = await getUserList({ page: 1, size: 10 });
    users.value = data.list;
  } catch (error) {
    const err = error as RequestError;
    if (err.canceled) return;
    // 其他业务逻辑
  }
};
```

## 分页约定

定义于 `src/api/types/common.d.ts`：

```typescript
interface PageParams {
  page: number;  // 页码，从 1 开始
  size: number;  // 每页条数
}

interface PageResult<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
}
```

## 命名约定

| 类型         | 规范                  | 示例                          |
| ------------ | --------------------- | ----------------------------- |
| API 模块文件 | 业务域 camelCase      | `user.ts`、`order.ts`         |
| 类型定义文件 | 模块名.d.ts           | `user.d.ts`、`order.d.ts`     |
| API 函数     | 动词+名词 camelCase   | `getUserList`、`createOrder`  |
| 类型/接口    | PascalCase            | `User`、`CreateOrderParams`   |
| 请求路径     | kebab-case            | `/user-profiles`              |

## 环境变量

| 变量                          | 说明           | 默认值     |
| ----------------------------- | -------------- | ---------- |
| `VITE_API_BASE_URL`           | API 基础路径   | `/api`     |
| `VITE_API_TIMEOUT`            | 请求超时（ms） | `60_000`   |
| `VITE_API_PROXY_MAP`          | 开发代理配置   | 见 .env    |
| `VITE_SENTRY_ENABLED`         | 是否启用 Sentry | 开发 false |
| `VITE_SENTRY_DSN`             | Sentry DSN    | —          |

开发环境代理通过 `vite.config.ts` + `vite/helpers/parse.ts` 解析 `VITE_API_PROXY_MAP`。

完整原文见 `.claude/rules/api-conventions.md`。
