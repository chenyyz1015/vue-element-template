---
name: ai-frontend-design-workflow
description: "AI 前端设计工作流：ui-ux-pro-max 出策略 → pencil 出视觉与代码 → impeccable 保质量。在用户请求设计、创建页面/组件、视觉稿、UI 改版、设计系统、或需要 audit/polish 时自动应用。复杂任务先 invoke design-director Agent。"
---

# AI 前端设计工作流

**需求 → 战略规划 → 视觉执行 → 代码实现 → 质量审计 → 交付或迭代**

## 工具角色

| 工具 | 角色 | 核心职责 | 衡量标准 |
|------|------|----------|----------|
| **ui-ux-pro-max** | 设计战略顾问 | Design System、Brief、UX 补充搜索 | 方案的广度与正确性 |
| **pencil** | 视觉协同与执行者 | `.pen` 画布、变量 token、Vue 代码映射 | 设计与代码一致性 |
| **impeccable** | 代码级设计监工 | `/audit`、`/polish`、`/critique`、反模式库 | 代码实现质量与精确度 |

## 工作流概览

```
Phase 1 战略规划 ──► Phase 2 视觉落地 ──► Phase 3 代码实现 ──► Phase 4 质量审计
  ui-ux-pro-max          pencil (.pen)         Vue + sync           impeccable
  design-system/         design/pages/         src/views/           audit → polish
  design/briefs/         variables             i18n + build         通过 → 交付
                                                              不通过 → 回到 Phase 2/3
```

**进度清单**（复制跟踪）：

```
- [ ] Phase 1: Design System + Brief（ui-ux-pro-max）
- [ ] Phase 2: Pencil frames & variables
- [ ] Phase 3: Vue implementation + Pencil sync
- [ ] Phase 4: impeccable audit → polish → 验收
```

## When to Apply

| 触发场景 | 启动 Phase |
|----------|------------|
| 新建页面/组件、设计稿、原型 | 1 → 2 → 3 → 4（完整闭环） |
| 用户只要代码、明确跳过视觉稿 | 1 → 3 → 4 |
| UI 已实现，要审查/精修 | 4 only |
| 多页面 / 设计系统级任务 | invoke **design-director** 先分派 |

**不触发**：纯逻辑重构、API、无 UI 的 bugfix、仅改文案（无视觉影响）。

## Phase 1 — 战略规划（ui-ux-pro-max）

**Skill**：`.cursor/skills/ui-ux-pro-max/SKILL.md`

**目标**：产出 Design System 与设计 Brief，作为 Pencil 与代码的唯一真相源。

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<product> <keywords>" --design-system --persist -p "Vue Element Template" --page "<page-name>"
```

**产出**：
- `design-system/MASTER.md`（+ `design-system/pages/<page>.md`）
- `design/briefs/YYYY-MM-DD-<slug>.md`（按 `pencil-design-workflow/design-brief-template.md`）

**Gate**：色板、字体、间距、区块结构、组件清单已明确 → 进入 Phase 2。

## Phase 2 — 视觉落地（pencil）

**Skill**：`.cursor/skills/pencil-design-workflow/SKILL.md` Phase 2

**目标**：在 `.pen` 中落地 Phase 1 规范。

**关键动作**：
1. Pencil MCP `get_editor_state({ include_schema: true })`
2. `set_variables` ← Phase 1 tokens
3. `batch_design` → 375 + 1440 frames
4. `get_screenshot` 视觉验收

**产出**：`design/pages/<name>.pen`（或 `design/components/<name>.pen`）

**Gate**：截图与 Brief 区块一一对应 → 进入 Phase 3。

## Phase 3 — 代码实现（pencil + 项目规范）

**Skill**：`.cursor/skills/pencil-design-workflow/SKILL.md` Phase 3 + `pencil-sync.md`

**目标**：按 Pencil 稿与项目规范实现 Vue，并保持双向同步。

**关键动作**：
1. `batch_get` 读取 Pencil 结构
2. 实现 Vue（`<script setup lang="ts">`、kebab-case、i18n、UnoCSS）
3. `npm run build` + lint
4. 浏览器截图 ↔ Pencil screenshot 对比

**Gate**：构建通过 + 视觉对齐 → 进入 Phase 4。

## Phase 4 — 质量审计（impeccable）

**Skill**：`.cursor/skills/impeccable/SKILL.md`

**目标**：消除「廉价感」细节，确保可交付质量。

### 4.1 审计（必做）

```bash
# 确定性反模式扫描（项目内脚本，无需 npx）
node .cursor/skills/impeccable/scripts/detect.mjs src/views/<page>/
```

执行 `/audit`（或 `/impeccable audit`）或 invoke **design-inspector** Agent。上下文加载见 `.cursor/skills/impeccable/project-bridge.md`。
- 五维评分：Accessibility / Performance / Theming / Responsive / Anti-Patterns
- 输出 P0–P3 问题清单与推荐修复命令

### 4.2 精修（按 audit 结果）

执行 `/polish [target]` 或 `/critique [target]`（UX 层面）：
- 对齐 `design-system/MASTER.md`
- 修复交互状态、间距、对比度、反模式
- 再次 `npm run build` + lint

### 4.3 验收 Gate

- [ ] Audit Health Score ≥ 14/20（Good 及以上）
- [ ] 无 P0 / P1 未修复项
- [ ] `npm run build` 通过
- [ ] Pencil screenshot 与浏览器一致（若存在 `.pen`）

**不通过**：回到 Phase 2（视觉/token）或 Phase 3（代码），修复后重跑 Phase 4。

## 迭代微调路由

| 反馈类型 | 先改 | 后同步 | 再跑 |
|----------|------|--------|------|
| 视觉/token | Pencil `set_variables` | Vue 样式 | Phase 4 |
| 布局结构 | Pencil frames | Vue template | Phase 4 |
| 交互/逻辑 | Vue | Pencil 静态态 | Phase 4 |
| 文案 | i18n locales | Pencil text | Phase 4 |
| 质量/廉价感 | impeccable polish | — | audit 复验 |

## Escalation — 设计总监

以下情况 **invoke design-director Agent**（`.claude/agents/design-director.md`）：

- 多页面 / 设计系统级任务
- 需并行：规范 + 视觉 + 代码 + 审计
- 用户未明确阶段，需先规划再执行
- Phase 4 反复不通过，需仲裁设计 ↔ 代码冲突

## 设计产物目录

```
design/
├── briefs/           # 设计简报
├── pages/            # 页面级 .pen
└── components/       # 组件级 .pen（可选）
design-system/
├── MASTER.md         # 全局 Design System
└── pages/            # 页面级 override
```

## 参考

| 资源 | 路径 |
|------|------|
| 战略规划 | `.cursor/skills/ui-ux-pro-max/SKILL.md` |
| Pencil 工作流 | `.cursor/skills/pencil-design-workflow/SKILL.md` |
| 双向同步 | `.cursor/skills/pencil-design-workflow/pencil-sync.md` |
| 质量监工 | `.cursor/skills/impeccable/SKILL.md` + `project-bridge.md` |
| 23 命令快捷 | `/audit` `/polish` `/critique`（pinned）· `/impeccable <cmd>` |
| 设计总监 | `.claude/agents/design-director.md` |
| 设计监工 Agent | `.claude/agents/design-inspector.md` |
