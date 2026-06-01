# Pencil ↔ Vue Bidirectional Sync

## Token Mapping

SSOT：**`design-system/TOKENS.md`** · `design-system/tokens/page-semantic.json` · `src/styles/theme/page-semantic.scss`  
运行时规则：**`design-system/THEME.md`**

| Pencil variable (example) | Vue / CSS | 层级 | 随主题色 | 随明暗 |
|---------------------------|-----------|------|----------|--------|
| `color-bg-light` / `color-bg-dark` | `--dl-bg` | L1 语义 | 否 | **是** |
| `color-text-light` / `color-text-dark` | `--dl-text`、`--dl-text-muted` | L1 | 否 | **是** |
| `color-border-light` / `color-border-dark` | `--dl-border` | L1 | 否 | **是** |
| `color-accent-brand` | `--dl-accent` | L1 品牌 | 否 | 否（色值同） |
| `color-primary-ep` | `--el-color-primary` / `useThemeColor()` | L2 | **是** | **是**（色阶） |
| — | `--dl-primary` | L2→页面桥 | **是** | 随 L2 |
| `font-heading` / `font-body` | `--dl-font-heading`、`--dl-font-body` | 字体 | 否 | 否（字色随 L1） |

> 页面设计**必须**为每种语义背景/正文提供 light 与 dark 两列，再写入 JSON + SCSS。勿将 `color-primary-ep` 与 `color-accent-brand` 混用。

### set_variables example（成对 light/dark）

```json
{
  "color-accent-brand": { "type": "color", "value": "#FF8400" },
  "color-primary-ep": { "type": "color", "value": "#2563eb" },
  "color-bg-light": { "type": "color", "value": "#FFFFFF" },
  "color-bg-dark": { "type": "color", "value": "#141414" },
  "color-surface-light": { "type": "color", "value": "#FAFAFA" },
  "color-surface-dark": { "type": "color", "value": "#1A1A1A" },
  "color-text-light": { "type": "color", "value": "#141414" },
  "color-text-dark": { "type": "color", "value": "#FAFAFA" },
  "color-text-muted-light": { "type": "color", "value": "#666666" },
  "color-text-muted-dark": { "type": "color", "value": "#A3A3A3" },
  "color-border-light": { "type": "color", "value": "#E5E5E5" },
  "color-border-dark": { "type": "color", "value": "#2A2A2A" },
  "font-heading": { "type": "string", "value": "DM Sans" },
  "font-body": { "type": "string", "value": "Rubik" }
}
```

Call via Pencil MCP `set_variables` with `filePath: "design/pages/<name>.pen"`.

## Structure Mapping

| Pencil | Vue |
|--------|-----|
| Page frame (1440×…) | Page `index.vue` inside `default-layout` |
| Section frame | `<section id="…">` |
| Reusable component | `com-*` / page `components/*.vue` |
| Auto-layout vertical | `flex flex-col gap-*` |
| Auto-layout horizontal | `flex items-center gap-*` |
| Card frame | `var(--dl-border)` + `var(--dl-surface)` + `@include dl-surface-card` |

## Sync Workflows

### Design-first（默认）

1. Phase 1：定稿 **light + dark** 色板 → `page-semantic.json` + SCSS
2. Pencil `set_variables`（成对 key）→ `batch_design`
3. `batch_get` → Vue（`var(--dl-*)` / mixins）
4. 浏览器 light/dark + 多主色截图 ↔ Pencil

### Code-first（用户已改代码）

1. Read changed Vue files
2. 若改 hex：回写 `page-semantic.json` + `page-semantic.scss`
3. `batch_get` / `batch_design` 更新 `.pen`
4. 更新 `design-system/pages/<page>.md`

### Token change（全局换肤）

1. `TOKENS.md` + `page-semantic.json` + `page-semantic.scss`
2. `MASTER.md` / `pages/*.md` / 全部 `.pen` `set_variables`
3. L2 默认： `var.scss` + `DEFAULT_PRIMARY_COLOR`
4. `ThemeControls`：light/dark × ≥2 主色验收

### Runtime theme change（用户切换）

- **L1**：`useThemeMode` → `html.dark` → `--dl-*` 切换
- **L2**：`useThemeColor` → `--el-color-primary` + `--dl-primary`
- Pencil 对比时注明 **mode + primary**

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
