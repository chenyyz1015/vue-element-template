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

## 函数定义

- 除特殊情况外，统一使用**箭头函数**定义方法（组件 `<script setup>` 内、composable、Store、同级 `helpers.ts` / `useXxx.ts` 等）
- **例外**（可保留 `function` 声明）：
  - `src/api/` 模块的 HTTP 请求封装（可按现有习惯使用 `export function`，便于与后端接口一一对应）
  - 必须提升（hoist）的相互递归（极少数场景）
  - 第三方库类型签名强制要求具名 `function` 时从宽
- Vue 生命周期钩子（`onMounted` 等）使用回调时，回调体内部方法仍优先箭头函数

```typescript
// ❌ 不要这样做（组件 / composable / helpers 内）
function handleSubmit() {
  // ...
}

async function fetchData() {
  // ...
}

// ✅ 推荐写法
const handleSubmit = () => {
  // ...
};

const fetchData = async () => {
  // ...
};
```

## 重构要求

对存量代码做规范化重构时，除 BEM、TS Props、`async/await`、箭头函数等约定外，还应：

- 将 `function foo()` / `async function foo()` 迁移为 `const foo = () =>` / `const foo = async () =>`（`src/api/` 等例外目录不在批量迁移范围内，除非该文件已在改动范围内）
- 将 `props` + `emit('update:xxx')` / `computed` 包装的双向绑定迁移为 **`defineModel`**（见下文「双向绑定」）
- 自定义事件名调整为 **kebab-case**，满足 ESLint `vue/custom-event-name-casing`（模板侧已用 kebab-case 的，同步修正 `defineEmits` 声明）

## 异步编程

- 统一使用 `async/await` 处理异步逻辑，**禁止使用 `.then()` / `.catch()` 链式调用**
  - **例外**：Element Plus 反馈组件提供的全局方法（如 `ElMessageBox.alert`、`ElMessageBox.confirm`、`ElMessageBox.prompt` 等），这些 API 返回的 Promise 仅用于确认操作，无实际异步数据流，可继续使用 `.then()` 链式调用
- 异步函数声明为 `async`，用 `await` 等待结果，用 `try/catch` 处理错误
- 仅在 Axios 拦截器等必须返回 Promise 的回调中可使用 `Promise.reject()` 或 `throw`

```typescript
// ❌ 不要这样做
const fetchData = async () => {
  getUserList()
    .then((res) => {
      users.value = res.data.list;
    })
    .catch((err) => {
      console.error(err);
    });
};

// ✅ 推荐写法
const fetchData = async () => {
  try {
    const { data } = await getUserList();
    users.value = data.list;
  } catch {
    // 错误处理
  }
};
```

## Vue 单文件组件

- 统一使用 `<script setup lang="ts">`
- 统一使用 `<style lang="scss" scoped>`
- 单文件组件顺序：`<script setup lang="ts">` → `<template>` → `<style lang="scss" scoped>`
- Props 使用 `defineProps` + TypeScript 类型
- Emits 使用 `defineEmits` + 类型声明；**非 v-model 自定义事件名使用 kebab-case**（与 ESLint `vue/custom-event-name-casing` 一致，如 `query-table`、`set-layout`）
- **双向绑定**优先使用 Vue 3.4+ **`defineModel`**，替代 `defineProps` + `defineEmits('update:xxx')` + `computed` 包装，减少样板代码
- **体量**：单文件组件（含 `<script>`、`<template>`、`<style>`）**宜控制在约 300 行以内**，优先保证可读性；超出时按职责拆分，而非堆叠注释或折叠大块代码
- **拆分顺序**（可组合使用）：
  1. 页面/布局私有子组件 → 同级 `components/`（PascalCase，手动 import）
  2. 可复用逻辑 → 同级 `useXxx.ts` / `helpers.ts`（布局、页面目录下，手动 import；跨页面复用放 `src/composables/`）
  3. 样式过长 → 同级 `styles/` 下 SCSS partial（`@use` / `@forward`），或按区块拆分子组件各自 scoped 样式
