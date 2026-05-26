<script setup lang="ts">
const appStore = useAppStore();

onMounted(() => {
  ElMessage.success("启动成功！！");
});
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <ComHelloCard
      :title="appStore.title"
      description="基于 Vite + Vue 3 + TypeScript + Pinia + Element Plus + UnoCSS 的项目模板。"
    >
      <template #header>
        <div class="flex-between">
          <span class="font-medium">{{ appStore.title }}</span>
          <el-tag type="success"> Vue 3 + Element Plus </el-tag>
        </div>
      </template>
    </ComHelloCard>
  </div>
</template>

<style lang="scss" scoped></style>
