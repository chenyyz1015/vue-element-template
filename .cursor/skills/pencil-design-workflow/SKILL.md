---
name: pencil-design-workflow
description: "Pencil 视觉执行 Skill（Phase 2–3）：.pen 画布落地与 Vue 代码双向同步。完整工作流见 ai-frontend-design-workflow。Auto-use when user mentions Pencil, 视觉稿, 设计稿, mockup, wireframe, prototype, or Phase 2/3 visual/code sync."
---

# Pencil Design Workflow

**Phase 2–3 执行 Skill**：Pencil 可视稿 → Vue 代码 → 双向同步。

> 完整工作流（含 Phase 1 战略 + Phase 4 质量）见 **`.cursor/skills/ai-frontend-design-workflow/SKILL.md`**。
> 复杂任务先 invoke **design-director** Agent（`.cursor/agents/design-director.md`）。

## Prerequisites

- **ui-ux-pro-max**：`.cursor/skills/ui-ux-pro-max/`（项目已内置）
- **Pencil MCP**：`user-pencil`（编辑器已内置）
- **Python 3**：运行 ui-ux-pro-max 搜索脚本

## When to Apply

满足任一条件即启动本 Skill（完整三阶段）；用户仅要代码时可跳过 Phase 2：

| 触发词 | 示例 |
|--------|------|
| 设计 | 「设计一个登录页」「帮我设计 dashboard」 |
| 创建页面 | 「创建一个设置页面」「新建 landing page」 |
| 组件 | 「做一个用户卡片组件」「设计 pricing 区块」 |
| 开发（含 UI） | 「开发产品详情页 UI」 |
| 视觉 / 原型 | 「出视觉稿」「Pencil 画一下」 |

**不触发**：纯逻辑重构、API、无 UI 的 bugfix、仅改文案。

## Workflow Overview

```
Phase 1 战略规划 ──► Phase 2 Pencil ──► Phase 3 Vue + Sync ──► Phase 4 impeccable
 ui-ux-pro-max         .pen 文件          组件 / 页面              audit → polish
 (见 ai-frontend-     变量 & 组件        与 Pencil 对齐           通过 → 交付
  design-workflow)
```

复制进度清单：

```
- [ ] Phase 1: Design System + Brief（ui-ux-pro-max）
- [ ] Phase 2: Pencil frames & variables
- [ ] Phase 3: Vue implementation + sync verification
- [ ] Phase 4: impeccable audit → polish → gate
```

---

## Phase 1 — 设计规划（ui-ux-pro-max）

**目标**：产出可执行的 Design System 与设计简报，供 Pencil 与代码共用。

### 1.1 解析需求

提取：`product type`、`style keywords`、`industry`、`stack`（本项目默认 **vue**）、`page vs component`、`scope`。

