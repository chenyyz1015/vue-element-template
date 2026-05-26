<script setup lang="ts">
import TechStackTable from "./components/TechStackTable.vue";
import { TECH_STACK } from "./constants";
</script>

<template>
  <div class="mx-auto max-w-2xl">
    <el-card shadow="hover">
      <template #header>
        <span class="font-medium">关于项目</span>
      </template>

      <p class="mb-4 text-gray-600">
        本项目是一个开箱即用的 Vue 3 企业级前端模板，集成了 AI
        开发工具配置（Claude Code / Cursor）。
      </p>

      <TechStackTable :data="TECH_STACK" />
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
