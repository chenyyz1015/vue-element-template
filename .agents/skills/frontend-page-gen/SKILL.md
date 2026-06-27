---
name: frontend-page-gen
description: 全流程前端页面生成器 — 当用户需要创建、生成、新增、搭建页面时触发。覆盖需求分析 → 设计系统检查与建立 → openai-image MCP 概念图审核 → 选择设计工具（Pencil MCP / Figma MCP）→ 设计稿静态资源切图 → 设计稿 → 审核确认 → 完整代码实现（页面 + API + Store + 路由 + i18n）→ 验证 → impeccable 细节审核的全链路。适用于 UniApp 移动端页面（列表、表单、详情）和 H5 落地页。即使用户只说"我要做一个XX页面"也使用此技能。
---

# 前端页面全流程生成

## 总流程

```
需求分析 → 设计系统检查与建立 → 整体页面概念图（openai-image） → 选择设计工具 → 设计稿（布局→静态资源→高保真） → 审核（AI+用户） → 代码开发 → 验证（构建+审查+截图） → impeccable 细节审核
```

8 个阶段。**任何阶段用户说"跳过"或"不需要"，直接跳到下一阶段。用户说了算。**

---

## 阶段 1：需求分析

先向用户提问，**每次 1-2 个问题**，根据页面类型选取。

**开场**：

```
好的，我来帮你做这个页面。先确认：

1. 什么类型的页面？（后台管理 / 前台落地页 / 仪表盘 / 其他）
2. 这个页面解决什么问题？有哪些核心操作？
```

**后台管理类补充**（按需选取）：

- 页面包含哪些区域？（搜索栏、表格、分页、弹窗表单、详情抽屉等）
- 是否有 CRUD 操作？后端 API 是否已就绪？
- 表格列有哪些？哪些可搜索、可排序？表单字段、必填项？
- 是否需要权限控制？

**前台落地页类补充**（按需选取）：

- 包含哪些区块？（Hero、Features、Pricing、CTA、Footer 等）
- 目标用户是谁？什么场景下访问？

**通用补充**（按需选取）：

- 路由路径？是否需要独立布局？
- 后端 API 就绪？未就绪则用 mock 数据

### 产出

输出需求小结，用户确认后进入阶段 2：

```
## 需求小结

- **页面类型**：后台 CRUD 表格页
- **核心功能**：用户列表查询、新增、编辑、删除
- **主要区域**：搜索栏 + 表格 + 分页 + 新增/编辑弹窗
- **路由路径**：/system/user
- **API 状态**：已就绪 / mock
- **权限**：需要登录

确认无误进入设计系统检查阶段 →
```

---

## 阶段 2：设计系统检查与建立

> 需求确认后、概念图与设计稿开始前，**先检查当前项目是否已有设计系统**。确保后续设计和开发有统一的风格依据。

### 第一步：检查已有设计系统

检查 `design-system/MASTER.md` 是否存在：

```bash
cat design-system/MASTER.md 2>/dev/null
```

> **注意**：这里的 `design-system/` 是项目根目录下的设计系统目录，非 `src/` 内的目录。

### 第二步：有设计系统 → 继承

如果 `design-system/MASTER.md` 存在且内容不为空：

1. 读取 `MASTER.md`，提取关键信息并向用户确认：

   ```
   ## 检测到已有设计系统

   | Token | 值 |
   |-------|-----|
   | 风格 | Minimalism / Glassmorphism / ... |
   | 主色 | #xxxxxx |
   | 辅色 | #xxxxxx |
   | 标题字体 | XXX |
   | 正文字体 | XXX |

   本次页面将基于此设计系统生成。是否继续使用？还是想调整？
   ```

2. 用户选择「继续使用」→ 进入阶段 3（整体页面概念图）
3. 用户选择「调整」→ 进入第三步（新建/重新生成）

### 第三步：无设计系统 → 询问用户后建立