### 1.2 生成 Design System（必须）

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<product> <keywords>" --design-system -p "<Project Name>" -f markdown
```

持久化（推荐，跨会话复用）：

```bash
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "<appName>" --page "<page-name>"
```

产出路径：`design-system/MASTER.md`、`design-system/pages/<page>.md`。

### 1.3 补充搜索（按需）

| 需求 | 命令 |
|------|------|
| 落地页结构 | `--domain landing "<hero pricing>"` |
| 无障碍 / 动效 | `--domain ux "accessibility animation"` |
| Vue 实现 | `--stack vue "layout responsive"` |

### 1.4 编写 Design Brief

按 [design-brief-template.md](design-brief-template.md) 填写，保存至：

```
design/briefs/YYYY-MM-DD-<slug>.md
```

**Phase 1 完成标准**：颜色/字体/间距/组件清单/页面区块结构已明确，且与 ui-ux-pro-max 输出一致；**L1/L2 与 light/dark** 已写入 Brief（见 `design-system/THEME.md`）。

---

## Phase 2 — Pencil 可视实现

**目标**：在 `.pen` 文件中落地 Phase 1 规范，形成可评审视觉稿。

### 2.1 文件约定

```
design/
├── briefs/           # 设计简报
├── pages/            # 页面级 .pen
│   └── <page>.pen
├── components/       # 组件级 .pen（可选）
│   └── <component>.pen
└── scripts/          # 创建 / 初始化 / 批量生成 .pen 的脚本（kebab-case）
```

**AI 边界**：新页面用 Pencil 出稿时，**创建 `.pen` 的生成脚本**（非 ui-ux-pro-max `search.py`）**仅**放 `design/scripts/`；禁止放在 `.cursor/skills/`、项目根 `scripts/`、`vite/`、`src/`。优先 Pencil MCP；仅当需可重复或离线初始化时再写脚本。`design/` 除 `README.md` 外均为本地临时产物，**勿提交 Git**。见 `design/README.md`、`.claude/rules/ai-frontend-design.md`。

`.pen` 为加密格式 — **禁止** Read/Grep；仅通过 Pencil MCP 访问。

### 2.2 Pencil MCP 标准流程

1. `get_editor_state({ include_schema: true })` — 首次必须带 schema
2. `get_guidelines()` — 列出可用 guide/style；按任务加载（如 landing-page、design-system）
3. `set_variables` — 将 Phase 1 色板/字体写入 Pencil 变量，含 `color-primary-ep` 与 `color-accent-devtools`（见 [pencil-sync.md](pencil-sync.md)、`design-system/THEME.md`）
4. `batch_design` — 创建 frame、组件、布局
5. `snapshot_layout` — 检查重叠/裁剪
6. `get_screenshot` — 视觉验收

### 2.3 与 Design System 对齐

| Design System 字段 | Pencil 动作 |
|--------------------|-------------|
| Primary / Secondary / CTA 色 | `set_variables` → color tokens |
| Heading / Body 字体 | `set_variables` → string tokens |
| 间距尺度 | number tokens（如 `spacing-md: 16`） |
| 页面区块 | 顶层 frame，命名与 brief 一致 |
| 可复用 UI | `reusable: true` 组件，供 batch_design 引用 |

### 2.4 Phase 2 完成标准

- 桌面帧（1440）+ 移动帧（375）已创建
- 变量与 `design-system/MASTER.md` 一致
- `get_screenshot` 确认无布局问题
- Brief 中每个区块在 Pencil 中有对应 frame

---

## Phase 3 — 代码实现与双向同步

**目标**：按 Pencil 稿与项目规范实现 Vue 代码，并保持设计 ↔ 代码可迭代对齐。

### 3.1 实现顺序

1. 读 `design-system/pages/<page>.md`（若有）+ brief + Pencil `batch_get` 结构
2. 遵循项目约定：`<script setup lang="ts">`、kebab-case 目录、`default-layout` 等现有模式
3. i18n 文案写入 `src/i18n/locales/`（数组用 `tm()`，`@` 用 `\\@`）
4. 用 UnoCSS 工具类映射 Pencil 色值与间距
5. **静态资源**：Pencil `export_nodes` 等产出按类型写入 `src/assets/`（见 `.claude/rules/ai-frontend-design.md`）；Vue 中用 `@/assets/images/<page>/…` 引用

### 3.2 Pencil → Code 映射

详见 [pencil-sync.md](pencil-sync.md)。摘要：

- Pencil 变量 → CSS / UnoCSS arbitrary values / SCSS 变量
- Frame → `<section>` 或 layout 插槽
- Reusable component → `src/components/com-*` 或页面 `components/*.vue`
- Text styles → `landing-heading` + 字号 utility（或 `@include dl-heading-*`）

### 3.3 Code → Pencil（反向同步）

用户改代码后需更新稿：

1. `batch_get` 读取目标 frame
2. `batch_design` 更新颜色、间距、 copy
3. `set_variables` 若 token 变更
4. `get_screenshot` 对比

### 3.4 验收（Phase 3 Gate）

- [ ] `npm run build` 通过
- [ ] Pencil screenshot 与浏览器截图区块一致
- [ ] ui-ux-pro-max Pre-Delivery Checklist（对比度、cursor-pointer、responsive）
- [ ] 无 i18n 控制台报错

**通过后进入 Phase 4** → 见 [impeccable SKILL](../impeccable/SKILL.md) 执行 `/audit` → `/polish`。

---

## Phase 4 — 质量审计（impeccable）

本 Skill 不执行 Phase 4，交由 **impeccable** 处理：

1. `/audit [target]` — 五维技术审计（a11y、perf、theming、responsive、anti-patterns）
2. `/critique [target]` — UX 启发式评审（可选，建议在 audit 前）
3. `/polish [target]` — 对齐 Design System 的最终精修
4. 复验：`/audit` 总分 ≥ 14/20，无 P0/P1

可选确定性扫描：`npx impeccable detect src/views/<target>/`

不通过 → 回到 Phase 2（视觉）或 Phase 3（代码），修复后重跑 Phase 4。

---

## Escalation — 设计总监

以下情况 **invoke design-director Agent**：

- 多页面 / 设计系统级任务
- 需并行：规范 + 视觉 + 代码
- 用户未明确阶段，需先规划再执行

设计总监负责角色分工，主 Agent 按分配执行各 Phase。

---

## Additional Resources

- 主编排：[ai-frontend-design-workflow/SKILL.md](../ai-frontend-design-workflow/SKILL.md)
- 质量监工（Phase 4）：[impeccable/SKILL.md](../impeccable/SKILL.md)
- 简报模板：[design-brief-template.md](design-brief-template.md)
- 双向同步细则：[pencil-sync.md](pencil-sync.md)
- UI 规范数据库：[ui-ux-pro-max/SKILL.md](../ui-ux-pro-max/SKILL.md)
