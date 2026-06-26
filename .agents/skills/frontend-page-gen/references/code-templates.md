# 代码模板

## 后台 CRUD 表格页

```vue
<script setup lang="ts">
import { getList, createItem, updateItem, deleteItem } from "@/api/modules/<module>";
import type { Item, QueryParams } from "@/api/types/<module>";
import type { FormInstance } from "element-plus";
import SearchBar from "./components/SearchBar.vue";
import EditDialog from "./components/EditDialog.vue";

const { t } = useI18n();
const loading = ref(false);
const list = ref<Item[]>([]);
const total = ref(0);
const queryParams = reactive<QueryParams>({ page: 1, size: 10 });
const dialogVisible = ref(false);
const currentItem = ref<Item | null>(null);

const fetchList = async () => {
  loading.value = true;
  try {
    const { data } = await getList(queryParams);
    list.value = data.list;
    total.value = data.total;
  } catch {
    // 统一错误已由拦截器处理
  } finally {
    loading.value = false;
  }
};

const handleSearch = () => {
  queryParams.page = 1;
  fetchList();
};

const handleReset = () => {
  Object.assign(queryParams, { page: 1, size: 10 });
  fetchList();
};

const handleCreate = () => {
  currentItem.value = null;
  dialogVisible.value = true;
};

const handleEdit = (row: Item) => {
  currentItem.value = { ...row };
  dialogVisible.value = true;
};

const handleDelete = async (id: number) => {
  try {
    await ElMessageBox.confirm(t("<module>.deleteConfirm"), t("common.tip"));
    await deleteItem(id);
    ElMessage.success(t("common.deleteSuccess"));
    fetchList();
  } catch {
    // 取消或接口失败
  }
};

const handleSubmit = async (form: Item) => {
  if (form.id) {
    await updateItem(form.id, form);
  } else {
    await createItem(form);
  }
  ElMessage.success(t("common.saveSuccess"));
  dialogVisible.value = false;
  fetchList();
};

const handleSizeChange = () => {
  queryParams.page = 1;
  fetchList();
};

const handlePageChange = () => {
  fetchList();
};

onMounted(() => {
  fetchList();
});
</script>

<template>
  <div class="<module>-page">
    <SearchBar @search="handleSearch" @reset="handleReset" />
    <div class="<module>-page__toolbar">
      <el-button type="primary" @click="handleCreate">
        {{ t("common.add") }}
      </el-button>
    </div>
    <el-table
      v-loading="loading"
      :data="list"
      border
      stripe
      class="<module>-page__table"
    >
      <el-table-column prop="id" label="ID" width="80" />
      <!-- 其他列 -->
      <el-table-column :label="t('common.action')" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">
            {{ t("common.edit") }}
          </el-button>
          <el-button link type="danger" @click="handleDelete(row.id)">
            {{ t("common.delete") }}
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty :description="t('common.noData')" />
      </template>
    </el-table>
    <el-pagination
      v-model:current-page="queryParams.page"
      v-model:page-size="queryParams.size"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      layout="total, sizes, prev, pager, next, jumper"
      class="<module>-page__pagination"
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
    />
    <EditDialog
      v-model:visible="dialogVisible"
      :item="currentItem"
      @submit="handleSubmit"
    />
  </div>
</template>

<style lang="scss" scoped>
.<module>-page {
  @apply p-4;

  &__toolbar {
    @apply mb-4;
  }

  &__table {
    @apply w-full;
  }

  &__pagination {
    @apply mt-4 flex justify-end;
  }
}
</style>
```

## 前台落地页

```vue
<script setup lang="ts">
import HeroSection from "./components/HeroSection.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import CTASection from "./components/CTASection.vue";
</script>

<template>
  <div class="landing-page">
    <HeroSection />
    <FeaturesSection />
    <CTASection />
  </div>
</template>

<style lang="scss" scoped>
.landing-page {
  // 各 Section 内部维护自身间距
}
</style>
```

## 表单弹窗子组件

```vue
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import type { Item } from "@/api/types/<module>";

const visible = defineModel<boolean>("visible", { default: false });
const { item } = defineProps<{ item: Item | null }>();
const emit = defineEmits<{ (e: "submit", form: Item): void }>();

const { t } = useI18n();
const formRef = useTemplateRef<FormInstance>("formRef");
const form = reactive<Item>({
  id: 0,
  name: "",
  // ...
});
const rules: FormRules = {
  name: [{ required: true, message: t("<module>.nameRequired"), trigger: "blur" }],
};

const submitting = ref(false);

const resetForm = () => {
  formRef.value?.resetFields();
  Object.assign(form, { id: 0, name: "" });
};

const handleConfirm = async () => {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;
  submitting.value = true;
  try {
    await emit("submit", { ...form });
    resetForm();
  } finally {
    submitting.value = false;
  }
};

const handleCancel = () => {
  resetForm();
  visible.value = false;
};

watch(visible, (val) => {
  if (val && item) {
    Object.assign(form, item);
  } else if (!val) {
    resetForm();
  }
});
</script>

<template>
  <el-dialog
    v-model="visible"
    :title="item?.id ? t('common.edit') : t('common.add')"
    width="600px"
    @close="handleCancel"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item :label="t('<module>.name')" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- 其他字段 -->
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">{{ t("common.cancel") }}</el-button>
      <el-button type="primary" :loading="submitting" @click="handleConfirm">
        {{ t("common.confirm") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
// 对话框内表单样式
</style>
```

## 搜索栏子组件

```vue
<script setup lang="ts">
import type { FormInstance } from "element-plus";
import type { QueryParams } from "@/api/types/<module>";

const emit = defineEmits<{ (e: "search"): void; (e: "reset"): void }>();

const { t } = useI18n();
const formRef = useTemplateRef<FormInstance>("formRef");
const form = reactive<Omit<QueryParams, "page" | "size">>({
  keyword: "",
});

const handleSearch = () => {
  emit("search");
};

const handleReset = () => {
  formRef.value?.resetFields();
  emit("reset");
};
</script>

<template>
  <el-form ref="formRef" :model="form" inline class="search-bar">
    <el-form-item :label="t('<module>.keyword')" prop="keyword">
      <el-input v-model="form.keyword" :placeholder="t('<module>.keywordPlaceholder')" clearable @keyup.enter="handleSearch" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">{{ t("common.search") }}</el-button>
      <el-button @click="handleReset">{{ t("common.reset") }}</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.search-bar {
  @apply mb-4;
}
</style>
```
