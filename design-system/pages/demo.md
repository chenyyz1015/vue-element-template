# Demo Page Overrides

> **PROJECT:** 见 `design-system/PROJECT.md` → displayName
> **Generated:** 2026-05-29 10:16:04
> **Page Type:** Dashboard / Data View

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px (standard)
- **Layout:** Full-width sections, centered content
- **Sections:** 1. Hero, 2. Product video/mockup (center), 3. Feature breakdown per section, 4. Comparison (optional), 5. CTA

### Spacing Overrides

- No overrides — use Master spacing

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Video surround: Brand color overlay. Features: Icon color #0080FF. Text: Dark #222

### Runtime Theme Overrides

| Pencil key | Override | Notes |
|------------|----------|-------|
| `color-primary-ep` | `#2563eb` | L2 — Element Plus primary |
| `color-accent-devtools` | `#22C55E` | L1 — static devtools accent |
| `theme-mode-default` | `dark` | Screenshot / QA default |

> Compare browser screenshots in **both** `theme-acceptance` modes from MASTER.

### Component Overrides

- No overrides — use Master component specs

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: Product animation playback, step progression animations, hover reveal effects, smooth zoom on interaction
- CTA Placement: Video center + CTA right/bottom
