---
name: directives
description: Vue 自定义指令规范，包括 v-permission、v-role 等 RBAC 权限指令的用法、目录结构和注册方式。在实现按钮级权限控制或新增自定义指令时使用。
---

# 自定义指令

## 目录结构

```
src/directives/
├── index.ts              # import.meta.glob 自动扫描 modules 并注册
└── modules/              # 按业务功能划分，camelCase 文件名
    ├── permission.ts     # v-permission
    └── role.ts           # v-role
```

- **modules/**：每个文件对应一个指令实现，文件名 **camelCase**（如 `permission.ts` → `v-permission`）
- **index.ts**：`import.meta.glob('./modules/*.ts', { eager: true })` 自动导入，批量 `app.directive`
- **禁止**在 `main.ts` 或其他业务文件中逐个 `app.directive`；统一 `app.use(directivesPlugin)`

## 新增指令

1. 在 `src/directives/modules/` 新建 camelCase 文件（文件名即模板指令名，不含 `v-` 前缀）
2. 使用 **`export default`** 导出指令对象
3. 无需修改 `index.ts`；模板中使用 `v-xxx`

```typescript
// modules/permission.ts
export default {
  mounted(el, binding) {
    /* ... */
  },
} satisfies Directive;
```

## RBAC 指令用法

| 指令                  | 示例                                                   |
| --------------------- | ------------------------------------------------------ |
| `v-permission`        | `v-permission="['a:b:c']"` 或 `v-permission="'a:b:c'"` |
| `v-permission.all`    | `v-permission.all="['a','b']"`                         |
| `v-role`              | `v-role="'admin'"` 或 `v-role="['admin']"`             |
| `v-role.all`          | `v-role.all="['a','b']"`                               |

行为说明：无权限/角色时通过 `display: none` 隐藏（非 DOM 移除）；`usePermission` 已支持超管权限码 `*:*:*` 与角色 `admin`。

```vue
<el-button v-permission="'demo:edit'">编辑</el-button>
<el-button v-permission.all="['demo:edit', 'demo:delete']">批量</el-button>
<el-button v-role="'admin'">管理员</el-button>
<el-button v-role.all="['admin', 'editor']">多角色</el-button>
<el-button v-permission="['system:user:add', 'system:user:edit']">新增/修改</el-button>
```

## 注意

- Composables / stores 在指令内可直接使用（已 auto-import），无需手动 import `usePermission` 等

完整原文见 `.claude/rules/directives.md`。