- **类名**：模板采用 **BEM**；布局层可用 **SMACSS** `l-*`；外观 token 见 **OOCSS** 约定。原子样式在 `<style lang="scss" scoped>` 内用 `@apply` 注入，禁止在模板堆叠长串 utility。详见 `.claude/rules/css-naming.md`
- **DOM 模板引用**：统一使用 `useTemplateRef('xxx')` 通过字符串参数指定 ref 名称，**禁止**使用 `const xxx = ref<HTMLElement | null>(null)` 方式声明与模板引用的强绑定
- **模板引用类型**：`useTemplateRef` 必须显式标注泛型，按绑定目标选择：
  - **项目内 Vue 组件**（页面/布局 `components/` 下私有子组件等）：`InstanceType<typeof ComponentName>`，组件须已手动 import
  - **Element Plus 等第三方组件**：优先使用库导出的实例类型（如 `FormInstance`、`UploadInstance`、`TableInstance`、`TreeInstance`、`InputInstance`）；无专用类型时用 `InstanceType<typeof ElXxx>`（如 `import type { ElPopover } from 'element-plus'`）
  - **原生 DOM**：使用对应元素类型（如 `HTMLElement`、`HTMLIFrameElement`、`HTMLInputElement`）
  - **禁止**省略泛型或仅用 `ComponentPublicInstance` 等过宽类型
- **跨组件访问**：父组件通过 `useTemplateRef` 获取子组件实例后，仅允许以下两种方式访问子级能力：
  1. **子组件 `defineExpose`**：在子组件内暴露方法/属性，父组件直接调用（如 `childRef.value?.validate()`）
  2. **根 DOM ref + `querySelector`**：父 ref 绑定子组件根容器或包裹层原生元素，在父组件内 `querySelector` 定位内部 DOM（如 Sortable 绑定 `.el-upload-list`）
  - **禁止** `childRef.value?.$refs.xxx`、`childRef.value?.$el` 等方式穿透访问子组件内部 ref 或根 DOM；存量代码重构时须改为上述两种方式之一
- **方法定义**：除特殊情况外，组件内方法统一使用箭头函数（`const handleXxx = () => {}`）；存量重构时同步迁移，见上文「函数定义」「重构要求」

### DOM 模板引用（useTemplateRef）

```vue
<script setup lang="ts">
import type { FormInstance, TableInstance, UploadInstance } from "element-plus";
import type { ElPopover } from "element-plus";
import BasicInfoForm from "../components/BasicInfoForm.vue";
import GenInfoForm from "../components/GenInfoForm.vue";

// 项目内组件
const basicInfo = useTemplateRef<InstanceType<typeof BasicInfoForm>>("basicInfo");
const genInfo = useTemplateRef<InstanceType<typeof GenInfoForm>>("genInfo");

// Element Plus 实例类型
const queryRef = useTemplateRef<FormInstance>("queryRef");
const tableRef = useTemplateRef<TableInstance>("tableRef");
const uploadRef = useTemplateRef<UploadInstance>("uploadRef");

// Element Plus 组件（无专用 Instance 类型时）
const popoverRef = useTemplateRef<InstanceType<typeof ElPopover>>("popoverRef");

// 原生 DOM
const iframeRef = useTemplateRef<HTMLIFrameElement>("iframeRef");
</script>
```

```vue
<script setup lang="ts">
// ❌ 省略泛型，实例方法无类型提示
const queryRef = useTemplateRef("queryRef");

// ❌ 穿透子组件内部 ref
const form = basicInfo.value?.$refs.formRef;

// ❌ 穿透子组件根 DOM
const list = uploadRef.value?.$el?.querySelector(".el-upload-list");

// ✅ 子组件通过 defineExpose 暴露能力，父组件直接调用
await basicInfo.value?.validate();

// ✅ 根 DOM ref + querySelector（ref 绑定包裹层或组件根容器）
const uploadRootRef = useTemplateRef<HTMLElement>("uploadRootRef");
const listEl = uploadRootRef.value?.querySelector(".el-upload-list");
</script>
```

### 双向绑定（defineModel）

- 默认 v-model（`modelValue` / `update:modelValue`）使用 `defineModel<T>()`
- 命名 v-model（如 `v-model:visible`、`v-model:show-search`）使用 `defineModel<T>('visible')` 等，**name 与 prop 的 camelCase 一致**（模板中写 kebab-case 即可）
- 迁移后从 `Props` / `Emits` 中移除对应的 prop 与 `update:*` 事件；仅保留真正的单向 prop 与非 v-model 事件
- `defineModel` 通过 auto-import 注入，**禁止**手动 `import { defineModel } from 'vue'`

