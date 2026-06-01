# 语义色板（双主题模式）

> **单一事实来源（SSOT）**：`design-system/tokens/page-semantic.json`  
> **运行时实现**：`src/styles/theme/page-semantic.scss` + **`src/styles/theme/semantic-vars.scss`**（全局 `html` / `html.dark` 注入 `--dl-*`）  
> **运行时规则**：[`THEME.md`](./THEME.md) · **视觉说明**：[`DESIGN.md`](./DESIGN.md)

页面设计（Pencil / Brief）产出的色板**必须先写入上述 JSON + SCSS**，再同步 Pencil `set_variables` 与 `design-system/pages/<page>.md`。禁止仅在组件内硬编码 hex 而不同步文档。

## 三层色彩模型

| 层级 | 名称 | 是否随 `useThemeColor` 变化 | 是否随 `useThemeMode` 变化 | 典型 token |
|------|------|------------------------------|---------------------------|------------|
| **L1** | 页面语义面 | 否（品牌 accent 固定） | **是**（背景/正文/边框等 light↔dark） | `--dl-bg`、`--dl-text`、`--dl-accent` |
| **L2** | 内容主色（EP） | **是** | **是**（色阶按 dark 重算） | `--el-color-primary*`、`useThemeColor()` |
| **L2→L1 桥** | 页面内容主色 | **是**（跟随 L2） | 间接（随 EP 色阶） | `--dl-primary` → `var(--el-color-primary)` |

- **改主题色**：`ThemeControls` → `useThemeColor()` → Element Plus 组件 + 使用 `var(--dl-primary)` 的自定义区块一并更新。
- **改明暗模式**：`useThemeMode()` → `html.dark` → `--dl-*` 切换为 dark 列；`applyElementPlusPrimaryColor` 按模式重算 L2 色阶；字体族不变，**字色/背景**随 L1 变化。

## Light / Dark 语义对照

| 语义角色 | Pencil 建议 key | CSS 变量 | Light | Dark |
|----------|-----------------|----------|-------|------|
| 页面背景 | `color-bg-light` / `color-bg-dark` | `--dl-bg` | `#FFFFFF` | `#141414` |
| 交替表面 | `color-surface-light` / `color-surface-dark` | `--dl-surface` | `#FAFAFA` | `#1A1A1A` |
| 边框 | `color-border-light` / `color-border-dark` | `--dl-border` | `#E5E5E5` | `#2A2A2A` |
| 标题/正文 | `color-text-light` / `color-text-dark` | `--dl-text` | `#141414` | `#FAFAFA` |
| 次要文字 | `color-text-muted-light` / `color-text-muted-dark` | `--dl-text-muted` | `#666666` | `#A3A3A3` |
| 弱化文字 | `color-text-dim-light` / `color-text-dim-dark` | `--dl-text-dim` | `#999999` | `#737373` |
| 品牌 accent | `color-accent-brand` | `--dl-accent` | `#FF8400` | `#FF8400` |
| 主按钮底 | `color-cta-light` / `color-cta-dark` | `--dl-cta` | `#141414` | `#FAFAFA` |
| EP 主色默认 | `color-primary-ep` | `--el-color-primary` | `#2563eb` | `#2563eb`（色阶随模式变） |
| 内容主色桥 | — | `--dl-primary` | `var(--el-color-primary)` | 同左 |

## 字体（双模式共用栈，颜色随 L1）

| 角色 | Pencil key | CSS 变量 | 值 |
|------|------------|----------|-----|
| 标题 | `font-heading` | `--dl-font-heading` | DM Sans |
| 正文 | `font-body` | `--dl-font-body` | Rubik |

Scoped 样式通过 `_mixins.scss` 的 `dl-heading-*` / `dl-body-*` 已绑定上述变量；布局壳 `font-family` 使用 `--dl-font-body`。

## 同步工作流

```
Pencil / Brief 定稿色板（须含 light + dark 两列）
    ↓
design-system/tokens/page-semantic.json
    ↓
src/styles/theme/page-semantic.scss（$dl-* / $dl-*-dark）
    ↓
src/styles/index.scss → semantic-vars → html / html.dark
    ↓
design-system/pages/<page>.md 记录页面级 override
    ↓
Pencil set_variables（成对 light/dark key）
```

**页面级 override** 仍写在 `design-system/pages/*.md`，但新增/改色必须回写 JSON + SCSS，否则视为未完成同步。

## Vue 使用约定

- 页面/布局样式：优先 `var(--dl-*)` 或 `@include dl-*` mixins（`src/views/landing/styles/_mixins.scss`）
- 需要跟随用户主题色的非 EP 区块：`color: var(--dl-primary)` 或 `border-color: var(--dl-primary)`
- Element Plus：`var(--el-color-primary)`，禁止写死 `#2563eb`
- 禁止在业务组件重复实现 `localStorage` 换肤

## 变更检查清单

```
- [ ] page-semantic.json 与 page-semantic.scss 双列（light/dark）一致
- [ ] Pencil 变量含成对 light/dark 背景与文字色
- [ ] pages/<page>.md 仅记录与 Master 的差异，并注明模式
- [ ] 浏览器 light/dark 各验收；切换 ≥2 种 EP 主色时 --dl-primary 跟随
- [ ] 改 L2 默认：var.scss、DEFAULT_PRIMARY_COLOR、TOKENS.json ep.primaryDefault
```
