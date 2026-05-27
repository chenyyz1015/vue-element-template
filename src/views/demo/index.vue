<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";
import { DEMO_STACK_BADGES, DEMO_STEP_KEYS } from "./constants";

const router = useRouter();
const { t } = useI18n();

const steps = computed(() =>
  DEMO_STEP_KEYS.map((key, index) => ({
    key,
    step: index + 1,
    title: t(`demo.steps.${key}.title`),
    description: t(`demo.steps.${key}.description`),
  }))
);

const goToAbout = () => {
  router.push("/about");
};
</script>

<template>
  <DevToolsLayout>
    <section class="relative overflow-hidden px-4 pb-12 lg:px-6">
      <div
        class="pointer-events-none absolute left-1/2 top-0 h-80 w-80 rounded-full from-[#22C55E]/10 to-transparent bg-gradient-to-br blur-3xl -translate-x-1/2"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-4xl text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 border border-[#334155] rounded-full bg-[#1E293B] px-4 py-1.5 text-sm text-[#22C55E] font-mono"
        >
          <el-icon><Monitor /></el-icon>
          {{ t("demo.eyebrow") }}
        </div>

        <h1
          class="devtools-heading mb-4 text-3xl text-[#F8FAFC] font-bold lg:text-5xl"
        >
          {{ t("demo.title") }}
        </h1>
        <p
          class="mx-auto mb-8 max-w-2xl text-[#94A3B8] leading-relaxed lg:text-lg"
        >
          {{ t("demo.subtitle") }}
        </p>

        <div
          class="mx-auto mb-10 max-w-xl flex items-center justify-center gap-3 border border-[#22C55E]/30 rounded-xl bg-[#22C55E]/10 px-5 py-4 text-left"
        >
          <el-icon class="shrink-0 text-xl text-[#22C55E]"
            ><CircleCheck
          /></el-icon>
          <div>
            <p class="text-sm text-[#22C55E] font-semibold">
              {{ t("demo.statusTitle") }}
            </p>
            <p class="text-sm text-[#94A3B8]">
              {{ t("demo.statusMessage") }}
            </p>
          </div>
        </div>

        <div class="flex flex-wrap items-center justify-center gap-3">
          <span
            v-for="badge in DEMO_STACK_BADGES"
            :key="badge"
            class="border border-[#334155] rounded-lg bg-[#1E293B] px-3 py-1.5 text-sm text-[#94A3B8] font-medium font-mono"
          >
            {{ badge }}
          </span>
        </div>
      </div>
    </section>

    <section class="px-4 py-16 lg:px-6 lg:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <p
            class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
          >
            {{ t("demo.quickStart.eyebrow") }}
          </p>
          <h2
            class="devtools-heading text-2xl text-[#F8FAFC] font-bold lg:text-3xl"
          >
            {{ t("demo.quickStart.title") }}
          </h2>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="item in steps"
            :key="item.key"
            class="border border-[#334155] rounded-xl bg-[#1E293B] p-6 transition-all duration-200 hover:border-[#22C55E]/40"
          >
            <span
              class="devtools-heading mb-4 h-10 w-10 flex-center border border-[#334155] rounded-lg bg-[#0F172A] text-lg text-[#22C55E] font-bold font-mono"
            >
              {{ item.step }}
            </span>
            <h3
              class="devtools-heading mb-2 text-lg text-[#F8FAFC] font-semibold"
            >
              {{ item.title }}
            </h3>
            <p class="text-sm text-[#94A3B8] leading-relaxed">
              {{ item.description }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="px-4 pb-20 lg:px-6 lg:pb-28">
      <div
        class="mx-auto max-w-4xl overflow-hidden border border-[#334155] rounded-2xl from-[#1E293B] to-[#0F172A] bg-gradient-to-br px-6 py-12 text-center lg:px-12"
      >
        <h2
          class="devtools-heading mb-3 text-2xl text-[#F8FAFC] font-bold lg:text-3xl"
        >
          {{ t("demo.cta.title") }}
        </h2>
        <p class="mx-auto mb-6 max-w-lg text-[#94A3B8] leading-relaxed">
          {{ t("demo.cta.subtitle") }}
        </p>
        <el-button
          size="large"
          class="!h-12 !border-none !bg-[#22C55E] !px-8 !text-base !text-[#0F172A] hover:!opacity-90"
          @click="goToAbout"
        >
          {{ t("demo.cta.button") }}
          <el-icon class="ml-1"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </DevToolsLayout>
</template>

<style lang="scss" scoped></style>
