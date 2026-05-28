# Vue Element Template — Design System

> Impeccable visual context. When `MASTER.md` exists (ui-ux-pro-max `--persist`), treat it as the source of truth and sync this file via `/impeccable document` or manual update.

## Theme

- **Mode**: Dark (devtools)
- **Register**: product
- **Scene**: Developer reviewing template docs and demo pages on a desktop monitor in a dim IDE-adjacent environment

## Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#0F172A` | Page bg |
| Surface | `#1E293B` | Cards, sections |
| Border | `#334155` | Dividers, card borders |
| Primary / CTA | `#22C55E` | Links, accents, primary actions |
| Primary hover | `#4ADE80` | Link/button hover |
| Text | `#F8FAFC` | Headings |
| Text muted | `#94A3B8` | Body, secondary |

Neutrals are slate-tinted (not pure gray/black). Avoid gray text on green tinted backgrounds; use green shades or opacity.

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
