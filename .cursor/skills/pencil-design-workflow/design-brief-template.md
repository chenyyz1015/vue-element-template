# Design Brief: [Page / Component Name]

> Date: YYYY-MM-DD  
> Author: [Agent / User]  
> Status: Draft | Review | Approved  
> Pencil file: `design/pages/[name].pen`  
> Design system: `design-system/MASTER.md` (+ `pages/[name].md` if any)

## 1. Goal

- **Type**: page | component | layout section
- **User story**: As a … I want … so that …
- **Success criteria**: …

## 2. Design System Snapshot

| Token | Value | Usage |
|-------|-------|-------|
| Primary | `#______` | CTA secondary, links |
| Secondary | `#______` | Accents |
| CTA | `#______` | Primary buttons |
| Background | `#______` | Page bg |
| Text | `#______` | Headings |
| Text muted | `#______` | Body |
| Font heading | ______ | H1–H3 |
| Font body | ______ | Paragraphs |

**Style**: [from ui-ux-pro-max, e.g. Minimalism & Swiss]  
**Anti-patterns to avoid**: …

## 3. Information Architecture

| Order | Section ID | Purpose | Primary CTA |
|-------|------------|---------|-------------|
| 1 | hero | … | … |
| 2 | … | … | … |

## 4. Component Inventory

| Component | Type | Reusable in Pencil | Vue target path |
|-----------|------|--------------------|-----------------|
| Nav bar | global | yes | `layouts/devtools-layout/` |
| … | … | … | … |

## 5. Responsive Breakpoints

| Breakpoint | Width | Layout notes |
|------------|-------|--------------|
| Mobile | 375 | … |
| Tablet | 768 | … |
| Desktop | 1440 | … |

## 6. Interaction & Accessibility

- Focus states: …
- Touch targets: min 44×44px
- `prefers-reduced-motion`: …
- i18n keys prefix: `pageName.*`

## 7. Open Questions

- [ ] …

## 8. Sign-off

- [ ] Phase 1 brief approved（ui-ux-pro-max）
- [ ] Phase 2 Pencil screenshot reviewed
- [ ] Phase 3 code matches Pencil + `npm run build`
- [ ] Phase 4 impeccable audit ≥ 14/20，无 P0/P1
- [ ] Phase 4 polish 完成，audit 复验通过
