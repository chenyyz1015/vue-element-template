# Product Context

> 项目名（`VITE_APP_NAME`）与标识说明见 [`PROJECT.md`](./PROJECT.md)。二次定制后请同步更新本文件中的用户/品牌描述。

## Register

product

## Users & Purpose

- **Primary users**: Frontend developers adopting or extending this Vue 3 enterprise template
- **Context**: Local dev, scaffolding new pages/components, learning project conventions
- **Job to be done**: Ship consistent, production-grade UI quickly without reinventing layout, i18n, or design tokens

## Brand Personality

- Professional, developer-tool aesthetic (devtools dark theme)
- Confident but not flashy; clarity over decoration
- Technical credibility without SaaS clichés

## Anti-References

- Generic AI SaaS: purple-blue gradients, Inter everywhere, hero metric tiles, card-in-card grids
- Marketing-heavy landing pages that fight the product register
- Light/corporate admin templates inconsistent with existing dark devtools surfaces

## Strategic Design Principles

1. **Consistency with existing routes** (`/`, `/demo`, `/about`): same layout shell, typography, and color rhythm
2. **Design System hierarchy**: `design-system/MASTER.md` (ui-ux-pro-max) > `design-system/pages/*.md` > `DESIGN.md` > **`THEME.md`（运行时）**
3. **Runtime theme sync**: UI 变更须与 `useThemeColor` / `useThemeMode` 及 `ThemeControls` 一致；见 `THEME.md` 各 Phase 清单
4. **i18n-first**: no hardcoded UI copy; use `meta.titleKey` for routes
5. **Accessibility**: WCAG AA minimum in **both** light and dark; visible focus; `prefers-reduced-motion`
6. **Phase 4 gate**: impeccable audit ≥ 14/20 before UI delivery; Theming 含双模式 + 主色抽检

## Related Artifacts

| File | Role |
|------|------|
| `design-system/PROJECT.md` | `VITE_APP_NAME` / 缓存前缀（二次定制时先改 `.env.*`） |
| `design-system/DESIGN.md` | Visual tokens (Impeccable DESIGN context) |
| `design-system/THEME.md` | Runtime theme: EP 主色阶、明暗模式、Composable、工作流同步 |
| `design-system/MASTER.md` | ui-ux-pro-max generated system (when present, overrides DESIGN) |
| `design/briefs/` | Per-page design briefs |
| `design/pages/*.pen` | Pencil visual specs (MCP only) |
