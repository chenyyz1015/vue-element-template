# openai-image MCP 图像生成流程

> 在 frontend-page-gen 流程中，openai-image MCP 承担两类职责：**阶段 3 整体页面概念图**（设计稿前的视觉方向确认）和**阶段 4 静态资源切图**（角色、头像、图标、插图、精灵图等）。

## MCP 服务器

- **Server ID**：`user-openai-image`
- **显示名称**：`openai-image`
- **调用方式**：`CallMcpTool`，调用前读取 `mcps/user-openai-image/tools/*.json` schema

## 工具选型矩阵

| 资源类型       | 工具                                            | 模型          | 背景        | 尺寸建议                |
| -------------- | ----------------------------------------------- | ------------- | ----------- | ----------------------- |
| 整体页面概念图 | `gpt_image_generate`                            | gpt-image-2   | opaque      | 1024x1536 / 1536x1024   |
| IP 角色参考图  | `gpt_image_create_character_reference`          | gpt-image-1.5 | transparent | 1024x1024               |
| 头像           | `gpt_image_generate`                            | gpt-image-1.5 | transparent | 1024x1024               |
| 空态/引导插图  | `gpt_image_generate`                            | gpt-image-1.5 | transparent | 1024x1024               |
| 功能图标       | `gpt_image_generate`                            | gpt-image-1.5 | transparent | 1024x1024（后期可裁切） |
| 单帧姿势       | `gpt_image_generate_pose`                       | gpt-image-1.5 | transparent | 需先有 reference        |
| 行走循环精灵图 | `gpt_image_generate_sprite_sheet`               | gpt-image-1.5 | transparent | 多帧横向拼接            |
| 基于参考微调   | `gpt_image_edit` / `gpt_image_create_variation` | 按需          | 按需        | —                       |

> **模型选择**：需要透明背景时用 `gpt-image-1.5`（`gpt-image-2` 不支持透明底）；概念图用 `gpt-image-2` 获得更高质量。

---

## 输出目录约定

```
design-system/mockups/<page-slug>/     # 概念图（阶段 3，设计参考，非生产资源）
src/assets/ip/                         # IP 角色参考图
src/assets/avatars/                    # 头像
src/assets/icons/                      # 功能图标
src/assets/illustrations/              # 空态/引导插图
src/assets/sprites/                    # 精灵图
```

**命名规则**：`<page-slug>-<asset-type>-<desc>.png`，版本迭代加 `-v2` 后缀。

**目录创建**：调用 MCP 前必须确保 `output_directory` 已存在（Windows 下 MCP 不会自动创建）。

---

## 整体页面概念图（阶段 3）

### 触发时机

设计系统（阶段 2）确认后，选择 Pencil/Figma 之前。

### 调用参数

```json
{
  "server": "user-openai-image",
  "toolName": "gpt_image_generate",
  "arguments": {
    "prompt": "<见下方模板>",
    "model": "gpt-image-2",
    "quality": "high",
    "size": "1024x1536",
    "output_directory": "design-system/mockups/<page-slug>",
    "output_format": "png"
  }
}
```

- **移动端业务页**：`size: "1024x1536"`
- **H5 落地页**：`size: "1536x1024"` 或 `"1024x1536"`；内容较长时分段生成 2-3 张（Hero 段、Features 段、Footer 段）

### Prompt 模板

```
{页面类型} mobile app UI mockup, {区块列表，来自需求小结}。
设计风格：{MASTER.md 风格关键词}，主色 {primary}，辅色 {secondary}。
{MASTER.md 视觉风格描述，如 minimalism / glassmorphism / flat design 等具体特征}。
Clean modern interface, realistic UI layout with navigation, content areas, and interactive elements.
High fidelity mockup, no watermark, no text overlay, no lorem ipsum visible text.
```

**示例（CRUD 列表页）**：

```
Mobile CRUD list page UI mockup: top navigation bar with page title, search input field,
action button row with add button, scrollable list of item cards with avatar and title,
pagination footer. Minimalist clean aesthetic, primary color {primary}, neutral background,
soft rounded components. High fidelity mockup, no watermark, no text overlay.
```

