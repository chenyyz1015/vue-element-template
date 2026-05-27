<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";
import TechStackTable from "./components/TechStackTable.vue";
import { TECH_STACK } from "./constants";

const { t } = useI18n();
</script>

<template>
  <DefaultLayout>
    <div class="mx-auto max-w-2xl">
      <el-card shadow="hover">
        <template #header>
          <span class="font-medium">{{ t("about.title") }}</span>
        </template>

        <p class="mb-4 text-gray-600">
          {{ t("about.description") }}
        </p>

        <TechStackTable :data="TECH_STACK" />
      </el-card>
    </div>
  </DefaultLayout>
</template>

<style lang="scss" scoped></style>
