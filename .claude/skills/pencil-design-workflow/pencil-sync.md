# Pencil ↔ Vue Bidirectional Sync

## Token Mapping

Design System / Pencil variable → Vue implementation。运行时主题规则见 **`design-system/THEME.md`**。

| Pencil variable (example) | Vue / CSS | 层级 |
|---------------------------|-----------|------|
| `color-accent-devtools` | `#22C55E`、`text-[#22C55E]` | L1 品牌（静态） |
| `color-primary-ep` | `var(--el-color-primary)` / `useThemeColor()` | L2 EP 主色（可切换） |
| `color-bg` | `#0F172A`（dark 壳） | L1 |
| `color-bg-light` | 浅色模式页背景参考 | 随 `html.dark` |
| `color-secondary` | `#1E293B` 卡片面 | L1 |
| `font-heading` | `.devtools-heading` + Space Grotesk | — |
| `font-body` | `font-[DM_Sans,sans-serif]` | — |
| `spacing-unit` | UnoCSS gap/padding scale (×1, ×2, ×3) | — |
| `radius-lg` | `rounded-2xl` | — |

> 勿将 `color-primary-ep` 与 devtools 绿色 `#22C55E` 混为同一 token；前者对应 Element Plus，后者为营销/导航 accent。

### set_variables example

From ui-ux-pro-max + `THEME.md`:

```json
{
  "color-accent-devtools": { "type": "color", "value": "#22C55E" },
  "color-primary-ep": { "type": "color", "value": "#2563eb" },
  "color-secondary": { "type": "color", "value": "#1E293B" },
  "color-bg": { "type": "color", "value": "#0F172A" },
  "color-bg-light": { "type": "color", "value": "#F8FAFC" },
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

1. Update `design-system/MASTER.md` + **`design-system/THEME.md`**（若涉及 L2 默认主色）
2. `set_variables` on all `.pen` files（`color-primary-ep`、`color-accent-devtools`）
3. 若改 EP 默认：同步 `src/styles/element/var.scss` 与 `DEFAULT_PRIMARY_COLOR`
4. 用 `ThemeControls` 在 light/dark + 多主色下 Re-screenshot verify

### Runtime theme change（用户切换，非设计稿）

- 不修改 Pencil 的 L1 devtools 绿；仅 L2 随 `useThemeColor` 变化
- 明暗切换：`useThemeMode` → `html.dark`；Pencil 对比时注明当前模式

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
