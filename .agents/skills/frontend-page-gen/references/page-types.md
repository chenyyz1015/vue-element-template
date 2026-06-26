# 常见页面速查

## 后台 CRUD 表格页

- **区域**：搜索栏 + 操作按钮 + 表格 + 分页 + 新增/编辑弹窗 + 删除确认
- **组件**：`el-table`、`el-pagination`、`el-dialog`、`el-form`、`el-button`、`el-input`、`el-select`
- **状态**：loading（表格 `v-loading`）、empty（`el-empty`）、error（接口 catch 后 ElMessage）
- **权限**：搜索栏/操作按钮挂 `v-permission`

## 表单页

- **区域**：表单卡片 + 提交/取消按钮
- **组件**：`el-form`、`el-card`、`el-input`、`el-select`、`el-date-picker`、`el-switch`、`el-radio-group`、`el-checkbox-group`
- **状态**：submitting（`loading` 防重复提交）、validation（el-form rules）

## 详情页

- **区域**：面包屑 + 详情卡片 + 操作按钮
- **组件**：`el-breadcrumb`、`el-descriptions`、`el-card`、`el-tag`、`el-divider`
- **状态**：loading（骨架/`v-loading`）、404（数据不存在时提示）

## 仪表盘页

- **区域**：统计卡片行 + 图表区 + 列表/表格区
- **组件**：`el-card`、`el-row`、`el-col`、`el-statistic`（或自建）、`el-progress`、`el-table`
- **状态**：loading（骨架/`v-loading`）、empty（无数据时的友好提示）

## 前台落地页

- **区域**：Navbar + Hero + Features + Pricing + CTA + Footer
- **样式**：SCSS + UnoCSS `@apply` + BEM，UnoCSS shortcuts 如 `flex-center`
- **响应式**：`sm:` `md:` `lg:` 断点
- **状态**：骨架屏 / 渐进加载、空状态插画
