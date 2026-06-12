---
description: 分析并修复指定的 Issue 或 Bug
argument-hint: [issue-description-or-number]
---

# 修复 Issue

请分析并修复以下问题：$ARGUMENTS

## 工作流程

1. **理解问题**
   - 阅读 Issue 描述，明确预期行为与实际行为
   - 定位相关代码文件

2. **诊断根因**
   - 追踪数据流和调用链
   - 检查是否有类似问题的历史修复

3. **实施修复**
   - 遵循项目代码规范（见 `.codex/rules/`）
   - 保持最小改动范围
   - 不引入无关重构

4. **验证**
   - 运行 `npm run lint` 确保无 lint 错误
   - 运行 `npm run build` 确保类型检查和构建通过
   - 描述如何手动验证修复效果

## 约束

- Vue 组件统一使用 `<script setup lang="ts">` + `<style lang="scss" scoped>`
- 单文件组件顺序：script → template → style
- 异步逻辑统一使用 `async/await`，禁止 `.then()` / `.catch()` 链式调用
- 公共/布局组件使用 PascalCase 目录 + `index.vue`，页面使用 kebab-case 目录
- 非业务公共组件 `Com` 前缀（PascalCase 目录），业务公共组件 `Biz` 前缀（PascalCase 目录）
- 页面/布局私有子组件 PascalCase，放 `components/` 子目录，手动 import
- 不手动 import 已由 auto-import 覆盖的 API
- 不手动 import `src/components/` 公共组件（unplugin-vue-components 已配置）
- 布局组件、私有子组件、同级辅助文件允许手动 import
- 配置文件使用 ESModule 格式
- 遵循 Conventional Commits 提交规范

## 输出

修复完成后提供：

- 根因分析
- 修改文件列表
- 验证步骤
