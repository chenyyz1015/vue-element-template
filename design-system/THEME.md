# Runtime Theme

> 项目展示名见 [`PROJECT.md`](./PROJECT.md)。`ui-ux-pro-max --persist -p` 使用其中的 **displayName**。

> **UI 设计工作流必读**：凡涉及 UI 变更（Phase 1–4），须与本文档及运行时主题 API 保持同步。  
> 视觉静态规范见 `DESIGN.md`；ui-ux-pro-max 产出见 `MASTER.md`（优先级更高）。

## 双层色彩模型

| 层级 | 名称 | 控制方式 | 典型用途 |
|------|------|----------|----------|
| **L1 品牌面** | Devtools 静态色 | UnoCSS 字面量 / `DESIGN.md` 色板 | 导航壳、落地页区块、绿色强调 `#22C55E` |
| **L2 组件主色** | Element Plus 主色阶 | `useThemeColor()` → CSS 变量 | `el-button type="primary"`、`el-link`、表单焦点等 |

- L1 **不**随主题色选择器变化（刻意保持 devtools 深色品牌识别）。
- L2 **随用户切换**持久化到 `THEME_PRIMARY_COLOR`，默认 `#2563eb`（与 `src/styles/element/var.scss` 一致）。
- 新 UI 若使用 Element Plus 交互组件，**优先依赖 L2**（`var(--el-color-primary)`），避免写死 `#409EFF` / `#2563eb`。
- 营销/装饰性绿色（`#22C55E`）仅在 Brief 明确要求时使用，并在 Brief 中标注为 **L1 品牌色**，与 L2 区分。

## 明暗模式

| 项 | 值 |
|----|-----|
| DOM | `html` 上的 `dark` class |
| API | `useThemeMode()`（`@vueuse/core` `useColorMode`） |
| 存储键 | `THEME_MODE`（`light` \| `dark`） |
| EP 暗色变量 | `src/styles/element/index.scss` 引入 `dark/css-vars.scss` |
| 启动恢复 | `main.ts` → `initThemeMode()` |

切换模式时会按当前模式重新生成主色阶（`@ant-design/colors` `theme: 'dark'`）。

## 运行时 API（Composable）

| Composable | 职责 | 持久化 |
|------------|------|--------|
| `useThemeColor()` | `primaryColor`、`presetColors`、`setPrimaryColor` | `THEME_PRIMARY_COLOR` |
| `useThemeMode()` | `mode`、`isDark`、`setMode`、`toggleMode` | `THEME_MODE` |

实现要点：

- 色阶生成：`src/utils/element-plus-theme.ts`（`generate` → `--el-color-primary`、`--el-color-primary-light-*`、`--el-color-primary-dark-2`）
- 缓存：`src/utils/theme-color.ts`、`src/utils/theme-mode.ts`（禁止业务直接 `import storage`）
- 导航 UI：`src/layouts/devtools-layout/components/ThemeControls.vue`（预设色板 + 取色器 + 明暗切换）

**禁止**在页面内重复实现换肤逻辑；统一调用上述 Composable。

## 各 Phase 同步要求

### Phase 1 — 战略规划

在 Brief / `MASTER.md` 中必须写明：

1. **默认验收模式**：`light` 或 `dark`（本项目 devtools 默认可视稿多为 **dark**）
2. **L1 品牌色**（若有）：如 `#22C55E` accent — 与 L2 EP 主色是否分离
3. **L2 默认主色**：未指定时用 `#2563eb`；若 Brief 指定品牌主色，写入 `design-system/pages/<page>.md` 并注明需调用 `setPrimaryColor` 验证
4. **双模式对比度**：浅色/深色下正文与背景均满足 WCAG AA

### Phase 2 — Pencil

`set_variables` 建议变量（见 `pencil-sync.md`）：

- `color-accent-devtools` → L1（如 `#22C55E`）
- `color-primary-ep` → L2 默认（如 `#2563eb`）
- `color-bg-dark` / `color-bg-light` → 对应模式页面背景参考

**交付物**：除默认帧外，建议各出 **light + dark** 截图或注明「仅 dark 壳 + EP 组件随模式变化」。

### Phase 3 — Vue 实现

- 布局页挂 `devtools-layout`（含 `ThemeControls`）
- Element Plus 组件不写死主色 hex；Scoped 样式可用 `var(--el-color-primary)`
- 监听明暗：若自定义样式依赖背景，用 `html.dark` 或 `useThemeMode().isDark`，**勿**自建 `localStorage` 键
- 改 `var.scss` 默认主色时，同步 `DEFAULT_PRIMARY_COLOR` 与 `DESIGN.md` / `THEME.md`

### Phase 4 — 质量审计

**Theming 维度必查**（见 `project-bridge.md`）：

1. 浏览器 **light + dark** 各截图一次（可用导航栏 `ThemeControls`）
2. 至少切换 **2 个预设主色** 验证 EP 按钮/链接跟随
3. 无新增 `localStorage` / 重复 Composable
4. Pencil 稿与浏览器在**同一模式 + 同一主色**下对比

## 与 DESIGN.md / MASTER.md 的关系

```
MASTER.md (ui-ux-pro-max --persist 或 design-system/MASTER.md 模板)
    ↓ 含 color-primary-ep、color-accent-devtools、theme-mode-*
DESIGN.md (静态 devtools 视觉)
    ↓ 补充运行时规则
THEME.md (本文件 — 运行时 L1/L2 + Composable)
    ↓ 映射
pencil-sync.md → Vue / Pencil 变量
```

**`MASTER.md` 必备 token**（由 `ui-ux-pro-max` persist 自动写入，或参考仓库内 `design-system/MASTER.md` 模板）：

| Pencil key | 默认（本项目） |
|------------|----------------|
| `color-primary-ep` | `#2563eb` |
| `color-accent-devtools` | `#22C55E` |
| `color-bg` | `#0F172A` |
| `color-bg-light` | `#F8FAFC` |
| `theme-mode-default` | `dark` |
| `theme-acceptance` | `light`, `dark` |

Regenerate（将 `<displayName>` 换为 `PROJECT.md` 中的 displayName）:  
`python3 .cursor/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "<displayName>" --page "<page>"`

Phase 4 读取顺序：`MASTER.md` > `pages/*.md` > `DESIGN.md` > **`THEME.md`** > brief

## 变更检查清单（UI 需求必过）

```
- [ ] Brief 已区分 L1 品牌色 vs L2 EP 主色
- [ ] Pencil variables 含 color-primary-ep（及必要的 light/dark 背景）
- [ ] Vue 未硬编码 EP 主色；暗色样式兼容 html.dark
- [ ] 已在 light/dark + 默认主色下目视验收
- [ ] 若改默认主色：var.scss、DEFAULT_PRIMARY_COLOR、THEME.md 一致
```
