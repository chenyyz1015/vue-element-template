<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
};

const goToDemo = () => {
  router.push("/demo");
};
</script>

<template>
  <section class="px-4 pb-20 lg:px-6 lg:pb-28">
    <div
      class="mx-auto max-w-4xl overflow-hidden border border-[#334155] rounded-2xl from-[#1E293B] to-[#0F172A] bg-gradient-to-br p-8 text-center lg:p-12"
    >
      <div
        class="mx-auto mb-6 h-14 w-14 flex-center border border-[#22C55E]/30 rounded-xl bg-[#22C55E]/10 text-2xl text-[#22C55E]"
      >
        <el-icon :size="28"><Document /></el-icon>
      </div>
      <h2
        class="devtools-heading mb-3 text-2xl text-[#F8FAFC] font-bold lg:text-3xl"
      >
        {{ t("devtools.docsCta.title") }}
      </h2>
      <p class="mx-auto mb-8 max-w-lg text-[#94A3B8] leading-relaxed">
        {{ t("devtools.docsCta.subtitle") }}
      </p>
      <div class="flex flex-wrap items-center justify-center gap-4">
        <el-button
          size="large"
          class="!h-12 !border-none !bg-[#22C55E] !px-8 !text-base !text-[#0F172A] hover:!opacity-90"
          @click="openDocs"
        >
          {{ t("devtools.docsCta.docsButton") }}
          <el-icon class="ml-1"><Link /></el-icon>
        </el-button>
        <el-button
          size="large"
          class="!h-12 !border-[#334155] !bg-transparent !px-8 !text-base !text-[#F8FAFC] hover:!border-[#22C55E] hover:!text-[#22C55E]"
          @click="goToDemo"
        >
          {{ t("devtools.docsCta.demoButton") }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
