# AI 前端设计规范

## 工具

| 工具          | 角色           | Phase           |
| ------------- | -------------- | --------------- |
| ui-ux-pro-max | 设计战略顾问   | 1 战略规划      |
| pencil        | 视觉协同与执行 | 2–3 视觉 + 代码 |
| impeccable    | 代码级设计监工 | 4 质量审计      |

## 工作流

1. **Phase 1**：`ui-ux-pro-max` → `design-system/` + `design/briefs/` + **`THEME.md` 对齐（L1/L2、light/dark）**
2. **Phase 2**：Pencil MCP → `design/pages/*.pen`（`color-primary-ep`、`color-accent-devtools`）
3. **Phase 3**：Vue + `useThemeColor` / `useThemeMode` + `pencil-sync.md` + `npm run build`
4. **Phase 4**：`/audit` → `/polish` → gate（含双模式 + 主色抽检）

主编排：`.claude/skills/ai-frontend-design-workflow/SKILL.md` · 运行时主题：`design-system/THEME.md`

## 触发规则

- 新建页面/组件/UI 改版 → 完整 Phase 1–4
- 用户明确只要代码 → Phase 1 → 3 → 4
- 仅审查/精修 → Phase 4（`.claude/skills/impeccable/SKILL.md`）
- 多页面任务 → invoke `design-director` Agent

## Phase 4 命令

- `/audit` 或 `/impeccable audit` — 技术质量审计（`.claude/commands/audit.md`）
- `/critique` 或 `/impeccable critique` — UX 评审（`.claude/commands/critique.md`）
- `/polish` 或 `/impeccable polish` — 交付前精修（`.claude/commands/polish.md`）
- 完整 23 命令见 `.claude/skills/impeccable/SKILL.md`

上下文加载：

```bash
IMPECCABLE_CONTEXT_DIR=design-system node .claude/skills/impeccable/scripts/load-context.mjs
```

桥接说明：`.claude/skills/impeccable/project-bridge.md` · Vue 专项反模式：`reference/anti-patterns-vue.md`

确定性扫描：

```bash
node .claude/skills/impeccable/scripts/detect.mjs <target-path>
```

## 项目标识

- **项目名**：`.env.*` → **`VITE_APP_NAME`**（说明见 `design-system/PROJECT.md`）
- **语义色板**：`design-system/TOKENS.md` + `tokens/page-semantic.json`（**light + dark 成对**，与 `page-semantic.scss` 同步）
- `design-system/PRODUCT.md` / `DESIGN.md` — Impeccable 上下文
- 勿在指令中写死固定项目名；回退：`package.json` → `name`

## 设计产物

| 路径 | 说明 | Git |
| ---- | ---- | --- |
| `design-system/MASTER.md` | ui-ux-pro-max 战略 Design System（优先级最高） | 是 |
| `design-system/THEME.md` | 运行时主题（EP 主色 + 明暗 + 各 Phase 同步） | 是 |
| `design-system/pages/*.md` | 页面级 override | 是 |
| `design/README.md` | `design/` 目录约定 SSOT | 是 |
| `design/briefs/` | 页面简报（本地临时） | 否 |
| `design/pages/*.pen` | Pencil 稿（仅 MCP 访问，本地临时） | 否 |
| `design/scripts/` | 创建 / 初始化 / 批量生成 `.pen` 的脚本（本地临时） | 否 |

`design/` 下除 `README.md` 外均为临时产物，**禁止提交**；需持久化的设计结论写入 `design-system/`。见 `design/README.md`。

## Pencil 生成脚本（AI 边界）

**新需求、新页面使用 Pencil 创建视觉稿时**，用于创建或初始化 `*.pen` 的脚本（shell、Python、Node 等）**必须**放在 `design/scripts/`，文件名 kebab-case。

