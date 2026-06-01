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

| 路径 | 说明 |
| ---- | ---- |
| `design-system/MASTER.md` | ui-ux-pro-max 战略 Design System（优先级最高） |
| `design-system/THEME.md` | 运行时主题（EP 主色 + 明暗 + 各 Phase 同步） |
| `design-system/pages/*.md` | 页面级 override |
| `design/briefs/` | 页面简报 |
| `design/pages/*.pen` | Pencil 稿（仅 MCP 访问） |

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
