---
description: UI 交付前精修（impeccable Phase 4）。对齐 Design System，修复 audit 遗留项。
argument-hint: [page-or-component-path]
---

# UI 精修 (/polish)

对 $ARGUMENTS（未指定则当前 UI 变更）执行 **/impeccable polish**。

## 执行步骤

1. 读 `.cursor/skills/impeccable/project-bridge.md`
2. 读 `.cursor/skills/impeccable/SKILL.md` + `reference/polish.md`
3. 加载上下文（同 audit）
4. 对齐 `design-system/MASTER.md` 或 `DESIGN.md`
5. 加载 `reference/anti-patterns-vue.md`
6. 精修后 `npm run build` + `npm run lint`
7. 复验 audit gate ≥ 14/20
