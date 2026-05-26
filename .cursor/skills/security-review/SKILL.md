---
name: security-review
description: 对代码变更进行安全审查，检查 XSS、CSRF、注入、敏感信息泄露等安全风险。在用户进行安全审查、代码审计、或涉及认证/授权/数据处理时使用。
---

# 安全审查

完整审查清单和输出格式见 `.claude/skills/security-review/SKILL.md`。

## 快速检查

1. 用户输入是否安全渲染（避免未消毒的 v-html）
2. Token / API Key 是否硬编码
3. 路由是否有权限守卫
4. 请求是否有 CSRF 防护
5. 依赖是否有已知漏洞

## 输出

按 🔴 高危 / 🟡 中危 / 🟢 低危 分类，每项包含文件位置、问题描述、修复建议。
