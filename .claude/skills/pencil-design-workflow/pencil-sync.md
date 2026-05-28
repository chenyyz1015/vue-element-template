# Pencil ↔ Vue Bidirectional Sync

## Token Mapping

Design System / Pencil variable → Vue implementation:

| Pencil variable (example) | Vue / CSS |
|---------------------------|-----------|
| `color-primary` | `#22C55E` or `text-[#22C55E]` |
| `color-cta` | Green CTA button classes |
| `font-heading` | `.devtools-heading` + Space Grotesk |
| `font-body` | `font-[DM_Sans,sans-serif]` |
| `spacing-unit` | UnoCSS gap/padding scale (×1, ×2, ×3) |
| `radius-lg` | `rounded-2xl` |

### set_variables example

From ui-ux-pro-max output:

```json
{
  "color-primary": { "type": "color", "value": "#22C55E" },
  "color-secondary": { "type": "color", "value": "#1E293B" },
  "color-cta": { "type": "color", "value": "#22C55E" },
  "color-bg": { "type": "color", "value": "#0F172A" },
  "color-text": { "type": "color", "value": "#F8FAFC" },
  "color-text-muted": { "type": "color", "value": "#94A3B8" },
  "font-heading": { "type": "string", "value": "Space Grotesk" },
  "font-body": { "type": "string", "value": "DM Sans" },
  "spacing-md": { "type": "number", "value": 16 }
}
```

Call via Pencil MCP `set_variables` with `filePath: "design/pages/<name>.pen"`.

## Structure Mapping

| Pencil | Vue |
|--------|-----|
| Page frame (1440×…) | Page `index.vue` inside `devtools-layout` |
| Section frame | `<section id="…">` |
| Reusable component | `com-*` / page `components/*.vue` |
| Auto-layout vertical | `flex flex-col gap-*` |
| Auto-layout horizontal | `flex items-center gap-*` |
| Card frame | `border border-[#334155] rounded-xl bg-[#1E293B] p-6` |

## Sync Workflows

### Design-first（默认）

1. Phase 1 brief + variables defined
2. Pencil `batch_design` builds frames
3. `batch_get` export structure → implement Vue
4. Browser screenshot ↔ `get_screenshot` diff

### Code-first（用户已改代码）

1. Read changed Vue files
2. `batch_get` affected Pencil frames
3. `batch_design` update properties to match
4. Update `design-system/pages/*.md` if tokens changed

### Token change（全局换肤）

1. Update `design-system/MASTER.md`
2. `set_variables` on all `.pen` files
3. Update `src/styles/` or UnoCSS if needed
4. Re-screenshot verify

## Pencil MCP Quick Reference

| Tool | When |
|------|------|
| `get_editor_state(include_schema: true)` | Start of every Pencil session |
| `get_guidelines({ category, name })` | Before batch_design for task patterns |
| `set_variables` | After Phase 1, before drawing |
| `batch_design` | Create / update nodes |
| `batch_get` | Read structure before code or sync |
| `snapshot_layout(problemsOnly: true)` | Layout QA |
| `get_screenshot` | Visual QA |
| `export_nodes` | Asset export if needed |

## i18n Reminders (Vue phase)

- Array messages: use `tm()`, not `t(..., { returnObjects: true })`
- Literal `@` in copy: escape as `\\@` in locale files
- Dynamic keys: keep parity in `zh-CN.json` and `en-US.json`