```vue
<script setup lang="ts">
// ❌ 冗余：props + emit + computed 包装
interface Props {
  visible?: boolean;
}
interface Emits {
  (e: "update:visible", value: boolean): void;
}
const props = withDefaults(defineProps<Props>(), { visible: false });
const emit = defineEmits<Emits>();
const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

// ✅ 推荐：defineModel
const visible = defineModel<boolean>("visible", { default: false });
</script>

<template>
  <el-dialog v-model="visible">...</el-dialog>
</template>
```

```vue
<script setup lang="ts">
// ❌ 自定义事件 camelCase（ESLint 报错）
const emit = defineEmits<{ (e: "queryTable"): void }>();
emit("queryTable");

// ✅ kebab-case
const emit = defineEmits<{ (e: "query-table"): void }>();
emit("query-table");
</script>
```

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

- 目录名：**PascalCase**，以 `index.vue` 作为组件入口
- 分类前缀：
  - **非业务型**：`Com` 开头（通用 UI 组件，PascalCase 目录）
  - **业务型**：`Biz` 开头（跨页面复用的业务组件，PascalCase 目录）
- 同级目录可放置 `types.d.ts`、`useXxx.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 通过 `unplugin-vue-components` 自动引入，**禁止手动 import**

```
src/components/
├── ComHelloCard/            # 非业务型公共组件
│   ├── index.vue
│   └── types.ts
└── BizUserCard/             # 业务型公共组件
    ├── index.vue
    ├── types.ts
    └── constants.ts
```

自动引入后组件名与目录名一致（PascalCase），如 `ComHelloCard` 目录 → `<ComHelloCard />`。

### 页面组件（`src/views/`）

- 目录名：**kebab-case**，以 `index.vue` 作为页面入口
- 同级目录可放置 `types.d.ts`、`useXxx.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 页面私有子组件放 `components/` 子目录，文件名 **PascalCase**，在页面中**手动 import**

```
src/views/
├── system/
│   ├── index.vue
│   ├── helpers.ts            # 辅助函数
│   ├── constants.ts          # 常量定义
│   ├── types.d.ts            # 类型定义
│   ├── components/           # PascalCase，手动引入
│   └── styles/               # _mixins.scss、_tokens.scss
└── monitor/
    ├── index.vue
    ├── helpers.ts          # 辅助函数
    ├── constants.ts          # 常量定义
    ├── types.d.ts            # 类型定义
    └── components/           # PascalCase，手动引入
```

### 布局组件（`src/layouts/`）

- 目录名：**PascalCase**，以 `index.vue` 作为布局入口
- 同级目录可放置 `types.d.ts`、`useXxx.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- 布局私有子组件放 `components/` 子目录，文件名 **PascalCase**，在布局中**手动 import**
- 在 `App.vue` 或路由配置中**手动 import** 布局组件

```
src/layouts/
└── AdminLayout/
    ├── index.vue
    └── components/
