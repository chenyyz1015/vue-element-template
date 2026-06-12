---
name: code-review
description: 对代码变更进行审查，检查 Vue 3 + TypeScript 代码质量、项目规范、潜在 Bug 和最佳实践。在用户请求代码审查、PR review 或检查代码质量时使用。
---

# 代码审查

## 审查流程

1. 获取变更范围（`git diff` 或指定文件）
2. 逐文件审查，对照规范检查清单
3. 按优先级分类问题并给出修复建议
4. 总结审查结论

## 审查清单

### 1. 代码质量

- 是否遵循项目 ESLint / Stylelint 规范
- TypeScript 类型是否完整、准确，避免 `any`
- 是否存在重复代码或可提取的公共逻辑

### 2. Vue 3 规范

- 是否使用 `<script setup lang="ts">`
- 是否使用 `<style lang="scss" scoped>`
- 单文件组件顺序是否为 script → template → style
- 异步逻辑是否使用 `async/await`（禁止 `.then()` / `.catch()` 链式调用）
- 组件 / composable / helpers 内方法是否优先使用箭头函数
- 双向绑定是否使用 `defineModel`（而非 props + `update:*` + computed 包装）
- `defineEmits` 非 v-model 事件是否 kebab-case
- Composition API 使用是否恰当
- 组件是否合理拆分，单一职责

### 3. 自动引入规范

- vue / vue-router / pinia API 是否未手动 import
- composables / stores 是否未手动 import
- `src/components/` 公共组件是否未手动 import
- 页面/布局 `components/` 私有子组件是否正确手动引入
- 布局组件是否正确手动引入

### 4. 目录与命名规范

- 公共组件：PascalCase 目录 + `index.vue`，`Com` / `Biz` 前缀
- 页面：kebab-case 目录
- 布局：PascalCase 目录 + `index.vue`
- 私有子组件：PascalCase，放 `components/` 子目录
- SFC ≤300 行

### 5. 性能与安全

- 是否存在不必要的重渲染
- 是否滥用 watch（优先考虑 computed）
- 是否有 XSS / 注入风险（参考 `security-review` skill）
- API 请求是否有适当的错误处理

### 6. 可维护性

- 命名是否清晰语义化
- 复杂逻辑是否有必要注释
- Props / Emits 是否有类型声明

## 输出格式

按优先级列出问题：

- 🔴 **Critical** — 必须修复，阻塞合并
- 🟡 **Warning** — 建议修复
- 🟢 **Suggestion** — 可选优化

每个问题需包含：文件路径、行号、问题描述、修复建议。

```
## 审查摘要
- 审查文件数：N
- 问题总数：N（Critical: N, Warning: N, Suggestion: N）
- 总体评价：✅ 可合并 / ⚠️ 需修改 / ❌ 需重构

## 问题详情
[按优先级列出]

## 亮点
[值得肯定的写法]
```

## 原则

- 对事不对人，建议具体而非笼统
- 区分「必须修复」和「建议优化」
- 认可以上规范的好代码
- 参考 `.claude/rules/` 下各规范文件获取详细约定
