# 项目标识（二次定制时更新）

> AI 工作流、ui-ux-pro-max `--persist`、设计文档中的「**项目名**」**以环境变量 `VITE_APP_NAME` 为准**（见 `.env.development` / `.env.stage` / `.env.production`）。  
> 应用**展示标题**使用 `VITE_APP_TITLE`；克隆模板后请同步 `package.json` `name`（与 `VITE_APP_NAME` 一致）与 i18n `app.title`。

| 字段 | 来源 / 值 | 用途 |
|------|-----------|------|
| **appName** | `.env.*` → `VITE_APP_NAME`（如 `vue-element-template`） | 项目名；`search.py -p`；宜与 `package.json` `name` 一致 |
| **pageSemanticTokens** | [`TOKENS.md`](./TOKENS.md) · `tokens/page-semantic.json` | 页面语义色板（**light + dark**），与 `src/styles/theme/page-semantic.scss` 同步 |
| **storageKeyPrefix** | `VUE_ELEMENT_TEMPLATE_`（本表维护） | 浏览器缓存物理前缀（见 `src/utils/storage.ts`） |
| **githubUrl** | `.env.*` → `VITE_GITHUB_URL` | 导航/页脚/关于等外链；组件内 `import.meta.env.VITE_GITHUB_URL` |

## 定制检查清单

```
- [ ] .env.* 中 VITE_APP_NAME、VITE_APP_TITLE、VITE_GITHUB_URL
- [ ] package.json name（与 VITE_APP_NAME 一致）
- [ ] src/i18n/locales/*.json → app.title（与 VITE_APP_TITLE 一致）
- [ ] 若改存储前缀：更新上表 storageKeyPrefix 并改 storage.ts
- [ ] design-system/PRODUCT.md、DESIGN.md 标题（可选，与品牌一致）
- [ ] 重新运行 ui-ux-pro-max --persist -p "<VITE_APP_NAME>" 刷新 MASTER.md（可选）
```

## AI 命令示例

将 `<appName>` 替换为当前 `.env.*` 中的 **`VITE_APP_NAME`**：

```bash
# Cursor: .cursor/skills/ · Claude Code: .claude/skills/
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" \
  --design-system --persist -p "<appName>" --page "<page-name>"
```

未配置环境变量时，Agent 可回退读取：`package.json` → `name`。