```

## 静态资源（`src/assets`）

页面、布局、组件使用的静态媒体文件**统一**放在 `src/assets/`，按媒体类型分子目录（详见 `.claude/rules/ai-frontend-design.md`）：

| 目录      | 用途                              |
| --------- | --------------------------------- |
| `icons/`  | SVG 图标（`<SvgIcon />`，见下节） |
| `images/` | 位图、装饰性 SVG、插图            |
| `fonts/`  | 自托管字体                        |
| `videos/` | 视频                              |
| `audio/`  | 音频                              |

- 可在各类型下按页面/功能建 kebab-case 子目录
- 引用使用 `@/assets/...` 或 `import x from '@/assets/...'`（由 Vite 打包）

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

### Storage

#### 底层封装（`src/utils/storage.ts`）

- 导出 `storage.local`（`localStorage`）与 `storage.session`（`sessionStorage`）
- 逻辑 key 应遵循 **UPPER_SNAKE_CASE**（如 `ACCESS_TOKEN`、`LOCALE`、`PINIA_APP`），不符合时在控制台 `console.warn`
- 物理 key = 前缀 `VUE_ELEMENT_TEMPLATE_` + 逻辑 key
- 方法：`get<T>(key, defaultValue?)`、`set<T>(key, value)`、`remove(key)`、`clear()`、`toStorageLike()`
- `get` / `set` 均支持泛型，`set` 写入时自动 `JSON.stringify`，`get` 读取时自动 `JSON.parse`
- **允许**直接 import `storage` 的位置：`src/utils/` 业务封装文件、`src/stores/persisted-state.ts`
- **禁止**在业务代码、composables、`src/stores/modules/` 中直接 import `storage`

#### 业务封装

每种缓存场景单独文件，导出 key 常量与读写方法（箭头函数，无 `Stored` 修饰词）：

| 文件                        | 方法                                       | key                                     |
| --------------------------- | ------------------------------------------ | --------------------------------------- |
| `utils/auth.ts`             | `getToken` / `setToken` / `removeToken`    | `ACCESS_TOKEN`、`REFRESH_TOKEN`（常量） |
| `utils/locale.ts`           | `getLocale` / `setLocale` / `removeLocale` | `LOCALE`                                |
| `stores/persisted-state.ts` | `getPiniaPersistKey` / `persistedState`    | `PINIA_{STORE_ID}`（如 `PINIA_APP`）    |

```typescript
// src/utils/locale.ts
export const LOCALE_KEY = "LOCALE";

export const getLocale = () => storage.local.get<Locale>(LOCALE_KEY);
export const setLocale = (locale: Locale) => storage.local.set<Locale>(LOCALE_KEY, locale);
export const removeLocale = () => storage.local.remove(LOCALE_KEY);
```

业务代码调用封装方法，**禁止**直接使用 `localStorage`、`sessionStorage`、`useLocalStorage` 或底层 `storage`：

```typescript
import { getToken, setToken } from "@/utils/auth";
import { getLocale, setLocale } from "@/utils/locale";

setToken("xxx");
setLocale("zh-CN");
```

`useLocale` composable 内部通过 `setLocale as setLocaleCache` 调用 `utils/locale.ts`，避免与 composable 导出方法同名冲突。

### @vueuse/core

`@vueuse/core` 导出的组合式函数（如 `useDebounceFn`）已 auto-import，**禁止**手动 import。持久化场景请使用 `@/utils/auth`、`@/utils/locale` 等封装，**禁止** `useLocalStorage` 或直接操作浏览器 Storage。

### vue-i18n

- 语言包放 `src/i18n/locales/`，以 `zh-CN.json` 为类型基准（`src/i18n/types.ts`）
- `useI18n()` 已 auto-import，**禁止**手动 import
- 切换语言使用 `useLocale()` composable，内部调用 `src/utils/locale.ts` 持久化并同步 Element Plus locale
- 路由标题使用 `meta.titleKey`，在 `router.afterEach` 中通过 `i18n.global.t()` 设置 `document.title`（进入目标页后）；切换语言由 `App.vue` 监听 locale 同步
- 用户可见文案**禁止硬编码**，统一使用 `t('key')`

```vue
<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <p>{{ t("home.description") }}</p>
</template>
```

```vue
<script setup lang="ts">
const { hasPermission } = usePermission();
</script>

<template>
  <el-button v-permission="'demo:edit'">编辑</el-button>
</template>
```

### Composables（`src/composables/`）

- 文件名：**camelCase**，以 `use` 开头，如 `useLocale.ts`、`useCounter.ts`
- 导出：统一使用箭头函数 `export const useXxx = () => { ... }`
- 通过 `unplugin-auto-import` 自动引入，**禁止**手动 import

```typescript
// ❌ 不要这样做
import { useLocale } from "@/composables/useLocale";

// ✅ 直接使用（auto-import 已配置）
const { setLocale } = useLocale();
```

```typescript
// src/composables/useCounter.ts
export const useCounter = () => {
  const count = ref(0);

  const increment = () => {
    count.value += 1;
  };

  return { count, increment };
};
```

## 自动引入

### unplugin-auto-import

以下 API **禁止手动 import**：

```typescript
// ❌ 不要这样做
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useAppStore } from "@/stores/modules/app";
import { useCounter } from "@/composables/useCounter";
import { useLocalStorage } from "@vueuse/core";
import dayjs from "dayjs";

