# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** vue-element-template
**Generated:** 2026-06-01 09:22:30
**Category:** Developer Tool / IDE

---

## Global Rules

### Color Palette

> **SSOT：** [`TOKENS.md`](./TOKENS.md) · `tokens/page-semantic.json`。下表为摘要。

| Role | Hex | CSS Variable / Pencil key |
|------|-----|---------------------------|
| EP Primary (L2) | `#2563eb` | `color-primary-ep` → `--el-color-primary` / `--dl-primary` |
| Brand Accent (L1) | `#FF8400` | `color-accent-brand` → `--dl-accent` |
| Page bg | `#FFFFFF` / `#141414` | `color-bg-light` / `color-bg-dark` → `--dl-bg` |
| Text | `#141414` / `#FAFAFA` | `color-text-light` / `color-text-dark` → `--dl-text` |

**Color Notes:** 页面语义色须 light+dark 成对；详见 `TOKENS.md`。

### Runtime Theme Tokens (Pencil & Vue)

> **本项目模板：** 语义色板 SSOT 见 `design-system/TOKENS.md` 与 `tokens/page-semantic.json`。 L1 **light+dark 成对**；L2 由 `useThemeColor()` 切换；`--dl-primary` 桥接内容主色。详见 `THEME.md`。

| Token key | Layer | Light | Dark | Maps to |
|-----------|-------|-------|------|---------|
| `color-bg-*` | L1 | `#FFFFFF` | `#141414` | `--dl-bg` |
| `color-surface-*` | L1 | `#FAFAFA` | `#1A1A1A` | `--dl-surface` |
| `color-text-*` | L1 | `#141414` | `#FAFAFA` | `--dl-text` |
| `color-accent-brand` | L1 | `#FF8400` | `#FF8400` | `--dl-accent` |
| `color-primary-ep` | L2 | `#2563eb` | `#2563eb` | `--el-color-primary` / `--dl-primary` |
| `theme-mode-default` | — | `light` | — | 默认验收模式 |
| `theme-acceptance` | — | `light, dark` | — | 必测模式 |

**Pencil `set_variables`（须含 light/dark 成对 key，节选）：**

```json
{
  "color-accent-brand": { "type": "color", "value": "#FF8400" },
  "color-primary-ep": { "type": "color", "value": "#2563eb" },
  "color-bg-light": { "type": "color", "value": "#FFFFFF" },
  "color-bg-dark": { "type": "color", "value": "#141414" },
  "color-text-light": { "type": "color", "value": "#141414" },
  "color-text-dark": { "type": "color", "value": "#FAFAFA" },
  "font-heading": { "type": "string", "value": "DM Sans" },
  "font-body": { "type": "string", "value": "Rubik" }
}
```

**Do not** 将 `color-primary-ep` 与 `color-accent-brand` 混为同一 token。

### Typography

- **Heading Font:** JetBrains Mono
- **Body Font:** IBM Plex Sans
- **Mood:** code, developer, technical, precise, functional, hacker
- **Google Fonts:** [JetBrains Mono + IBM Plex Sans](https://fonts.google.com/share?selection.family=IBM+Plex+Sans:wght@300;400;500;600;700|JetBrains+Mono:wght@400;500;600;700)

**CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
```

### Spacing Variables

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #22C55E;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #1E293B;
  border: 2px solid #1E293B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #0F172A;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #1E293B;
  outline: none;
  box-shadow: 0 0 0 3px #1E293B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Vibrant & Block-based

**Keywords:** Bold, energetic, playful, block layout, geometric shapes, high color contrast, duotone, modern, energetic

**Best For:** Startups, creative agencies, gaming, social media, youth-focused, entertainment, consumer

**Key Effects:** Large sections (48px+ gaps), animated patterns, bold hover (color shift), scroll-snap, large type (32px+), 200-300ms

### Page Pattern

**Pattern Name:** Enterprise Gateway

- **Conversion Strategy:**  logo carousel,  tab switching for industries, Path selection (I am a...). Mega menu navigation. Trust signals prominent.
- **CTA Placement:** Contact Sales (Primary) + Login (Secondary)
- **Section Order:** 1. Hero (Video/Mission), 2. Solutions by Industry, 3. Solutions by Role, 4. Client Logos, 5. Contact Sales

---

## Anti-Patterns (Do NOT Use)

- ❌ Flat design without depth
- ❌ Text-heavy pages

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile
- [ ] Pencil variables include `color-primary-ep` and `color-accent-devtools`
- [ ] UI verified in **light + dark** with ThemeControls (≥2 EP primary presets)
- [ ] `design-system/THEME.md` rules followed (no duplicate theme storage)