### 审核与迭代

1. 展示生成图 + Prompt 摘要
2. 用户确认布局、风格、信息架构
3. 需修改时调整 Prompt，版本递增保存（`concept-v1.png` → `concept-v2.png`）
4. 用户明确「通过」后进入阶段 4

---

## 静态资源切图（阶段 4）

### 触发时机

选择 Pencil/Figma 后，布局线框确认后、组件高保真设计之前。

### 资源清单来源

1. 阶段 1 需求小结中的功能描述
2. **[page-types.md](page-types.md)** 各页面类型的「常见静态资源」
3. 阶段 3 概念图中可见的插图/图标元素

### 各类型 Prompt 模板

**IP 角色参考图**（`gpt_image_create_character_reference`）：

```
{MASTER.md 风格关键词} anthropomorphic {character type} IP mascot, full body front-facing neutral stance.
{体型与外观描述}，friendly expression.
Wearing {与页面主题匹配的服饰/配饰}.
Color palette: {primary}, {secondary}, and tones from MASTER.md.
Character design reference, transparent background, no text, no watermark.
```

**头像**（`gpt_image_generate`，transparent）：

```
{MASTER.md 风格关键词} avatar portrait, {character description}, head and shoulders,
colors matching {primary}/{secondary}, friendly expression, circular crop friendly composition,
transparent background, no text.
```

**空态/引导插图**（`gpt_image_generate`，transparent）：

```
{MASTER.md 风格关键词} empty state illustration, {scene description e.g. empty list with relaxed character},
colors matching design tokens, centered composition,
transparent background, no text.
```

**功能图标**（`gpt_image_generate`，transparent）：

```
Flat icon, {MASTER.md 风格关键词}, single {object name} object, centered,
colors matching {primary color}, simple clean design,
transparent background, no text, suitable for 64px display.
```

**精灵图**（两步 workflow）：

1. `gpt_image_create_character_reference` → 生成角色参考图
2. `gpt_image_generate_sprite_sheet` 或多次 `gpt_image_generate_pose` → 生成行走/待机动画帧

### 资源确认输出

```
## 静态资源清单

| 资源 | 路径 | 状态 |
|------|------|------|
| 空态插图 | src/assets/illustrations/user-list-empty.png | ✅ 已生成 |
| 默认头像 | src/assets/avatars/default-user.png | ✅ 已生成 |
| 新增图标 | src/assets/icons/icon-add.png | ✅ 已生成 |

请确认资源集是否完整，确认后将嵌入高保真设计稿。
```

---

## MCP 调用规范

1. **Schema 优先**：每次调用前读取对应工具的 JSON schema
2. **目录预创建**：`output_directory` 指向的目录必须已存在
3. **Prompt 注入**：必须包含 `MASTER.md` token（主色/辅色/风格关键词）；若项目已有 IP 参考图，在 Prompt 中描述其风格以保持一致性
4. **版本管理**：迭代时递增文件名版本号，保留历史版本供对比
5. **展示给用户**：生成后立即展示图片，附 Prompt 摘要和保存路径

## 失败降级

MCP 返回 `Connection error` 或其他失败时：

1. 告知用户检查 Cursor MCP 配置中的 `OPENAI_API_KEY`
2. 经用户同意后，可暂用内置 `GenerateImage` 工具生成
3. 在产出中标注「非 MCP 生成，透明底资源需后续补切」
4. 概念图降级不影响流程推进，但静态资源缺失需在开发前补齐

## 嵌入设计稿

| 设计工具 | 嵌入方式                                                            |
| -------- | ------------------------------------------------------------------- |
| Pencil   | `batch_design` 插入图片节点，引用本地 PNG 路径                      |
| Figma    | `upload_assets` 上传 PNG，或 `use_figma` Plugin API 置入 Image 节点 |

高保真设计须对齐阶段 3 概念图的布局与风格方向。
