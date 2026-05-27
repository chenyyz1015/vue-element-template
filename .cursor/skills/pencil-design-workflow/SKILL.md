---
name: pencil-design-workflow
description: "Orchestrates UI design from spec to Pencil prototype to Vue code. Three phases: (1) ui-ux-pro-max design system & brief, (2) Pencil .pen visual implementation, (3) bidirectional sync & iteration. Auto-use when user mentions 设计、开发、创建页面、组件、design page, create component, mockup, wireframe, prototype, Pencil, 视觉稿, 设计稿, UI layout, or requests new pages/components with visual design."
---

# Pencil Design Workflow

端到端 UI 工作流：**设计规范 → Pencil 可视稿 → 代码实现 → 双向同步迭代**。

> 复杂任务或多人分工时，先 invoke **design-director** Agent（`.claude/agents/design-director.md`）进行任务拆解与角色分配。

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
Phase 1 设计规划 ──► Phase 2 Pencil 落地 ──► Phase 3 代码 + 双向同步
   ui-ux-pro-max          .pen 文件              Vue 组件 / 页面
   design-brief.md        变量 & 组件            与 Pencil 对齐迭代
```

复制进度清单：

```
- [ ] Phase 1: Design System + Brief
- [ ] Phase 2: Pencil frames & variables
- [ ] Phase 3: Vue implementation
- [ ] Phase 3b: Sync verification (screenshot vs browser)
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
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Vue Element Template" --page "<page-name>"
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

**Phase 1 完成标准**：颜色/字体/间距/组件清单/页面区块结构已明确，且与 ui-ux-pro-max 输出一致。

---

## Phase 2 — Pencil 可视实现

**目标**：在 `.pen` 文件中落地 Phase 1 规范，形成可评审视觉稿。

### 2.1 文件约定

```
design/
├── briefs/           # 设计简报
├── pages/            # 页面级 .pen
│   └── <page>.pen
└── components/       # 组件级 .pen（可选）
    └── <component>.pen
```

`.pen` 为加密格式 — **禁止** Read/Grep；仅通过 Pencil MCP 访问。

### 2.2 Pencil MCP 标准流程

1. `get_editor_state({ include_schema: true })` — 首次必须带 schema
2. `get_guidelines()` — 列出可用 guide/style；按任务加载（如 landing-page、design-system）
3. `set_variables` — 将 Phase 1 色板/字体写入 Pencil 变量（见 [pencil-sync.md](pencil-sync.md)）
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
2. 遵循项目约定：`<script setup lang="ts">`、kebab-case 目录、`devtools-layout` 等现有模式
3. i18n 文案写入 `src/i18n/locales/`（数组用 `tm()`，`@` 用 `\\@`）
4. 用 UnoCSS 工具类映射 Pencil 色值与间距

### 3.2 Pencil → Code 映射

详见 [pencil-sync.md](pencil-sync.md)。摘要：

- Pencil 变量 → CSS / UnoCSS arbitrary values / SCSS 变量
- Frame → `<section>` 或 layout 插槽
- Reusable component → `src/components/com-*` 或页面 `components/*.vue`
- Text styles → `devtools-heading` + 字号 utility

### 3.3 Code → Pencil（反向同步）

用户改代码后需更新稿：

1. `batch_get` 读取目标 frame
2. `batch_design` 更新颜色、间距、 copy
3. `set_variables` 若 token 变更
4. `get_screenshot` 对比

### 3.4 验收

- [ ] `npm run build` 通过
- [ ] Pencil screenshot 与浏览器截图区块一致
- [ ] ui-ux-pro-max Pre-Delivery Checklist（对比度、cursor-pointer、responsive）
- [ ] 无 i18n 控制台报错

---

## Escalation — 设计总监

以下情况 **invoke design-director Agent**：

- 多页面 / 设计系统级任务
- 需并行：规范 + 视觉 + 代码
- 用户未明确阶段，需先规划再执行

设计总监负责角色分工，主 Agent 按分配执行各 Phase。

---

## Additional Resources

- 简报模板：[design-brief-template.md](design-brief-template.md)
- 双向同步细则：[pencil-sync.md](pencil-sync.md)
- UI 规范数据库：`.cursor/skills/ui-ux-pro-max/SKILL.md`
