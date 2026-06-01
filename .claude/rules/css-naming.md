# CSS 类名命名规范

> 与 UnoCSS、Element Plus 并存。详文权威来源为本文件；Cursor 摘要见 `.cursor/rules/css-naming.mdc`。

## 总原则

1. **模板可读性优先**：HTML 使用语义化 **BEM** 类名，避免长串原子类堆叠。
2. **样式集中维护**：布局/肤色/状态的原子规则在 `<style lang="scss" scoped>` 内通过 **`@apply`** 注入到 BEM 选择器。
3. **分层补充**：用 **SMACSS** 划分结构层级，用 **OOCSS** 分离结构（Structure）与外观（Skin）。
4. **UnoCSS 边界**：全局 `virtual:uno.css` 与 `shortcuts` 保留；页面/组件模板中**禁止**直接写长串 utility class（除 `shortcuts` 如 `flex-center` 等极短辅助类，且须在规范中登记）。

## BEM 约定

| 部分 | 格式 | 示例 |
| ---- | ---- | ---- |
| Block | `kebab-case`，语义化，对应组件/区块 | `hero`、`compare-table` |
| Element | `block__element` | `hero__title`、`compare-table__cell` |
| Modifier | `block--modifier` 或 `block__element--modifier` | `hero__cta--primary`、`compare-table__col--highlighted` |

规则：

- Block 名与 Vue 组件/业务区块一致，**不加** `com-` / `biz-` 前缀（那是目录规范）。
- 单文件组件内仅一个主 Block 时，根节点使用 Block 类（如 `<section class="hero">`）。
- 避免过深嵌套选择器；优先扁平 BEM 类，不用 `.hero .hero__title` 以外的后代链。
- 状态类：优先 BEM 修饰符 `--active`、`--highlighted`；与 Vue 绑定时用 `:class` 切换修饰符。

## SMACSS 补充（布局层）

跨区块复用的**纯结构**类使用 `l-` 前缀（Layout），不写颜色与皮肤：

| 类名 | 职责 |
| ---- | ---- |
| `l-container` | 水平居中 + `max-w-*` 内容宽 |
| `l-section` | 区块纵向间距（`py` / `px` 断点） |
| `l-grid` | 通用网格列（按页面在 scoped 中 `@apply` 定义列数变体） |

页面私有布局变体：`l-grid--features`、`l-grid--integrations`（`l-` + 语义修饰）。

## OOCSS 补充（外观层）

- **Structure**：BEM Block/Element 负责 DOM 结构与尺寸关系。
- **Skin**：颜色、边框、阴影、字体族写在 scoped 样式中，或页面级 `_tokens.scss` 变量（如 `$dl-color-accent`），便于换肤。
- **State**：交互态（`hover`、`focus`）写在元素/修饰符的 `@apply` 或 SCSS 嵌套中，不单独堆叠原子类到模板。

共享 token 文件（可选）：`src/views/<page>/styles/_tokens.scss`，仅 SCSS 变量/mixin，**不**生成全局类。

## Atomic CSS + `@apply`

在 scoped 样式块中把 UnoCSS 工具类收敛到 BEM：

```scss
@use "../styles/mixins" as *;

.hero {
  &__title {
    @apply mb-4 text-4xl text-[#F8FAFC] font-bold leading-tight lg:text-5xl;
    font-family: "Space Grotesk", sans-serif;
  }
}
```

约定：

- **模板**：只出现 BEM + 少量已登记的 `l-*` / `shortcuts`。
- **`@apply`**：仅用于复用 Uno 工具组合；单条声明过长时拆为多个元素类，避免「万能类」。
- **动态修饰符**：`:class` 绑定 BEM 修饰符名（字符串或数组），禁止在模板拼接 utility 字符串。
- **第三方组件**：`el-button` 等将 BEM 类直接挂在组件根上；需要穿透时用 `:deep()`，选择器仍以 BEM 为根。
- **`!important`**：勿在 `_mixins.scss` 等独立 SCSS 中用 `@apply !utility`（Sass 会误解析 `!`）；覆盖 Element Plus 时在 mixin 内写普通 CSS 声明。
- **语法高亮**等跨子树样式：保留在布局 `default-layout` 的 `:deep(.syn-*)` 中。

## 与现有约定关系

| 场景 | 做法 |
| ---- | ---- |
| 全局 Element 主题 | `src/styles/element/` |
| Devtools 品牌色板 | `design-system/DESIGN.md` + 页面 `_tokens.scss` |
| 标题字体 DM Sans | 页面内 `@include dl-heading-*`，或布局 `:deep(.landing-heading)` |
| `flex-center` 等 | Uno `shortcuts`，模板中可单独使用 |

## 目录建议

```
src/views/<page>/
├── index.vue
├── components/
│   └── HeroSection.vue
└── styles/
    ├── _tokens.scss    # OOCSS 色板变量（可选）
    └── _mixins.scss    # @mixin + @apply 组合
```

## 编辑器

`@apply` 由 UnoCSS 在构建期处理，非标准 CSS。若 IDE 提示 `Unknown at rule @apply`：

- 使用工作区 `.vscode/settings.json`（已配置 `scss.lint.unknownAtRules: ignore` 与 `css.customData`）
- 推荐安装扩展 **UnoCSS**（`antfu.unocss`，见 `.vscode/extensions.json`）
- 重载窗口后生效

## 禁止

- 在模板中为同一元素堆叠超过 **2 个** 非 BEM、非 `l-*`、非 shortcuts 的 utility 类。
- 在业务组件模板中硬编码 `#22C55E` 等（应走 token 或 BEM skin）。
- 无 Block 的孤立修饰符类（如单独 `text-green-500`）。
