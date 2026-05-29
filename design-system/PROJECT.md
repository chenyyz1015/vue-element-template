# 项目标识（二次定制时更新）

> AI 工作流、ui-ux-pro-max `--persist`、设计文档中的「项目名」**以此文件为准**。  
> 克隆模板后请同步修改 `package.json`、`VITE_APP_TITLE` 与 i18n `app.title`。

| 字段 | 值 | 用途 |
|------|-----|------|
| **displayName** | Vue Element Template | 展示名；`search.py -p "<displayName>"`；`MASTER.md` 标题 |
| **packageName** | vue-element-template | `package.json` 的 `name`（kebab-case） |
| **storageKeyPrefix** | VUE_ELEMENT_TEMPLATE_ | 浏览器缓存物理前缀（见 `src/utils/storage.ts`） |

## 定制检查清单

```
- [ ] 更新本表 displayName / packageName（若改存储前缀则改 storageKeyPrefix 并改 storage.ts）
- [ ] package.json name
- [ ] .env.* 中 VITE_APP_TITLE
- [ ] src/i18n/locales/*.json → app.title
- [ ] design-system/PRODUCT.md、DESIGN.md 标题（可选，与品牌一致）
- [ ] 重新运行 ui-ux-pro-max --persist -p "<displayName>" 刷新 MASTER.md（可选）
```

## AI 命令示例

将 `<displayName>` 替换为上表 **displayName**：

```bash
# Cursor: .cursor/skills/ · Claude Code: .claude/skills/
python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" \
  --design-system --persist -p "<displayName>" --page "<page-name>"
```

未维护本文件时，Agent 可回退读取：`package.json` → `name`，或 `.env.development` → `VITE_APP_TITLE`。
