---
description: UI 技术质量审计（impeccable Phase 4）。五维评分、a11y、性能、响应式、反模式检测。
argument-hint: [page-or-component-path]
---

# UI 质量审计 (/audit)

对 $ARGUMENTS（未指定则当前 UI 变更）执行 **/impeccable audit**。

## 执行步骤

1. 读 `.claude/skills/impeccable/project-bridge.md`
2. 读 `.claude/skills/impeccable/SKILL.md` + `reference/audit.md`
3. 加载上下文：
   ```bash
   IMPECCABLE_CONTEXT_DIR=design-system node .claude/skills/impeccable/scripts/load-context.mjs
   ```
4. 读 `design-system/MASTER.md`（若有）+ 相关 brief
5. 扫描：`node .claude/skills/impeccable/scripts/detect.mjs <target>`
6. 加载 `reference/anti-patterns-vue.md`
7. 浏览器实检，按 audit.md 输出报告

## Gate

≥ 14/20，无 P0/P1 → 可交付。修复用 `/polish` 或 invoke design-inspector。
