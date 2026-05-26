<script setup lang="ts">
import type { ComHelloCardProps } from "./types";

defineProps<ComHelloCardProps>();
</script>

<template>
  <el-card shadow="hover">
    <template #header>
      <slot name="header">
        <span class="font-medium">{{ title }}</span>
      </slot>
    </template>
    <p v-if="description" class="mb-4 text-gray-600">
      {{ description }}
    </p>
    <slot />
  </el-card>
</template>

<style lang="scss" scoped></style>
