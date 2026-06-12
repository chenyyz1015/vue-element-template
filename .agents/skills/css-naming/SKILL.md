---
name: css-naming
description: CSS 类名命名规范，包括 BEM、SMACSS l-* 布局、OOCSS 结构与皮肤分离、UnoCSS @apply 收敛等。在编写 Vue 组件样式、定义 CSS 类名或处理 UnoCSS 与 scoped 样式协作时使用。
---

# CSS 类名命名规范

## 总原则

1. **模板可读性优先**：HTML 使用语义化 **BEM** 类名，避免长串原子类堆叠
2. **样式集中维护**：布局/肤色/状态的原子规则在 `<style lang="scss" scoped>` 内通过 **@apply** 注入到 BEM 选择器
3. **分层补充**：用 **SMACSS** 划分结构层级，用 **OOCSS** 分离结构（Structure）与外观（Skin）
4. **UnoCSS 边界**：模板中**禁止**直接写长串 utility class（除 `shortcuts` 如 `flex-center` 等极短辅助类）

## BEM 约定

| 部分     | 格式                                             | 示例                                                     |
| -------- | ------------------------------------------------ | -------------------------------------------------------- |
| Block    | `kebab-case`，语义化，对应组件/区块              | `hero`、`compare-table`                                  |
| Element  | `block__element`                                 | `hero__title`、`compare-table__cell`                     |
| Modifier | `block--modifier` 或 `block__element--modifier`   | `hero__cta--primary`、`compare-table__col--highlighted`  |

规则：
- Block 名与 Vue 组件/业务区块一致，**不加** `Com` / `Biz` 前缀
- 单文件组件内仅一个主 Block 时，根节点使用 Block 类
- 避免过深嵌套选择器；优先扁平 BEM 类
- 状态类优先 BEM 修饰符 `--active`、`--highlighted`；与 Vue 绑定时用 `:class` 切换

## SMACSS 补充（布局层）

跨区块复用的**纯结构**类使用 `l-` 前缀（Layout），不写颜色与皮肤：

| 类名          | 职责                                   |
| ------------- | -------------------------------------- |
| `l-container` | 水平居中 + 内容宽度限制                |
| `l-section`   | 区块纵向间距（`py` / `px` 断点）       |
| `l-grid`      | 通用网格列（在 scoped 中 `@apply` 定义列数变体） |

页面私有布局变体：`l-grid--features`、`l-grid--integrations`（`l-` + 语义修饰）。

## OOCSS 补充（外观层）

- **Structure**：BEM Block/Element 负责 DOM 结构与尺寸关系
- **Skin**：颜色、边框、阴影、字体族写在 scoped 样式中，或页面级 `_tokens.scss` 变量
- **State**：交互态（`hover`、`focus`）写在元素/修饰符的 `@apply` 或 SCSS 嵌套中

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
- **模板**：只出现 BEM + 少量已登记的 `l-*` / `shortcuts`
- **@apply**：仅用于复用 Uno 工具组合；单条声明过长时拆为多个元素类
- **动态修饰符**：`:class` 绑定 BEM 修饰符名，禁止在模板拼接 utility 字符串
- **第三方组件**：将 BEM 类直接挂在组件根上；需要穿透时用 `:deep()`，选择器以 BEM 为根
- **!important**：勿在独立 SCSS 中用 `@apply !utility`（Sass 会误解析 `!`）

## 禁止

- 在模板中为同一元素堆叠超过 **2 个** 非 BEM、非 `l-*`、非 shortcuts 的 utility 类
- 在业务组件模板中硬编码颜色值（如 `#22C55E`），应走 token 或 BEM skin
- 无 Block 的孤立修饰符类

完整原文见 `.claude/rules/css-naming.md`。
