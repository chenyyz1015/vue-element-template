<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push("/");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <DevToolsLayout>
    <section class="mx-auto max-w-lg px-4 py-24 text-center">
      <p class="mb-2 text-6xl text-[#22C55E] font-bold font-mono">403</p>
      <h1 class="devtools-heading mb-3 text-2xl text-[#F8FAFC] font-bold">
        {{ t("forbidden.title") }}
      </h1>
      <p class="mb-8 text-[#94A3B8]">
        {{ t("forbidden.description") }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-3">
        <el-button
          type="primary"
          class="!border-none !bg-[#22C55E] !text-[#0F172A]"
          @click="goHome"
        >
          {{ t("forbidden.backHome") }}
        </el-button>
        <el-button @click="goBack">
          {{ t("forbidden.goBack") }}
        </el-button>
      </div>
    </section>
  </DevToolsLayout>
</template>
