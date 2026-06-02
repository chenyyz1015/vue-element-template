# design/ — 设计工作区

本目录用于 **页面/组件级设计临时产物**（简报、Pencil 稿、生成脚本等）。工作流与路径约定见下文；**可交付的 Design System 与页面规范** 在 `design-system/`（纳入版本库）。

## 版本库策略


| 路径                                   | Git                  |
| ------------------------------------ | -------------------- |
| `design/README.md`                   | **纳入版本库**（目录约定 SSOT） |
| `design/briefs/`                     | 不纳入（本地临时）            |
| `design/pages/`、`design/components/` | 不纳入（`.pen` 临时稿）      |
| `design/scripts/`                    | 不纳入（生成脚本临时）          |


`.gitignore` 规则：`design/`* + `!design/README.md`。AI 与开发者**勿提交** `design/` 下除 README 以外的文件；需要共享的设计结论应写入 `design-system/` 或 `src/`。

## 目录结构

```
design/
├── README.md           # 本说明（唯一入库文件）
├── briefs/             # 设计简报（YYYY-MM-DD-<slug>.md）
├── pages/              # 页面级 *.pen
├── components/         # 组件级 *.pen（可选）
└── scripts/            # 创建 / 初始化 / 批量生成 .pen 的脚本
```

## AI 生成边界（Pencil）

**新需求开发、设计新页面并使用 Pencil 出视觉稿时：**


| 类型                  | 路径                                                       | 说明                                                                   |
| ------------------- | -------------------------------------------------------- | -------------------------------------------------------------------- |
| 视觉稿 `.pen`          | `design/pages/<page>.pen`、`design/components/<name>.pen` | 仅通过 Pencil MCP 读写，禁止 Read/Grep 源文件                                   |
| **创建 `.pen` 的生成脚本** | `**design/scripts/`**                                    | shell / Python / Node 等；文件名 kebab-case                               |
| 设计简报                | `design/briefs/`                                         | 模板见 `.cursor/skills/pencil-design-workflow/design-brief-template.md` |


**生成脚本禁止放置于：** `.cursor/skills/`、`.claude/skills/`、项目根 `scripts/`、`vite/`、`src/`。

**例外：** ui-ux-pro-max 自带的 `search.py` 仍在 Skill 目录，用于 Design System 检索，**不属于**创建 `.pen` 的脚本。

**优先顺序：** 能用 Pencil MCP（`batch_design`、`set_variables` 等）则直接用 MCP；仅当需要可重复、离线或批量初始化画布时，再在 `design/scripts/` 编写脚本。

详文：`.claude/rules/ai-frontend-design.md` · Phase 2：`.cursor/skills/pencil-design-workflow/SKILL.md`

