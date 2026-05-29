<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <DevToolsLayout>
    <section class="mx-auto max-w-lg px-4 py-24 text-center">
      <p class="mb-2 text-6xl text-[#94A3B8] font-bold font-mono">404</p>
      <h1 class="devtools-heading mb-3 text-2xl text-[#F8FAFC] font-bold">
        {{ t("notFound.title") }}
      </h1>
      <p class="mb-8 text-[#94A3B8]">
        {{ t("notFound.description") }}
      </p>
      <el-button
        type="primary"
        class="!border-none !bg-[#22C55E] !text-[#0F172A]"
        @click="goHome"
      >
        {{ t("notFound.backHome") }}
      </el-button>
    </section>
  </DevToolsLayout>
</template>
