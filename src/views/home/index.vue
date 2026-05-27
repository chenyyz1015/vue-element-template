<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";

const { t } = useI18n();

onMounted(() => {
  ElMessage.success(t("home.startupSuccess"));
});
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-2xl">
      <ComHelloCard
        :title="t('app.title')"
        :description="t('home.description')"
      >
        <template #header>
          <div class="flex-between">
            <span class="font-medium">{{ t("app.title") }}</span>
            <el-tag type="success">
              {{ t("home.tag") }}
            </el-tag>
          </div>
        </template>
      </ComHelloCard>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped></style>
