# 代码风格规范

## 通用

- 使用 2 空格缩进，LF 换行
- 文件末尾保留一个空行
- 优先使用 `const`，需要重新赋值时使用 `let`，避免 `var`
- 使用 ESModule（`import` / `export`），不使用 CommonJS

## TypeScript

- 启用 strict 模式，避免 `any`（必要时用 `unknown`）
- 优先使用 `interface` 定义对象类型，`type` 用于联合/交叉类型
- 未使用的变量以 `_` 前缀命名（如 `_unused`）
- 函数参数和返回值需显式标注类型

## 异步编程

- 统一使用 `async/await` 处理异步逻辑，**禁止使用 `.then()` / `.catch()` 链式调用**
- 异步函数声明为 `async`，用 `await` 等待结果，用 `try/catch` 处理错误
- 仅在 Axios 拦截器等必须返回 Promise 的回调中可使用 `Promise.reject()` 或 `throw`

```typescript
// ❌ 不要这样做
function fetchData() {
  getUserList()
    .then((res) => {
      users.value = res.data.list;
    })
    .catch((err) => {
      console.error(err);
    });
}

// ✅ 推荐写法
async function fetchData() {
  try {
    const { data } = await getUserList();
    users.value = data.list;
  } catch {
    // 错误处理
  }
}
```

## Vue 单文件组件

- 统一使用 `<script setup lang="ts">`
- 统一使用 `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- Props 使用 `defineProps` + TypeScript 类型
- Emits 使用 `defineEmits` + 类型声明
- 布局类样式优先使用 UnoCSS 原子类，组件特有样式写在 `<style lang="scss" scoped>` 中

### 单文件组件模板

```vue
<script setup lang="ts">
// 逻辑代码
</script>

<template>
  <!-- 模板 -->
</template>

<style lang="scss" scoped>
// 组件样式
</style>
```

## 目录与命名规范

### 公共组件（`src/components/`）

- 目录名：**kebab-case**，以 `index.vue` 作为组件入口
- 分类前缀：
  - **非业务型**：`com-` 开头（通用 UI 组件）
  - **业务型**：`biz-` 开头（跨页面复用的业务组件）
- 同级目录可放置 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 通过 `unplugin-vue-components` 自动引入，**禁止手动 import**

```
src/components/
├── com-hello-card/          # 非业务型公共组件
│   ├── index.vue
│   └── types.ts
└── biz-user-card/           # 业务型公共组件
    ├── index.vue
    ├── types.ts
    └── constants.ts
```

自动引入后组件名为目录名的 PascalCase 形式，如 `com-hello-card` → `<ComHelloCard />`。

### 页面组件（`src/views/`）

- 目录名：**kebab-case**，以 `index.vue` 作为页面入口
- 同级目录可放置 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 页面私有子组件放 `components/` 子目录，文件名 **PascalCase**，在页面中**手动 import**

```
src/views/
├── home/
│   └── index.vue
└── about/
    ├── index.vue
    ├── constants.ts
    └── components/
        └── TechStackTable.vue  # PascalCase，手动引入
```

### 布局组件（`src/layouts/`）

- 目录名：**kebab-case**，以 `index.vue` 作为布局入口
- 同级目录可放置 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 布局私有子组件放 `components/` 子目录，文件名 **PascalCase**，在布局中**手动 import**
- 在 `App.vue` 或路由配置中**手动 import** 布局组件

```
src/layouts/
└── default-layout/
    ├── index.vue
    ├── constants.ts
    └── components/
        └── SidebarNav.vue      # PascalCase，手动引入
```

## 内置工具

### SVG 图标（unplugin-svg-component）

- 图标文件放在 `src/assets/icons/`，文件名（不含 `.svg`）即 `name`
- `main.ts` 已全局注册 `<SvgIcon />`，模板中**禁止**再 `import SvgIcon`
- 新增/修改图标后支持 HMR；`SvgName` 类型见 `types/svg-component.d.ts`（构建生成）

```vue
<template>
  <SvgIcon name="home" class="text-primary text-xl" />
</template>
```

### dayjs

- 已配置中文 locale、`relativeTime`、`customParseFormat`（见 `src/utils/dayjs.ts`）
- 通过 auto-import 注入为 `dayjs`，**禁止** `import dayjs from 'dayjs'`

```typescript
const label = dayjs().format("YYYY-MM-DD");
const relative = dayjs("2024-01-01").fromNow();
```

### lodash-es

- 已内置 `lodash-es`，**不参与 auto-import**，按函数手动 import 以支持 tree-shaking
- **禁止** `import _ from 'lodash-es'` 或 `import * as _ from 'lodash-es'` 全量引入

```typescript
import { cloneDeep, debounce, pick } from "lodash-es";

