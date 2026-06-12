# CSS 类名命名规范

> 与 UnoCSS、Element Plus 并存。

## 总原则

1. **模板可读性优先**：HTML 使用语义化 **BEM** 类名，避免长串原子类堆叠。
2. **样式集中维护**：布局/肤色/状态的原子规则在 `<style lang="scss" scoped>` 内通过 `**@apply**` 注入到 BEM 选择器。
3. **分层补充**：用 **SMACSS** 划分结构层级，用 **OOCSS** 分离结构（Structure）与外观（Skin）。
4. **UnoCSS 边界**：全局 `virtual:uno.css` 与 `shortcuts` 保留；页面/组件模板中**禁止**直接写长串 utility class。

## BEM 约定

| 部分 | 格式 | 示例 |
|------|------|------|
| Block | `kebab-case`，语义化，对应组件/区块 | `hero`、`compare-table` |
| Element | `block__element` | `hero__title`、`compare-table__cell` |
| Modifier | `block--modifier` 或 `block__element--modifier` | `hero__cta--primary` |

规则：

- Block 名与 Vue 组件/业务区块一致，**不加** `Com` / `Biz` 前缀。
- 避免过深嵌套选择器；优先扁平 BEM 类。
- 状态类：优先 BEM 修饰符 `--active`、`--highlighted`。

## SMACSS 补充（布局层）

| 类名 | 职责 |
|------|------|
| `l-container` | 水平居中 + 内容宽 |
| `l-section` | 区块纵向间距 |
| `l-grid` | 通用网格列 |

## OOCSS 补充（外观层）

- **Structure**：BEM Block/Element 负责 DOM 结构与尺寸关系。
- **Skin**：颜色、边框、阴影、字体族写在 scoped 样式中，或页面级 `_tokens.scss` 变量。
- **State**：交互态写在元素/修饰符的 `@apply` 或 SCSS 嵌套中。

## Atomic CSS + `@apply`

在 scoped 样式块中把 UnoCSS 工具类收敛到 BEM：

```scss
.hero {
  &__title {
    @apply mb-4 text-4xl text-[#F8FAFC] font-bold leading-tight lg:text-5xl;
    font-family: "Space Grotesk", sans-serif;
  }
}
```

约定：

- **模板**：只出现 BEM + 少量已登记的 `l-*` / `shortcuts`。
- `**@apply**`：仅用于复用 Uno 工具组合；单条声明过长时拆为多个元素类。
- **动态修饰符**：`:class` 绑定 BEM 修饰符名（字符串或数组），禁止在模板拼接 utility 字符串。
- 第三方组件穿透用 `:deep()`，选择器仍以 BEM 为根。

## 禁止

- 在模板中为同一元素堆叠超过 **2 个** 非 BEM、非 `l-*`*、非 shortcuts 的 utility 类。
- 在业务组件模板中硬编码颜色值（应走 token 或 BEM skin）。
- 无 Block 的孤立修饰符类。
