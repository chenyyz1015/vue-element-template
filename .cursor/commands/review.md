---
description: 对当前变更或指定文件进行代码审查，检查代码质量、潜在 Bug 和最佳实践
argument-hint: [file-or-directory]
---

# 代码审查

请对 $ARGUMENTS 进行全面的代码审查。

## 审查清单

1. **代码质量**
   - 是否遵循项目 ESLint / Stylelint 规范
   - TypeScript 类型是否完整、准确
   - 是否存在重复代码或可提取的公共逻辑

2. **Vue 3 最佳实践**
   - 是否使用 `<script setup lang="ts">`
   - 是否使用 `<style lang="scss" scoped>`
   - 单文件组件顺序是否为 script → template → style
   - 异步逻辑是否使用 `async/await`（禁止 `.then()` / `.catch()` 链式调用）
   - 是否正确使用 Composition API
   - 是否滥用 watch（优先考虑 computed）
   - 组件是否合理拆分

3. **自动引入规范**
   - vue / vue-router / pinia API 是否未手动 import（应依赖 auto-import）
   - composables / stores 是否未手动 import
   - `src/components/` 公共组件是否未手动 import（应依赖 unplugin-vue-components）
   - 页面/布局 `components/` 私有子组件是否正确手动引入
   - 布局组件是否正确手动引入

4. **目录与命名规范**
   - 公共组件是否遵循 PascalCase 目录 + `index.vue`，前缀 `Com` / `Biz`
   - 页面是否遵循 kebab-case 目录 + `index.vue`，布局是否遵循 PascalCase 目录 + `index.vue`
   - 私有子组件是否使用 PascalCase 命名

5. **性能与安全**
   - 是否存在不必要的重渲染
   - 是否有 XSS / 注入风险
   - API 请求是否有适当的错误处理

6. **可维护性**
   - 命名是否清晰语义化
   - 复杂逻辑是否有必要注释

## 输出格式

按优先级列出问题：

- 🔴 **Critical** — 必须修复
- 🟡 **Warning** — 建议修复
- 🟢 **Suggestion** — 可选优化

每个问题需包含：文件路径、问题描述、修复建议。
