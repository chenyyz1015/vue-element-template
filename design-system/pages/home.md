# Home Page Overrides

> **PROJECT:** `.env.*` → `VITE_APP_NAME`（见 `design-system/PROJECT.md`）  
> **Reference:** [pencil.dev](https://www.pencil.dev/)  
> **Brief:** `design/briefs/2026-05-29-pencil-redesign.md`

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 1200px
- **Layout:** Hero 双栏（文案 + 代码预览）→ Features 三列网格
- **Sections:** hero → features → compare → integrations → docs-cta

### Color Overrides（pencil.dev L1 — 须含 light + dark）

> 与 `design-system/tokens/page-semantic.json` 同步；运行时映射见 `TOKENS.md`。

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `color-accent-brand` | `#FF8400` | `#FF8400` | eyebrow、badge、高亮 band |
| `color-bg-light` / `color-bg-dark` | `#FFFFFF` | `#141414` | 页面背景 → `--dl-bg` |
| `color-surface-light` / `color-surface-dark` | `#FAFAFA` | `#1A1A1A` | 交替区块 → `--dl-surface` |
| `color-text-light` / `color-text-dark` | `#141414` | `#FAFAFA` | 标题 → `--dl-text` |
| `color-text-muted-light` / `color-text-muted-dark` | `#666666` | `#A3A3A3` | 正文 → `--dl-text-muted` |
| `color-cta-light` / `color-cta-dark` | `#141414` | `#FAFAFA` | 主按钮 → `--dl-cta` |
| `color-border-light` / `color-border-dark` | `#E5E5E5` | `#2A2A2A` | 卡片/导航 → `--dl-border` |

### Typography Overrides

| Role | Font |
|------|------|
| Heading | DM Sans（Hero 72px desktop） |
| Body | Rubik |

### Runtime Theme Overrides

| Pencil key | Override | Notes |
|------------|----------|-------|
| `color-primary-ep` | `#2563eb` | L2 — Element Plus primary |
| `color-accent-brand` | `#FF8400` | L1 — pencil 橙（与 TOKENS 一致） |
| `theme-mode-default` | `light` | 用户确认默认 light |

### Component Overrides

- 主 CTA：黑底白字胶囊按钮
- 次 CTA：白底描边胶囊
- 导航：半透明 `#FAFAFA` + blur，圆角容器
- GitHub 链接：`.env.*` → `VITE_GITHUB_URL`

---

## Visual Preview

- **Pencil 稿（审核交付物）**：`design/pages/home.pen`
  - `Home Light 1440` — 桌面布局 + Hero + Features
  - `Home Light 375` — 移动版
- Brief：`design/briefs/2026-05-29-pencil-redesign.md`