如果 `design-system/MASTER.md` 不存在或用户选择调整：

1. **加载技能**：`Skill` 工具加载 `ui-ux-pro-max`。

2. **询问用户风格偏好**（若项目已有默认主题，优先读取 `.claude/rules/` 或 UI 库文档继承，可跳过此步）：

   ```
   项目还没有定义设计系统。先确认页面风格：

   1. **Minimalism**（简约） — 少即是多，大量留白，适合 SaaS / 工具型
   2. **Glassmorphism**（玻璃态） — 毛玻璃层叠，适合科技感 / 创意型
   3. **Dark Mode**（暗色） — 深色底 + 亮色元素，适合开发工具 / 监控类
   4. **Flat Design**（扁平） — 纯色块无阴影，适合内容型 / 文档类
   5. 其他风格？（如你有想法的直接描述）

   偏向哪种？
   ```

3. **生成设计系统**：

   ```bash
   python3 .agents/skills/ui-ux-pro-max/scripts/search.py "<产品类型> <行业> <风格>" --design-system -p "<项目名>" --persist
   ```

   - 如果是特定页面，追加 `--page "<页面名>"` 生成页面级覆盖文件
   - 这会生成 `design-system/MASTER.md`

4. **读取并输出设计系统摘要**：

   ```
   ## 设计系统已建立

   | Token | 值 |
   |-------|-----|
   | 主色 | #xxxxxx |
   | 辅色 | #xxxxxx |
   | 标题字体 | XXX |
   | 正文字体 | XXX |
   | 风格 | minimalism |
   | 动效 | 150-300ms ease-out |

   后续设计和开发将遵循此系统。
   详情：design-system/MASTER.md
   ```

### 与后续阶段的衔接

- **进入概念图阶段**：Prompt 必须注入 `MASTER.md` 的主色/辅色/风格 token
- **进入设计阶段**：Pencil 或 Figma 设计稿的颜色/字体/间距必须来自 `MASTER.md` 的设计 token
- **进入开发阶段**：前台页面 token 写入 `_tokens.scss`；后台管理页面使用项目 UI 库的主题变量 / CSS 变量（见 `.claude/rules/code-style.md`），UX 规则作为补充

---

## 阶段 3：整体页面概念图（openai-image）

> 设计系统确认后、选择 Pencil/Figma **之前**，先用 openai-image MCP 生成整体页面视觉概念图，经用户审核通过后再进入设计稿阶段。

**跳过规则**：用户说「跳过概念图」→ 直接进入阶段 4。

详见 **[references/openai-image.md](references/openai-image.md)** 中的「整体页面概念图」章节。

### 核心步骤

1. **汇总 Prompt 上下文**：从阶段 1 需求小结 + `design-system/MASTER.md` 提取页面类型、区块列表、主色/辅色、风格关键词
2. **确保输出目录存在**：`design-system/mockups/<page-slug>/`（Windows 下 MCP 不会自动创建目录）
3. **调用 MCP**：`CallMcpTool` → server `user-openai-image` → `gpt_image_generate`
   - 后台管理：`size: "1920x1080"`，完整单屏 UI 概念图
   - 前台页面：`size: "1920x1080"` 或 `"2560x1440"`（长页可生成 2-3 张分段图）
   - 模型：`gpt-image-2` + `quality: "high"`（概念图不需透明底）
   - 输出：`design-system/mockups/<page-slug>/concept-v{n}.png`
4. **展示并审核**：

   ```
   ## 整体页面概念图

   [生成图]

   **Prompt 摘要**：页面类型 / 区块 / 风格 / 主色

   请确认：
   - 整体布局和信息架构是否符合预期？
   - 风格与色彩方向是否正确？
   - 有没有需要调整的区块或元素？

   确认通过后进入设计稿阶段；需要修改请说明调整方向。
   ```

