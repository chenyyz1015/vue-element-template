# 自定义指令

## 目录结构

```
src/directives/
├── index.ts              # import.meta.glob 自动扫描 modules 并注册
└── modules/              # 按业务功能划分，camelCase 文件名
    ├── permission.ts     # 示例：v-permission
    └── role.ts           # 示例：v-role
```

- **modules/**：每个文件对应一个指令实现，文件名 **camelCase**（如 `permission.ts` → `v-permission`）
- **index.ts**：`import.meta.glob('./modules/*.ts', { eager: true })` 自动导入，`directivesPlugin.install` 批量 `app.directive`
- **禁止**在 `main.ts` 或其它业务文件中逐个 `app.directive`；统一 `app.use(directivesPlugin)`

## 新增指令

1. 在 `src/directives/modules/` 新建 camelCase 文件（文件名即模板指令名，不含 `v-` 前缀，如 `permission.ts` → `v-permission`）
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

## 与 RBAC 的关系

- 按钮级权限：`v-permission`、`v-permission.all`（见 `modules/permission.ts`）
- 按钮级角色：`v-role`、`v-role.all`（见 `modules/role.ts`）
- 逻辑依赖 `usePermission()`（auto-import），路由级权限见 `.claude/rules/router.md`

| 参考实现（历史模板）         | 本项目                                                 |
| ---------------------------- | ------------------------------------------------------ |
| `v-hasPermi="['a:b:c']"`     | `v-permission="['a:b:c']"` 或 `v-permission="'a:b:c'"` |
| `v-hasPermi.all="['a','b']"` | `v-permission.all="['a','b']"`                         |
| `v-hasRole="['admin']"`      | `v-role="'admin'"` 或 `v-role="['admin']"`             |
| `v-hasRole.all="['a','b']"`  | `v-role.all="['a','b']"`                               |

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