const copy = cloneDeep(source);
const onSearch = debounce(fetchList, 300);
```

### @vueuse/core

`@vueuse/core` 导出的组合式函数（如 `useLocalStorage`、`useDebounceFn`）已 auto-import，**禁止**手动 import。

## 自动引入

### unplugin-auto-import

以下 API **禁止手动 import**：

```typescript
// ❌ 不要这样做
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAppStore } from "@/stores/app";
import { useCounter } from "@/composables/useCounter";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";

// ✅ 直接使用（auto-import 已配置）
const count = ref(0);
const router = useRouter();
const appStore = useAppStore();
const { increment } = useCounter();
const theme = useLocalStorage("theme", "light");
const today = dayjs().format("YYYY-MM-DD");
```

Element Plus 已通过 `unplugin-vue-components` / `unplugin-auto-import` **按需引入**，`main.ts` 中禁止 `app.use(ElementPlus)` 或全量 `element-plus/dist/index.css`。

Element Plus 主题变量在 `src/styles/element/var.scss` 维护，由 `vite.config.ts` 的 `scss.additionalData` 全局注入；`src/styles/element/index.scss` 引入 Element Plus base 样式。

反馈类 API（`ElMessage`、`ElMessageBox`、`ElNotification`、`ElLoading`）**禁止手动 import**：

```typescript
// ❌ 不要这样做
import { ElMessage } from "element-plus";

// ✅ 直接使用（auto-import 已配置）
ElMessage.success("操作成功");
ElMessageBox.confirm("确认删除？", "提示");
```

### unplugin-vue-components

`src/components/` 下公共组件 **禁止手动 import**：

```vue
<!-- ❌ 不要这样做 -->
<script setup lang="ts">
import ComHelloCard from "@/components/com-hello-card/index.vue";
</script>

<!-- ✅ 直接使用（components 插件已配置） -->
<script setup lang="ts">
// 逻辑代码
</script>

<template>
  <ComHelloCard title="标题" />
  <el-button>按钮</el-button>
</template>

<style lang="scss" scoped></style>
```

### 手动引入场景

以下场景**允许且应手动 import**：

- `src/layouts/` 布局组件（在 `App.vue` 或路由中）
- 页面/布局 `components/` 下的私有子组件（PascalCase）
- 同级目录的 `types.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `main.ts`、`router/index.ts` 等模块初始化文件

```vue
<!-- 页面私有子组件：手动引入 -->
<script setup lang="ts">
import TechStackTable from "./components/TechStackTable.vue";
import { TECH_STACK } from "./constants";
</script>
```

## Pinia Store

- 使用 Setup Store 风格（`defineStore` + 组合式函数）
- Store 文件命名：`useXxxStore` 对应 `stores/xxx.ts`
- 跨 Store 引用在 setup 函数内完成，避免循环依赖

## 命名约定

| 类型                | 目录/文件规范                              | 示例                                     |
| ------------------- | ------------------------------------------ | ---------------------------------------- |
| 非业务公共组件      | kebab-case 目录 + `index.vue`，`com-` 前缀 | `components/com-page-header/index.vue`   |
| 业务公共组件        | kebab-case 目录 + `index.vue`，`biz-` 前缀 | `components/biz-order-card/index.vue`    |
| 页面                | kebab-case 目录 + `index.vue`              | `views/user-profile/index.vue`           |
| 页面/布局私有子组件 | PascalCase `.vue`，放 `components/` 子目录 | `views/about/components/TechStackTable.vue` |
| 布局                | kebab-case 目录 + `index.vue`              | `layouts/default-layout/index.vue`       |
| 辅助文件            | camelCase 或语义化命名，与组件同级         | `types.ts`、`constants.ts`、`helpers.ts` |
| Composable          | camelCase，use 前缀                        | `useCounter.ts`                          |
| Store               | camelCase，use 前缀                        | `useAppStore`                            |
| 常量                | UPPER_SNAKE_CASE                           | `API_BASE_URL`                           |
| 工具函数            | camelCase                                  | `formatDate`                             |

## 注释

- 代码应自解释，仅在复杂业务逻辑处添加注释
- 不使用 obvious 注释（如 `// 获取用户`）
- TODO 注释格式：`// TODO: 描述`
