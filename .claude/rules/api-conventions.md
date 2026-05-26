# API 约定

## 目录结构

```
src/api/
├── request/             # 请求封装目录
│   ├── index.ts         # 入口：HTTP 方法导出
│   ├── instance.ts      # Axios 实例创建
│   ├── interceptors.ts  # 请求/响应拦截器
│   ├── pending.ts       # 重复请求取消
│   ├── auth.ts          # Token 与未授权处理
│   ├── error.ts         # HTTP 错误与 RequestError
│   └── response.ts      # 业务响应校验
├── index.ts             # 统一导出
├── constants.ts         # 常量配置
├── modules/             # 按业务域拆分的 API 模块
│   ├── user.ts
│   └── order.ts
└── types/               # 接口类型定义（模块名.d.ts）
    ├── common.d.ts
    └── user.d.ts
```

## 请求封装

所有 HTTP 请求通过 `src/api/request/` 统一封装，基于 Axios。对外从 `@/api/request` 或 `@/api` 引入。

### 内置能力

| 能力      | 说明                                                    |
| --------- | ------------------------------------------------------- |
| 请求配置  | Token 注入、`X-Request-Time`、超时、重复请求取消        |
| HTTP 错误 | 按状态码映射提示（400/401/403/404/500 等）              |
| 业务错误  | 校验 `code` 字段，非成功码统一提示并抛出 `RequestError` |
| 未授权    | HTTP 401 或业务未授权码，清除 Token 并跳转登录          |
| 网络异常  | 超时、断网、请求取消等场景独立提示                      |
| 文件场景  | `upload` 上传、`download` 下载（跳过业务 code 校验）    |

### 扩展配置 `CustomRequestConfig`

| 字段              | 类型      | 默认值  | 说明                     |
| ----------------- | --------- | ------- | ------------------------ |
| `showError`       | `boolean` | `true`  | 是否自动弹出错误提示     |
| `skipAuth`        | `boolean` | `false` | 是否跳过 Token 注入      |
| `skipBizCheck`    | `boolean` | `false` | 是否跳过业务 `code` 校验 |
| `cancelDuplicate` | `boolean` | `true`  | 是否取消重复请求         |

```typescript
import { get, post, put, patch, del, upload, download } from "@/api/request";

// GET 请求
const { data } = await get<User[]>("/users");

// 静默请求（不弹错误提示）
const { data } = await get("/users", { showError: false });

// 公开接口（无需 Token）
await post("/auth/login", body, { skipAuth: true });

// 上传文件
await upload("/files", formData);

// 下载文件
const blob = await download("/export/users");
```

### 错误对象 `RequestError`

请求失败时抛出 `RequestError`，包含：

- `message` — 错误提示
- `bizCode` — 业务错误码
- `httpStatus` — HTTP 状态码
- `responseData` — 原始响应体
- `canceled` — 是否为取消的请求

业务代码推荐从 `@/api` 或 `@/api/modules/xxx` 引入封装好的接口函数，而非直接调用 `get/post`。

```typescript
import { getUserList, createUser } from "@/api/modules/user";
// 或
import { getUserList } from "@/api";
```

## 响应格式

后端 API 统一返回以下结构（定义于 `src/api/types/common.d.ts`）：

```typescript
interface ApiResponse<T = unknown> {
  code: number; // 0 或 200 表示成功
  data: T; // 业务数据
  message: string; // 提示信息
}
```

## 类型定义

- 所有接口类型定义放在 `src/api/types/` 目录
- 文件命名：**模块名.d.ts**（如 `user.d.ts`、`order.d.ts`）
- 通用类型放在 `common.d.ts`（`ApiResponse`、`PageParams`、`PageResult` 等）
- 模块 API 文件从对应 `.d.ts` 引入类型，不在模块内重复定义

```typescript
// src/api/types/user.d.ts
export interface User {
  id: number;
  name: string;
  email: string;
}

export interface GetUserListParams {
  page?: number;
  size?: number;
}
```

## API 模块

按业务域拆分，每个模块一个文件，放在 `src/api/modules/`：

```typescript
// src/api/modules/user.ts
import { get, post } from "@/api/request";
import type {
  CreateUserParams,
  GetUserListParams,
  User,
} from "@/api/types/user";
import type { PageResult } from "@/api/types/common";

/** 获取用户列表 */
export function getUserList(params?: GetUserListParams) {
  return get<PageResult<User>>("/users", { params });
}

/** 创建用户 */
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

- **请求拦截器**：默认配置、Token 注入、重复请求取消、请求头处理
- **响应拦截器**：HTTP 状态码处理、业务 `code` 校验、Blob 响应跳过业务校验
- **401 / 未授权**：清除 Token，跳转 `/login?redirect=...`
- **业务层**：使用 `async/await` + `try/catch`，可捕获 `RequestError` 做精细化处理
- **禁止使用** `.then()` / `.catch()` 链式调用

```typescript
import { getUserList } from "@/api/modules/user";
import type { RequestError } from "@/api/types/common";

async function fetchUsers() {
  try {
    const { data } = await getUserList({ page: 1, size: 10 });
    users.value = data.list;
  } catch (error) {
    const err = error as RequestError;
    if (err.canceled) return;
    // 其他业务逻辑
  }
}
```

## 环境变量

配置文件：`.env.development`（开发）、`.env.stage`（预发）、`.env.production`（生产）。

| 变量                | 说明             | env 默认值             | 代码 fallback              |
| ------------------- | ---------------- | ---------------------- | -------------------------- |
| `VITE_APP_TITLE`    | 应用标题         | `Vue Element Template` | —                          |
| `VITE_API_BASE_URL` | API 基础路径     | `/api`                 | `/api`（`constants.ts`）   |
| `VITE_API_TIMEOUT`  | 请求超时（毫秒） | `60_000`               | `15_000`（`constants.ts`） |

开发环境代理（`vite.config.ts`，仅 `npm run dev` 生效）：

```typescript
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

stage / production 构建后需在 Nginx 或 CDN 层配置 `/api` 反向代理。

## 命名约定

| 类型         | 规范                  | 示例                             |
| ------------ | --------------------- | -------------------------------- |
| API 模块文件 | 业务域 camelCase      | `user.ts`、`order.ts`            |
| 类型定义文件 | 模块名.d.ts           | `user.d.ts`、`order.d.ts`        |
| API 函数     | 动词 + 名词 camelCase | `getUserList`、`createOrder`     |
| 类型/接口    | PascalCase            | `User`、`CreateOrderParams`      |
| 请求路径     | kebab-case            | `/user-profiles`、`/order-items` |

## 分页约定

定义于 `src/api/types/common.d.ts`：

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