5. **迭代**：用户反馈 → 调整 Prompt → 重新生成（版本号递增 `concept-v2`、`concept-v3`…）
6. **门禁**：用户明确「通过」后进入阶段 4

---

## 阶段 4：选择设计工具 + 设计稿

> 概念图审核通过后，**询问用户想用哪个设计工具**生成设计稿。两种工具都遵循**三步走**原则（布局线框 → 静态资源 → 组件高保真），且都**必须遵循阶段 2 的设计系统 token** 和**阶段 3 的概念图**。

### 询问用户

```
概念图已确认。设计阶段你想用哪个工具生成设计稿？

1. **Pencil**（推荐） — 本地 `.pen` 文件，通过 Pencil MCP 生成，无需额外账号
2. **Figma** — 云端设计文件，通过 Figma MCP 生成，需要 Figma 账号

选哪个？
```

### 静态资源生成（高保真之前）

在布局线框确认后、组件高保真设计**之前**，必须完成静态资源切图：

1. **资源清单**：根据需求 + **[references/page-types.md](references/page-types.md)** 列出所需资源（角色/IP、头像、空态插图、功能图标、精灵图等）
2. **逐项生成**：全部走 openai-image MCP（详见 **[references/openai-image.md](references/openai-image.md)**）
3. **用户确认资源集**：展示缩略图清单，确认后嵌入 Pencil/Figma 高保真
4. **高保真阶段**引用已生成 PNG，不再用占位色块；布局与风格对齐阶段 3 概念图

**跳过规则**：用户说「跳过静态资源」→ 高保真阶段可用占位色块，但开发前需补生成。

### Pencil 路径

详见 **[references/pencil-design.md](references/pencil-design.md)**。

核心流程：`get_editor_state` 获取 schema → `get_guidelines` 加载风格 → `batch_design` 创建布局（线框）→ `get_screenshot` 展示确认 → 静态资源生成（openai-image）→ `batch_design` 细化组件（高保真，注入 MASTER.md token + 真实 PNG）→ `get_variables` 对齐主题 → 截图确认

### Figma 路径

详见 **[references/figma-design.md](references/figma-design.md)**。

核心流程：`whoami` 获取 plan → `create_new_file` 创建文件 → 加载 `/figma-use` skill → `use_figma` 创建布局（线框）→ `get_screenshot` 展示确认 → 静态资源生成（openai-image）→ `use_figma` 细化组件（高保真，注入 MASTER.md token + 真实 PNG）→ 截图确认

### 共用设计约束

- **后台管理**：遵循项目 UI 组件库规范（见 `.claude/rules/code-style.md`），选用项目已有的输入框、按钮、列表、弹窗等组件
- **前台页面**：颜色/字体/间距必须来自 `MASTER.md` token，禁止硬编码
- **状态覆盖**：空状态、加载态、错误态
- **响应式**：标注 ≥ 2 个断点
- **概念图对齐**：高保真设计稿的布局与风格须与阶段 3 概念图一致

---

## 阶段 5：审核

> AI 先自动审核对照项目规范、设计系统和概念图，再交用户确认。

### AI 自动审核

**视觉层面**：布局合理性、色彩协调（是否与 MASTER.md token 一致）、与概念图方向一致、排版清晰（≤ 3 级字号、≤ 2 种字体）、静态资源是否已嵌入、状态和响应式覆盖

**技术规范（对照 `.claude/rules/`）**：项目 UI 组件库使用、UX token 引用、CSS 命名规范、交互状态完整性

**输出审核报告**：

```
## AI 设计审核

✅ 通过项：布局合理、组件选型正确、与设计系统一致、静态资源已嵌入、响应式断点已标注
⚠ 建议项：空状态增加引导插图、移动端操作列改为下拉菜单
❌ 需修复：（无）
```

### 用户确认

展示截图和审核报告，逐项确认布局、颜色、组件、静态资源、状态。确认后进入阶段 6，需要修改则回到阶段 4。

---

## 阶段 6：代码开发