// ✅ 直接使用（auto-import 已配置）
const count = ref(0);
const router = useRouter();
const { t } = useI18n();
const appStore = useAppStore();
const { hasPermission } = usePermission();
const today = dayjs().format("YYYY-MM-DD");

// ✅ 缓存读写使用封装方法（手动 import）
import { setLocale } from "@/utils/locale";
setLocale("zh-CN");
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
import ComHelloCard from "@/components/ComHelloCard/index.vue";
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
- 同级目录的 `types.d.ts`、`useXxx.ts`、`constants.ts`、`helpers.ts` 等辅助文件
- `main.ts`、`router/index.ts` 等模块初始化文件

```vue
<!-- 页面私有子组件：手动引入 -->
<script setup lang="ts">
import TechStackTable from "./components/TechStackTable.vue";
import { TECH_STACK } from "./constants";
</script>
```

## Pinia Store

- 使用 Setup Store 风格（`defineStore` + 箭头函数）
- Store 模块放 `src/stores/modules/`，文件名 **kebab-case**
- 导出命名：`useXxxStore`（camelCase，use 前缀），与文件名语义对应
- 持久化插件配置：`src/stores/persisted-state.ts`（含 `getPiniaPersistKey`、`persistedState`，非 Store 模块）
- 跨 Store 引用在 setup 函数内完成，避免循环依赖
- 持久化使用 [pinia-plugin-persistedstate](https://github.com/prazdevs/pinia-plugin-persistedstate)，在 `main.ts` 注册
- 需持久化的 Store 在 `defineStore` 第三参数配置 `persist`；临时状态（如 `loading`）用 `pick` / `omit` 排除

```
src/stores/
├── persisted-state.ts       # 持久化插件 + getPiniaPersistKey
└── modules/
```

```typescript
// src/stores/modules/app.ts
export const useAppStore = defineStore(
  "app",
  () => {
    const loading = ref(false);
    const title = ref("");

    const setTitle = (value: string) => {
      title.value = value;
    };

    return { loading, title, setTitle };
  },
  {
    persist: {
      pick: ["title"],
    },
  }
);
```

## 命名约定

| 类型                   | 目录/文件规范                              | 示例                                                    |
| ---------------------- | ------------------------------------------ | ------------------------------------------------------- |
| 非业务公共组件         | PascalCase 目录 + `index.vue`，`Com` 前缀  | `components/ComPageHeader/index.vue`                    |
| 业务公共组件           | PascalCase 目录 + `index.vue`，`Biz` 前缀  | `components/BizOrderCard/index.vue`                     |
| 页面                   | kebab-case 目录 + `index.vue`              | `views/home/index.vue`                                  |
| 页面/布局私有子组件    | PascalCase `.vue`，放 `components/` 子目录 | `views/home/components/TechStackTable.vue`              |
| 布局                   | PascalCase 目录 + `index.vue`              | `layouts/AdminLayout/index.vue`                         |
| 辅助文件               | camelCase 或语义化命名，与组件同级         | `types.d.ts`、`useXxx.ts`、`constants.ts`、`helpers.ts` |
| Composable             | camelCase 文件名，use 前缀，箭头函数导出   | `composables/useLocale.ts`                              |
| Store 模块             | kebab-case 文件名，use 前缀箭头函数导出    | `stores/modules/permission.ts` → `usePermissionStore`   |
| 常量                   | UPPER_SNAKE_CASE                           | `API_BASE_URL`                                          |
| 工具函数               | camelCase，箭头函数                        | `formatDate` → `const formatDate = () => {}`            |
| 组件/composable 内方法 | camelCase，箭头函数                        | `const handleSubmit = () => {}`                         |

## CSS 类名

BEM 为主，SMACSS `l-*` 布局、OOCSS token 分肤，scoped 内 `@apply` 收敛 UnoCSS。完整约定见 `.claude/rules/css-naming.md`。

## UI 设计

UI 页面/组件的设计、Pencil 稿、audit/polish 流程见 `.claude/rules/ai-frontend-design.md`。

## 注释

- 代码应自解释，仅在复杂业务逻辑处添加注释
- 不使用 obvious 注释（如 `// 获取用户`）
- TODO 注释格式：`// TODO: 描述`
