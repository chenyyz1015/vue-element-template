# 代码规范速查

> 在阶段 5 代码开发中必须遵循。详细规则见 `.claude/rules/`。

## 开发前必读文件

- `.claude/rules/code-style.md` — 组件、Store、命名、defineModel、useTemplateRef 规范
- `.claude/rules/api-conventions.md` — API 封装、错误处理、分页规范
- `.claude/rules/css-naming.md` — BEM + UnoCSS @apply 规范
- `.claude/rules/directives.md` — 自定义指令规范
- `src/router/routes.ts` — 现有路由结构
- `src/i18n/locales/zh-CN.json` — 现有 i18n key（页面生成时的类型基准）

## 产出物清单

按业务模块创建，模块名用 kebab-case：

```
src/views/<module>/
├── index.vue                     # 页面入口
├── types.d.ts                    # 页面级类型
├── constants.ts                  # 常量（表格列配置、表单规则等）
├── helpers.ts                    # 辅助函数
├── components/                   # 私有子组件（PascalCase，手动 import）
│   ├── SearchBar.vue
│   ├── DataTable.vue
│   └── EditDialog.vue
└── styles/                       # 页面级样式（可选）
    └── _tokens.scss

src/api/modules/<module>.ts       # API 函数
src/api/types/<module>.d.ts       # 接口类型
src/stores/modules/<module>.ts    # Pinia Store（如需要）
src/i18n/locales/zh-CN.json       # 追加中英文 key（zh-CN.json 为类型基准）
src/router/routes.ts              # 追加路由配置
```

## 生成顺序

1. **类型定义**（`src/api/types/<module>.d.ts`）
2. **API 模块**（`src/api/modules/<module>.ts`；如果后端未就绪，用 mock 数据：`Promise.resolve({ data: mockData })` 临时返回）
3. **i18n key**（追加到 `zh-CN.json` + `en-US.json`）
4. **页面组件**（`src/views/<module>/index.vue` + 子组件）
5. **Store**（如需要，`src/stores/modules/<module>.ts`）
6. **路由**（追加到 `src/router/routes.ts`，路径用 kebab-case）
7. **API 导出**（在 `src/api/index.ts` 添加 `export * from "./modules/<module>"`）

## 规范速查表

| 规范 | 要求 |
|------|------|
| 组件结构 | `<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>` |
| 方法定义 | 箭头函数 `const handleXxx = () => {}`（API 模块除外） |
| 双向绑定 | `defineModel<T>('name', { default: ... })` |
| 模板引用 | `useTemplateRef<FormInstance>('xxx')`，必须标注泛型 |
| API 调用 | `async/await` + `try/catch`，禁止 `.then()` / `.catch()` |
| 缓存读写 | 通过 `@/utils/xxx` 封装方法，禁止直接用 browserStorage |
| 样式类名 | 模板用 BEM，scoped 内 `@apply` 收敛 UnoCSS 原子类 |
| 组件命名 | 公共组件 PascalCase 目录（`Com`/`Biz` 前缀），页面 kebab-case 目录 |
| i18n | 用户可见文本用 `t('key')` 或 `$t('key')`，禁止硬编码 |
| 页面体量 | 单文件 ≤ 300 行，超出按职责拆分 |

## 禁止事项

- `import { defineModel } from 'vue'`（已 auto-import）
- `import { ref, computed } from 'vue'`（已 auto-import）
- `import { useI18n } from 'vue-i18n'`（已 auto-import）
- `import { ElMessage } from 'element-plus'`（已 auto-import）
- `import dayjs from 'dayjs'`（已 auto-import）
- `import ComXxx from '@/components/...'`（公共组件已 auto-import）
- 模板中堆叠 ≥ 3 个非 BEM、非 shortcuts 的 utility class
- 在组件内用 `function` 声明方法
- 使用 `.then()` / `.catch()` 链式调用（ElMessageBox 等反馈 API 除外）
- 穿透子组件 `$refs` 或 `$el`

## 阶段 6 规范审查清单

| 检查项 | 说明 |
|--------|------|
| 用户可见文案 | 无硬编码中文，全部走 `t('key')` |
| 路由注册 | path 和 name 已在 `routes.ts` 注册 |
| API 导出 | 已在 `src/api/index.ts` 添加 `export * from "./modules/<module>"` |
| 公共组件 | 无手动 import，直接使用 auto-import 的 PascalCase 组件 |
| 私有子组件 | 已手动 import（PascalCase） |
| 原子类 | 模板中无长串 utility class，样式收敛在 scoped `@apply` |
| 方法定义 | 使用箭头函数（API 模块除外） |
| v-model | 使用 `defineModel`（如适用） |
| 模板 ref | 使用 `useTemplateRef` 并标注泛型 |
| Store | Setup Store 风格，持久化配置正确 |
| 类型 | 无 `any`，Props/Emits 有 TS 类型 |
| BEM 类名 | 模板使用 BEM 语义类名 |
| 体量 | 单文件 ≤ 300 行 |
| API 模块 | 可保留 `export function` |
| APIs | `async/await` + `try/catch`，无 `.then()` |
| 缓存 | 通过 `@/utils/xxx` 封装，无直接 browserStorage |
