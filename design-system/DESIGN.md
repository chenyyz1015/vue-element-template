# Design System — Visual Context

> 项目标识见 [`PROJECT.md`](./PROJECT.md)。**语义色板（双主题）** 见 [`TOKENS.md`](./TOKENS.md)。

> Impeccable visual context. When `MASTER.md` exists, treat it as strategic rules; **色值以 `TOKENS.md` + `tokens/page-semantic.json` 为准**。  
> 运行时 L1/L2/桥接规则见 [`THEME.md`](./THEME.md)。

## Theme

- **Mode**: **Light 默认**（`page-semantic.json` → `theme.modeDefault`）；运行时 **light / dark** 切换 → [`THEME.md`](./THEME.md)
- **Register**: product
- **Scene**: Developer reviewing template docs and demo pages（pencil.dev 气质）

### 静态 vs 运行时

| 层级 | 文档 / 代码 | 说明 |
|------|-------------|------|
| L1 页面语义 | [`TOKENS.md`](./TOKENS.md)、`page-semantic.scss` | 背景/正文/边框等 **light+dark 成对**；`html.dark` 切换 |
| L2 EP 主色 | [`THEME.md`](./THEME.md) | `useThemeColor()`，默认 `#2563eb` |
| 内容主色桥 | `--dl-primary` | 跟随 `var(--el-color-primary)`，用于非 EP 自定义区块 |

设计新 UI 时：装饰/品牌用 L1 `--dl-accent`；需跟用户主题色的内容用 `--dl-primary` 或 EP 变量。Phase 1–4 同步见 `THEME.md`。

## Color Palette（L1 — 摘要）

完整 light/dark 表见 **`TOKENS.md`**。Light 默认摘要：

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FFFFFF` | Page bg |
| Surface muted | `#FAFAFA` | 交替 Section |
| Border | `#E5E5E5` | 导航、卡片 |
| Accent | `#FF8400` | eyebrow、高亮（非 EP primary） |
| CTA primary | `#141414` | 黑底主按钮 |
| Text | `#141414` | Headings |
| Text muted | `#666666` | Body |

Dark：背景 `#141414`、正文 `#FAFAFA`，accent 橙保留。

## Typography

| Role | Stack | CSS 变量 |
|------|-------|----------|
| Heading | DM Sans | `--dl-font-heading` |
| Body | Rubik | `--dl-font-body` |

字色随 L1（`--dl-text` / `--dl-text-muted`），非随主题色选择器变化。

## Spacing & Layout

- Base unit: 4px; common gaps: 16, 24, 32
- Section padding: `px-6 py-16 lg:px-8 lg:py-24`
- Border radius: `rounded-xl` cards, `rounded-2xl` hero blocks
- Layout shell: `default-layout`

## Components

- 表面/边框：使用 `var(--dl-*)` 或 `dl-surface-card` mixin
- Hover：`var(--dl-hover)`、accent 透明度
- Buttons：Element Plus primary + L1 CTA mixins
- Icons：`<SvgIcon name="..." />`

## Motion

- Duration: 150–200ms
- Easing: ease-out
- Respect `prefers-reduced-motion`

## Stack Mapping

- Vue 3 + `<script setup lang="ts">`
- UnoCSS + scoped SCSS `@apply`（BEM + `l-*`）
- 页面 token：`src/views/<page>/styles/_tokens.scss` 可 `@forward` 全局 `page-semantic`

## Anti-Patterns (Project)

See `.cursor/skills/impeccable/reference/anti-patterns-vue.md`
