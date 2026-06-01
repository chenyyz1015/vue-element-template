# Impeccable Project Bridge

> 项目名见 `design-system/PROJECT.md`（取值 **`.env.*` → `VITE_APP_NAME`**）。

本文件是**项目专用桥接层**，上游 Impeccable 更新时保留此文件即可。

## 上下文加载（替代默认 PRODUCT.md / DESIGN.md 路径）

Impeccable 上下文位于 `design-system/`，**不要**在根目录另建 PRODUCT.md / DESIGN.md。

每次 impeccable 命令开始前执行：

```bash
IMPECCABLE_CONTEXT_DIR=design-system node .claude/skills/impeccable/scripts/load-context.mjs
```

映射关系：

| Impeccable | 本项目 |
|------------|--------|
| PRODUCT.md | `design-system/PRODUCT.md` |
| DESIGN.md | `design-system/DESIGN.md` |
| 扩展 Design System | `design-system/MASTER.md`（ui-ux-pro-max 生成，优先级更高） |
| 页面 override | `design-system/pages/<page>.md` |
| 页面简报 | `design/briefs/*.md` |

**读取顺序**：`.env.*` / `PROJECT.md`（**`VITE_APP_NAME`**）> `MASTER.md` > `pages/*.md` > `DESIGN.md` > **`THEME.md`** > brief

## Phase 4（质量审计）

完整流程见 `.claude/skills/ai-frontend-design-workflow/SKILL.md`。

| Gate | 标准 |
|------|------|
| Audit Health Score | ≥ **14/20** |
| 阻塞项 | 无未修复 **P0 / P1** |
| 构建 | `npm run build` + `npm run lint` 通过 |
| 视觉 | Pencil screenshot ↔ 浏览器一致（若有 `.pen`） |
| 运行时主题 | light + dark 各验收；`ThemeControls` 切换 ≥2 种 EP 主色；见 `THEME.md` |

## 运行时主题（Theming 维度）

UI 相关 audit / polish **必须**加载 `design-system/THEME.md` 与 **`design-system/TOKENS.md`**：

1. `useThemeColor` / `useThemeMode` 为唯一换肤入口，禁止页面自建 storage
2. 页面语义色：`var(--dl-*)`，定义于 `tokens/page-semantic.json` + `page-semantic.scss`，**light/dark 成对**
3. Element Plus：`var(--el-color-primary)`；自定义跟色：`var(--dl-primary)`
4. Pencil 仅给单色背景/正文、无 dark 列 → **P2**；L1 accent 与 L2 主色混用 → **P2**
5. 对比 Pencil 时注明 **同一** `THEME_MODE` + 主色

## 确定性扫描

优先使用项目内脚本（无需 npx）：

```bash
node .claude/skills/impeccable/scripts/detect.mjs src/views/<target>/
```

等价：`npx impeccable detect src/views/<target>/`

## Vue 项目专项检查

审计 / 精修时额外加载：[reference/anti-patterns-vue.md](reference/anti-patterns-vue.md)

## 命令快捷方式

已 pin 的命令：`/audit`、`/polish`、`/critique` → 等价 `/impeccable audit` 等。

斜杠命令：`.claude/commands/`（Claude Code）· `.cursor/commands/`（Cursor，内容同步）

## Agent 分工

| Agent | 职责 |
|-------|------|
| `design-director` | Phase 1–4 规划分派 |
| `design-inspector` | Phase 4 执行 impeccable |

## 与 ui-ux-pro-max 协同

Phase 1 生成 `design-system/MASTER.md` 后：

1. 运行 `/impeccable document` 或手动同步 `DESIGN.md`
2. Phase 4 audit 以 `MASTER.md` 为 token 裁决依据

## 禁止

- 覆盖 `.claude/skills/` 下其他 Skill（ui-ux-pro-max、pencil-design-workflow 等）
- 直接 Read/Grep `.pen` 文件
- 跳过 Phase 4 gate（除非用户明确豁免）