> **先读规范再写代码**。生成顺序：类型定义 → API 模块 → i18n → 页面组件 → Store → 路由 → API 导出。每完成一组告知进度。

### 开发前必读

读取以下文件确认当前项目状态：

- `.claude/rules/code-style.md` `.claude/rules/api-conventions.md` `.claude/rules/css-naming.md` `.claude/rules/directives.md`
- `src/router/routes.ts` `src/i18n/locales/zh-CN.json`
- `design-system/MASTER.md`（如果存在，前台页面必须读取以提取 token）

### 静态资源引用

- 页面 `<image>` 引用路径与 `src/assets/` 下 openai-image MCP 生成文件一致（如 `/assets/illustrations/xxx.png`）
- 开发阶段**不再重新生成**静态资源，除非阶段 8 impeccable 审核指出缺失

### 规范与模板

详细规范速查和审查清单见 **[references/code-conventions.md](references/code-conventions.md)**。
代码模板（CRUD 表格页、表单弹窗、搜索栏、落地页）见 **[references/code-templates.md](references/code-templates.md)**。

Page type 组件/状态参考见 **[references/page-types.md](references/page-types.md)**。

### 核心禁止事项

- 手动 import 已由 auto-import 提供的内容（具体清单见 `.claude/rules/code-style.md`）
- 模板堆叠 ≥ 3 个非 BEM / 非 shortcuts 的 utility class
- 组件内用 `function` 声明方法（API 模块除外）
- 使用 `.then()` / `.catch()` 链式调用（ElMessageBox 等反馈 API 除外）
- 穿透子组件 `$refs` 或 `$el`
- 前台页面硬编码颜色/字体（必须来自 MASTER.md token）

---

## 阶段 7：验证

三轮验证：

### 第一步：类型与构建验证

```bash
npm run type-check
```

类型检查通过。如需验证生产构建：

```bash
npm run build
```

有错误逐条修复后重新执行。

### 第二步：规范审查

对照 **[references/code-conventions.md](references/code-conventions.md)** 中的「阶段 7 规范审查清单」逐项检查，输出通过/需修复报告。

### 第三步：截图对比

1. `npm run dev` 启动开发服务器
2. 访问生成页面，截图
3. 与阶段 3 概念图、阶段 4 设计稿并排对比：布局、组件位置、间距、颜色、排版、静态资源、交互状态

---

## 阶段 8：impeccable 细节审核

> 设计质量和 UX 打磨，不是代码规范审查（阶段 7 已完成）。

1. **加载技能**：`Skill` 加载 `impeccable`
2. **加载上下文**：`node .claude/skills/impeccable/scripts/load-context.mjs`（PRODUCT.md 缺失时提示但不阻塞）
3. **判断 register**：后台 → `product`，前台 → `brand`，加载对应 reference
4. **执行审核**：

| 模式       | 场景        | 关注点                                |
| ---------- | ----------- | ------------------------------------- |
| `critique` | UX 设计审查 | 视觉层次、信息架构、认知负荷、UX 文案 |
| `audit`    | 技术质量    | 无障碍、性能、响应式、边界情况        |
| `polish`   | 交付前打磨  | 视觉 + 交互细节综合优化               |

5. **输出审核报告**：按优先级列出修复建议
6. **修复**：按优先级修复，修复后告知用户。

---

## 联动技能

| 阶段               | 技能/工具              | 调用方式                            |
| ------------------ | ---------------------- | ----------------------------------- |
| 设计系统检查与建立 | ui-ux-pro-max          | `Skill` 工具                        |
| 整体页面概念图     | openai-image MCP       | `CallMcpTool` → `user-openai-image` |
| 设计稿静态资源     | openai-image MCP       | `CallMcpTool` → `user-openai-image` |
| 设计稿             | Pencil MCP / Figma MCP | MCP 直接调用                        |
| 细节审核           | impeccable             | `Skill` 工具                        |
