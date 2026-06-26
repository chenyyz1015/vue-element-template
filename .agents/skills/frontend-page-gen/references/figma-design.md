# Figma MCP 设计流程

> 当用户在阶段 2 选择 Figma MCP 时，使用此流程。分两步走：先页面布局确认大方向，再组件级高保真。

## Figma MCP 工具速查

| 工具 | 用途 |
|------|------|
| `whoami` | 获取用户信息和 plan 列表 |
| `create_new_file` | 创建新的 Figma 设计文件 |
| `use_figma` | 执行 Figma Plugin API JS 代码（核心工具） |
| `get_design_context` | 获取设计上下文和代码参考 |
| `get_screenshot` | 截图用于审核展示 |
| `get_variable_defs` | 获取变量定义 |
| `search_design_system` | 搜索设计系统组件/变量/样式 |
| `get_metadata` | 获取节点元数据（XML 结构） |
| `generate_figma_design` | 从网页/代码捕获页面到 Figma |
| `get_libraries` | 获取文件关联的设计库 |

## 准备

1. **获取用户信息**：调用 `whoami` 获取 plan 列表。如果用户有多个 plan，询问选择哪个 team/org。
2. **创建文件**（如需新文件）：加载 `/figma-create-new-file` skill（如果存在），调用 `create_new_file` 创建设计文件。
3. **加载 Figma 编写指南**：加载 `/figma-use` skill（如果存在），确保 `use_figma` 调用正确。

## 第一步：页面布局线框图

1. **生成布局框架**：用 `use_figma` 创建页面级线框图，只关注整体区块划分和内容层级，暂不设置颜色和字体细节。

   **后台管理**：面包屑 → 页面标题 → 搜索栏 → 操作按钮 → 数据表格 → 分页
   **前台落地页**：导航栏 → Hero → Features → 内容区块 → CTA → Footer

2. **截图展示**：调用 `get_screenshot` 截图展示给用户，确认区块划分和顺序。

3. **迭代修改**：用户反馈 → `use_figma` 调整 → 重新截图，直到确认。

## 第二步：组件级高保真设计

布局确认后，细化到组件级别：

1. **细化内容**（用 `use_figma` 逐个区块更新）：
   - 颜色：主题色、中性色、语义色（成功/警告/危险/信息）
   - 字体：标题/正文层次（字号、行高、字重）
   - 间距：组件内边距、区块间距，设置正确的 auto-layout
   - Element Plus 组件：表格、表单、按钮、弹窗等，与项目 `src/styles/element/var.scss` 一致
   - 交互状态：hover、focus、disabled、loading、empty、error（用 variant 表达）
   - 响应式：标注移动/平板/桌面断点的布局变化

2. **搜索设计系统**（可选）：调用 `search_design_system` 查找项目已有设计组件和变量。
3. **获取变量**（可选）：调用 `get_variable_defs` 确保与项目主题一致。

4. **截图确认**：逐区块展示高保真效果，确认颜色、组件选型、交互状态。

5. **迭代修改**：用户反馈 → `use_figma` 调整 → 重新截图，直到确认。

## 设计约束

- **后台管理**：遵循 Element Plus 规范，使用 `el-table`、`el-form`、`el-pagination`、`el-dialog` 等
- **前台页面**：颜色/字体/间距来自 UX token
- **状态覆盖**：空状态、加载态、错误态
- **响应式**：标注 ≥ 2 个断点
- 每次 `use_figma` 调用前必须加载 `/figma-use` skill
