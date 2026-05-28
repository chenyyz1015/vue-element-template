# Vue Element Template — Product Context

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
2. **Design System hierarchy**: `design-system/MASTER.md` (ui-ux-pro-max) > `design-system/pages/*.md` > this file
3. **i18n-first**: no hardcoded UI copy; use `meta.titleKey` for routes
4. **Accessibility**: WCAG AA minimum; visible focus; `prefers-reduced-motion`
5. **Phase 4 gate**: impeccable audit ≥ 14/20 before UI delivery

## Related Artifacts

| File | Role |
|------|------|
| `design-system/DESIGN.md` | Visual tokens (Impeccable DESIGN context) |
| `design-system/MASTER.md` | ui-ux-pro-max generated system (when present, overrides DESIGN) |
| `design/briefs/` | Per-page design briefs |
| `design/pages/*.pen` | Pencil visual specs (MCP only) |
