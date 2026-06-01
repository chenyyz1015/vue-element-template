# Runtime Theme

> 项目名见 [`PROJECT.md`](./PROJECT.md)（**`VITE_APP_NAME`**）。  
> **语义色板 SSOT**：[`TOKENS.md`](./TOKENS.md) · `design-system/tokens/page-semantic.json` · `src/styles/theme/page-semantic.scss`

> **UI 设计工作流必读**：凡涉及 UI 变更（Phase 1–4），须与本文档、TOKENS 及运行时 API 保持同步。  
> 视觉静态规范见 `DESIGN.md`；ui-ux-pro-max 产出见 `MASTER.md`（战略规则；色值以 TOKENS 为准）。

## 三层色彩模型

| 层级 | 名称 | 控制方式 | 随主题色切换 | 随明暗切换 |
|------|------|----------|--------------|------------|
| **L1** | 页面语义面 | `--dl-*`（全局 `semantic-vars.scss`） | 否（品牌 `--dl-accent` 固定） | **是**（背景/字色/边框等） |
| **L2** | Element Plus 主色 | `useThemeColor()` → `--el-color-primary*` | **是** | **是**（色阶 `theme: 'dark'` 重算） |
| **桥** | 页面内容主色 | `--dl-primary` = `var(--el-color-primary)` | **是** | 随 L2 |

- **页面设计色板**必须在项目中成对定义 **light + dark**（见 `TOKENS.md`），并同步 JSON、SCSS、Pencil、必要时 `pages/<page>.md`。
- **改主题色**：导航 `ThemeControls` → 全局 EP 组件 + 使用 `var(--dl-primary)` 的自定义内容区同步变化。
- **改明暗模式**：`html` / `html.dark` 切换 `--dl-*`；正文字体栈不变，**字色与背景**随 L1 切换；L2 主色阶按模式重新生成。

## 明暗模式

| 项 | 值 |
|----|-----|
| DOM | `html` 上的 `dark` class |
| API | `useThemeMode()`（`@vueuse/core` `useColorMode`） |
| 存储键 | `THEME_MODE`（`light` \| `dark`） |
| L1 变量 | `src/styles/theme/semantic-vars.scss`（经 `src/styles/index.scss` 全局引入） |
| EP 暗色变量 | `src/styles/element/index.scss` 引入 `dark/css-vars.scss` |
| 启动恢复 | `main.ts` → `initThemeMode()`、`initThemePrimaryColor()` |

## 运行时 API（Composable）

| Composable | 职责 | 持久化 |
|------------|------|--------|
| `useThemeColor()` | `primaryColor`、`presetColors`、`setPrimaryColor` | `THEME_PRIMARY_COLOR` |
| `useThemeMode()` | `mode`、`isDark`、`setMode`、`toggleMode` | `THEME_MODE` |

实现要点：

- 色阶生成：`src/utils/element-plus-theme.ts` → `--el-color-primary*`
- 语义色注入：`page-semantic.scss` + `semantic-vars.scss` → `--dl-*`、`--dl-font-*`
- 内容主色桥：`--dl-primary`（随 `--el-color-primary` 变化，无需单独存储）
- 缓存：`src/utils/theme-color.ts`、`src/utils/theme-mode.ts`
- 导航 UI：`ThemeControls.vue`

**禁止**在页面内重复实现换肤逻辑；统一调用上述 Composable + `var(--dl-*)`。

## 各 Phase 同步要求

### Phase 1 — 战略规划

Brief / `MASTER.md` 须写明：

1. **默认验收模式**：`light` 或 `dark`（见 `page-semantic.json` → `theme.modeDefault`）
2. **L1 双列色板**：每种背景/正文/边框须有 light 与 dark hex（`TOKENS.md` 表）
3. **L2 默认主色**：`#2563eb` 或 Brief 指定值
4. **L1 品牌 accent** 与 L2 分离（如 pencil 橙 `#FF8400`）
5. **双模式对比度**：WCAG AA

### Phase 2 — Pencil

`set_variables` **必须成对**（示例见 `TOKENS.md`）：

- `color-bg-light` / `color-bg-dark`
- `color-text-light` / `color-text-dark`
- `color-primary-ep`、`color-accent-brand`
- `font-heading`、`font-body`

交付：默认帧 + **建议** light/dark 各一帧或注明验收模式组合。

### Phase 3 — Vue

- 路由使用 `default-layout`（壳层；`--dl-*` 已在全局注入）
- 自定义样式：`var(--dl-text)`、`@include dl-heading-lg`；跟用户主色用 `var(--dl-primary)`
- EP 不写死主色 hex；暗色兼容 `html.dark`
- 新页面色板：先改 `page-semantic.json` + `page-semantic.scss`，再写组件

### Phase 4 — 质量审计

1. **light + dark** 各截图（`ThemeControls`）
2. 切换 **≥2** 种 EP 主色，确认按钮与 `var(--dl-primary)` 区块跟随
3. 无重复 storage / Composable
4. Pencil 与浏览器 **同一模式 + 同一主色** 对比

## 文档与代码映射

```
TOKENS.md + tokens/page-semantic.json
    ↓
src/styles/theme/page-semantic.scss
    ↓
semantic-vars.scss → --dl-* / --dl-font-* / --dl-primary
    ↓
views/** 使用 var(--dl-*) 与 mixins
    ↓
useThemeColor / useThemeMode → L2 + html.dark
```

Phase 4 读取顺序：`MASTER.md` > `pages/*.md` > **`TOKENS.md`** > `DESIGN.md` > **`THEME.md`** > brief

## 变更检查清单

```
- [ ] page-semantic.json 与 page-semantic.scss light/dark 一致
- [ ] Pencil 含成对 light/dark 语义色
- [ ] Vue 未硬编码 EP 主色；自定义跟色用 --dl-primary
- [ ] light/dark + ≥2 主色已目视验收
- [ ] 改 L2 默认：var.scss、DEFAULT_PRIMARY_COLOR、TOKENS ep.primaryDefault
```