- **允许**：`design/scripts/init-<page>-pen.mjs` 等与本项目 `.pen` 画布相关的脚本
- **禁止**：将上述脚本放在 `.cursor/skills/`、`.claude/skills/`、项目根 `scripts/`、`vite/`、`src/`
- **例外**：ui-ux-pro-max 的 `search.py` 仍在 Skill 目录，仅用于 Design System 检索，不用于创建 `.pen`
- **优先**：Pencil MCP（`batch_design` 等）；仅当需可重复、离线或批量初始化时再写 `design/scripts/`

目录说明：`design/README.md`

## 静态资源（`src/assets`）

页面、布局、公共/私有组件引用的**静态媒体文件**统一放在 `src/assets/`，按**媒体类型**分子目录；**禁止**在 `views/`、`components/` 下散落 `images/`、`static/` 等资源目录。

| 目录 | 类型 | 示例扩展名 | 说明 |
| ---- | ---- | ---------- | ---- |
| `src/assets/icons/` | 图标 | `.svg` | 仅用于 `<SvgIcon name="…" />`（`unplugin-svg-component`） |
| `src/assets/images/` | 位图 / 装饰图 | `.png` `.jpg` `.webp` `.gif` `.avif` | 插图、照片、OG 图等 |
| `src/assets/fonts/` | 字体 | `.woff2` `.woff` `.ttf` | 自托管字体（优先 woff2） |
| `src/assets/videos/` | 视频 | `.mp4` `.webm` | 背景或演示视频 |
| `src/assets/audio/` | 音频 | `.mp3` `.ogg` `.wav` | 可选 |

**组织建议**：在类型目录下按页面或功能再分子目录（kebab-case），例如 `src/assets/images/landing/hero.webp`、`src/assets/images/demo/preview.png`。

**Vue 引用**（经 Vite 处理）：

```vue
<script setup lang="ts">
import heroImg from "@/assets/images/landing/hero.webp";
</script>

<template>
  <img :src="heroImg" alt="" />
  <!-- 或模板内：src="@/assets/images/landing/hero.webp" -->
</template>
```

**Pencil MCP 导出**：`export_nodes` 等生成的页面所需位图/矢量（非 `icons/` 精灵）写入 `src/assets/images/<page>/`（或对应媒体子目录），文件名 kebab-case，与 Brief 区块名一致；导出后在 Vue 中用 `@/assets/...` 引用，勿使用外链占位（除非 Brief 明确要求 CDN）。

**禁止**：将 Pencil/AI 产出资源放在 `public/`（除非明确为 `favicon`、无需 hash 的固定 URL）；勿与 `src/assets/icons/` 混放非 SvgIcon 用途的 SVG（装饰性 SVG 放 `images/`）。

## AI 资源索引（Claude Code）

| 类型 | 路径 |
| ---- | ---- |
| 主编排 Skill | `.claude/skills/ai-frontend-design-workflow/SKILL.md` |
| 战略规划 | `.claude/skills/ui-ux-pro-max/SKILL.md` |
| Pencil 执行 | `.claude/skills/pencil-design-workflow/SKILL.md` · `pencil-sync.md` |
| 质量监工 | `.claude/skills/impeccable/SKILL.md` · `project-bridge.md` |
| Agents | `.claude/agents/design-director.md` · `design-inspector.md` |
| Commands | `.claude/commands/audit.md` · `polish.md` · `critique.md` |

## Gate

- Audit Health Score ≥ **14/20**
- 无未修复 **P0 / P1**
- `npm run build` + `npm run lint` 通过
- Pencil screenshot ↔ 浏览器一致（若有 `.pen`）

## 禁止

- 无 Brief 大规模写 UI
- Phase 3 未 build 通过就交付
- 跳过 Phase 4 gate（除非用户豁免）
- 直接 Read/Grep `.pen` 文件
- 将创建 `.pen` 的生成脚本放在 `design/scripts/` 以外
- 将 `design/` 临时产物（briefs、`.pen`、`scripts/` 等）提交 Git
