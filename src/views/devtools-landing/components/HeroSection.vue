<script setup lang="ts">
import CodePreview from "./CodePreview.vue";

const router = useRouter();
const { t } = useI18n();

const goToDemo = () => {
  router.push("/demo");
};

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
};
</script>

<template>
  <section
    id="hero"
    class="relative overflow-hidden px-4 pb-16 lg:px-6 lg:pb-24"
  >
    <div
      class="pointer-events-none absolute left-1/2 top-0 h-96 w-96 rounded-full from-[#22C55E]/10 to-transparent bg-gradient-to-br blur-3xl -translate-x-1/2"
      aria-hidden="true"
    />
    <div
      class="pointer-events-none absolute right-0 top-1/4 h-64 w-64 rounded-full from-[#82AAFF]/10 to-transparent bg-gradient-to-bl blur-3xl"
      aria-hidden="true"
    />

    <div class="relative mx-auto max-w-6xl">
      <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <div
            class="mb-6 inline-flex items-center gap-2 border border-[#334155] rounded-full bg-[#1E293B] px-4 py-1.5 text-sm text-[#22C55E] font-mono"
          >
            <span class="h-2 w-2 animate-pulse rounded-full bg-[#22C55E]" />
            {{ t("devtools.hero.badge") }}
          </div>

          <h1
            class="devtools-heading mb-4 text-4xl text-[#F8FAFC] font-bold leading-tight lg:text-5xl"
          >
            {{ t("devtools.hero.title") }}
            <span class="text-[#22C55E]">{{
              t("devtools.hero.titleAccent")
            }}</span>
          </h1>

          <p class="mb-8 max-w-lg text-[#94A3B8] leading-relaxed lg:text-lg">
            {{ t("devtools.hero.subtitle") }}
          </p>

          <div class="flex flex-wrap gap-4">
            <el-button
              size="large"
              class="!h-12 !border-none !bg-[#22C55E] !px-8 !text-base !text-[#0F172A] hover:!opacity-90"
              @click="goToDemo"
            >
              {{ t("devtools.hero.ctaPrimary") }}
              <el-icon class="ml-1"><ArrowRight /></el-icon>
            </el-button>
            <el-button
              size="large"
              class="!h-12 !border-[#334155] !bg-transparent !px-8 !text-base !text-[#F8FAFC] hover:!border-[#22C55E] hover:!text-[#22C55E]"
              @click="openDocs"
            >
              {{ t("devtools.hero.ctaDocs") }}
              <el-icon class="ml-1"><Document /></el-icon>
            </el-button>
          </div>
        </div>

        <CodePreview />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
