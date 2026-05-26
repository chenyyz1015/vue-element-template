<script setup lang="ts">
import type { TechItem } from "../constants";

defineProps<{
  data: TechItem[];
}>();
</script>

<template>
  <el-table :data="data" stripe>
    <el-table-column prop="name" label="技术" width="140" />
    <el-table-column prop="desc" label="说明" />
  </el-table>
</template>

<style lang="scss" scoped></style>
