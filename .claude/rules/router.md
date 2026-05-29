# 路由与 RBAC 权限

## 目录结构

```
src/router/
├── index.ts           # createRouter、注册守卫、导出 router
├── routes.ts          # constantRoutes（系统路由 + 公开业务路由）
├── guard.ts           # 导航守卫（标题、登录态、动态路由、RBAC）
├── helpers.ts         # 路由过滤、访问校验、resetRouter
├── constants.ts       # 白名单、登录/403/404 path 常量
├── types.ts           # AppRouteRecordRaw 等类型
└── modules/           # 业务路由模块（kebab-case 文件名）
    ├── index.ts       # 聚合 asyncRoutes
    ├── app.ts         # 公开业务路由
    └── admin.ts       # 受保护业务路由示例
```

- **根目录**：主路由实例、守卫、常量路由、辅助函数
- **`modules/`**：按业务域拆分的路由模块，文件名 **kebab-case**
- **constantRoutes**：应用启动即注册（登录/403/404、公开页面）
- **asyncRoutes**：登录后按 RBAC 过滤，通过 `router.addRoute` 动态注入
- **404 通配符**：不在 `constantRoutes` 中注册；登录并成功注入 asyncRoutes 后，由 `addFallbackRoute()` 最后追加，避免抢先匹配 `/admin` 等异步 path

## RouteMeta 约定

| 字段 | 说明 |
| ---- | ---- |
| `titleKey` | i18n 标题 key |
| `icon` | 导航图标（SvgIcon name） |
| `requiresAuth` | 是否需要登录 |
| `roles` | 允许访问的角色列表 |
| `permissions` | 允许访问的权限码列表 |
| `roleMode` / `permissionMode` | `some`（默认，满足任一）或 `every`（满足全部） |
| `hidden` | 是否在菜单中隐藏 |

`roles` 与 `permissions` 同时配置时，需 **同时满足**（AND）。

## RBAC 架构

```
登录 → userStore.fetchUserInfo() → 获取 roles / permissions
     → permissionStore.generateRoutes() → filterAccessibleRoutes(asyncRoutes)
     → router.addRoute() → 路由级访问控制

组件/按钮 → usePermission() / v-permission → 按钮级访问控制
```

### Store

| 模块 | 职责 |
| ---- | ---- |
| `useUserStore` | 登录/登出、用户信息、roles、permissions |
| `usePermissionStore` | 动态路由生成、resetPermission |

### Composable

- `usePermission()`：`hasRole()`、`hasPermission()`，读取当前用户 roles / permissions
- VueUse 浏览器通知权限 API 自动导入为 `useBrowserPermission`（见 `vite/plugins/unplugin-auto-import.ts`）

### 指令

- `v-permission="'demo:edit'"` — 无权限时隐藏元素
- `v-permission.all="['a','b']"` — 需拥有全部权限

在 `main.ts` 通过 `app.use(directivesPlugin)` 注册（见 `src/directives/index.ts`、`.claude/rules/directives.md`）

### 工具函数

- `src/utils/permission.ts`：`matchRole`、`matchPermission`、`canAccessByMeta`

## 新增业务路由

1. 在 `src/router/modules/` 新建 kebab-case 模块文件
2. 公开路由导出到 `modules/app.ts` 的 `publicAppRoutes`，或写入 `routes.ts`
3. 受保护路由导出数组，并在 `modules/index.ts` 的 `asyncRoutes` 中聚合
4. 在 `meta` 中配置 `requiresAuth`、`roles`、`permissions`

## 对接后端

- API：`src/api/modules/auth.ts`（`login`、`getUserProfile`）
- 类型：`src/api/types/auth.d.ts`（`UserProfile` 含 `roles`、`permissions`）
- 开发环境默认启用 Mock 登录（见 `useUserStore`）；生产环境对接真实 API

## 示例

- 登录页：`/login`（Mock：admin/admin123、viewer/viewer123）
- 受保护页：`/admin`（需 `admin:view` 权限）
- 403：`/403` · 404：`/404`
