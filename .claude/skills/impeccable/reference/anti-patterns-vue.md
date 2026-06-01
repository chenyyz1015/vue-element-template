# 专项反模式（Vue 3 模板）

Impeccable 通用反模式之外，本项目 Phase 4 额外检查：

| # | 反模式 | 修复 |
|---|--------|------|
| 1 | 手动 import `src/components/` 公共组件 | 依赖 unplugin-vue-components |
| 2 | 手动 import vue / pinia / vue-router / composables / stores | auto-import |
| 3 | 手动 import ElMessage / ElMessageBox 等 | Element Plus 反馈 API auto-import |
| 4 | 模板中 import SvgIcon | `<SvgIcon name="..." />` |
| 5 | UI 文案硬编码 | `useI18n()` + `src/i18n/locales/` |
| 6 | 路由 title 硬编码 | `meta.titleKey` |
| 7 | 直接 localStorage / sessionStorage | `@/utils/auth`、`@/utils/locale` |
| 8 | 直接 import `@/utils/storage` | 业务封装 |
| 9 | `.then()` / `.catch()` 链 | `async/await` |
| 10 | 组件顺序非 script → template → style | 遵循 code-style |
| 11 | 页面/布局目录非 kebab-case + index.vue | 遵循目录规范 |
| 12 | 公共组件非 com-* / biz-* 前缀 | 遵循命名规范 |
| 13 | 新页面未使用 default-layout | 与 `/`、`/demo`、`/about` 一致 |
| 14 | UnoCSS 色值与 DESIGN.md / MASTER.md 漂移 | 对齐 token |
| 15 | 页面自建明暗/主色 storage 或重复换肤逻辑 | 使用 `useThemeMode` / `useThemeColor` |
| 16 | Element Plus 主色写死 hex | `var(--el-color-primary)` 或 EP 组件默认 |
| 17 | UI 交付未验 light+dark 或未读 `THEME.md` | Phase 4 双模式 + 主色抽检 |

审计报告中 Vue 专项项 Category 标注为 **Project Convention**。
