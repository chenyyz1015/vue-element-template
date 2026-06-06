# 自定义指令

## 目录结构

```
src/directives/
├── index.ts              # import.meta.glob 自动扫描 modules 并注册
└── modules/              # 按业务功能划分，kebab-case 文件名
```

- **modules/**：每个文件对应一个指令实现，文件名 **kebab-case**（如 `permission.ts` → `v-permission`）
- **index.ts**：`import.meta.glob('./modules/*.ts', { eager: true })` 自动导入，`directivesPlugin.install` 批量 `app.directive`
- **禁止**在 `main.ts` 或其它业务文件中逐个 `app.directive`；统一 `app.use(directivesPlugin)`

## 新增指令

1. 在 `src/directives/modules/` 新建 kebab-case 文件（文件名即模板指令名，不含 `v-` 前缀）
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

```vue
<el-button v-permission="'demo:edit'">编辑</el-button>
<el-button v-permission.all="['demo:edit', 'demo:delete']">批量</el-button>
```

## 注意

- Composables / stores 在指令内可直接使用（已 auto-import），无需手动 import `usePermission` 等
