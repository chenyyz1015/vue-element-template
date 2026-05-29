# Design System — Visual Context

> 项目标识见 [`PROJECT.md`](./PROJECT.md)。二次定制后请同步色板与字体约定。

> Impeccable visual context. When `MASTER.md` exists (ui-ux-pro-max `--persist` 或仓库模板), treat it as the source of truth and sync this file via `/impeccable document` or manual update.  
> `MASTER.md` 含 `color-primary-ep` / `color-accent-devtools` 等运行时 token；详见 [`THEME.md`](./THEME.md)。

## Theme

- **Mode**: Dark (devtools 默认可视稿)；运行时支持 **light / dark** 切换 → 见 [`THEME.md`](./THEME.md)
- **Register**: product
- **Scene**: Developer reviewing template docs and demo pages on a desktop monitor in a dim IDE-adjacent environment

### 静态 vs 运行时（UI 工作流必读）

| 层级 | 文档 | 说明 |
|------|------|------|
| L1 品牌面 | 本文件色板 | 导航/落地页等 **固定** slate + 绿色 `#22C55E` |
| L2 EP 主色 | [`THEME.md`](./THEME.md) | `useThemeColor()`，默认 `#2563eb`，用户可换预设/自定义 |

设计新 UI 时：Element Plus 交互用 L2；装饰性 devtools 绿用 L1。Phase 1–4 同步规则见 `THEME.md`。

## Color Palette（L1 — Devtools 品牌面）

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0F172A` | Page bg |
| Surface | `#1E293B` | Cards, sections |
| Border | `#334155` | Dividers, card borders |
| Accent / CTA | `#22C55E` | Devtools 链接、装饰强调（非 EP `type="primary"`） |
| Accent hover | `#4ADE80` | Link/button hover |
| Text | `#F8FAFC` | Headings |
| Text muted | `#94A3B8` | Body, secondary |

Neutrals are slate-tinted (not pure gray/black). Avoid gray text on green tinted backgrounds; use green shades or opacity.

**L2 默认主色**（Element Plus）：`#2563eb` — 运行时由 `ThemeControls` / `useThemeColor()` 覆盖，见 `THEME.md`。

## Typography

| Role | Stack | Notes |
|------|-------|-------|
| Heading | Space Grotesk (`.devtools-heading`) | Bold hierarchy, scale ≥ 1.25 between steps |
| Body | DM Sans | 45–75ch line length |
| Mono / labels | System mono | Uppercase section labels, badges |

## Spacing & Layout

- Base unit: 4px; common gaps: 16 (`spacing-md`), 24, 32
- Section padding: `px-6 py-16 lg:px-8 lg:py-24`
- Border radius: `rounded-xl` cards, `rounded-2xl` hero blocks
- Layout shell: `devtools-layout` for main routes

## Components

- Cards: `border border-[#334155] rounded-xl bg-[#1E293B] p-6`
- Hover: `hover:border-[#22C55E]/40` or `/50`, subtle green glow shadow
- Buttons: Element Plus + green accent for primary; visible focus rings
- Icons: `<SvgIcon name="..." />` from `src/assets/icons/`

## Motion

- Duration: 150–200ms transitions
- Easing: ease-out (no bounce/elastic)
- Respect `prefers-reduced-motion`

## Stack Mapping

- Vue 3 + `<script setup lang="ts">`
- UnoCSS utilities for layout/color
- SCSS scoped for component-specific styles
- Element Plus for interactive primitives

## Anti-Patterns (Project)

See `.cursor/skills/impeccable/reference/anti-patterns-vue.md`
