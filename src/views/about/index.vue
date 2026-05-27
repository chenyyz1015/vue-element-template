<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";
import TechStackGrid from "./components/TechStackGrid.vue";
import { AI_TOOL_KEYS } from "./constants";

const router = useRouter();
const { t } = useI18n();

const aiTools = computed(() =>
  AI_TOOL_KEYS.map((key) => ({
    key,
    title: t(`about.aiTools.items.${key}.title`),
    description: t(`about.aiTools.items.${key}.description`),
  }))
);

const goToDemo = () => {
  router.push("/demo");
};
</script>

<template>
  <DevToolsLayout>
    <section class="relative overflow-hidden px-4 pb-12 lg:px-6">
      <div
        class="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full from-[#82AAFF]/10 to-transparent bg-gradient-to-bl blur-3xl"
        aria-hidden="true"
      />

      <div class="relative mx-auto max-w-4xl text-center">
        <div
          class="mb-6 inline-flex items-center gap-2 border border-[#334155] rounded-full bg-[#1E293B] px-4 py-1.5 text-sm text-[#22C55E] font-mono"
        >
          <el-icon><InfoFilled /></el-icon>
          {{ t("about.eyebrow") }}
        </div>

        <h1
          class="devtools-heading mb-4 text-3xl text-[#F8FAFC] font-bold lg:text-5xl"
        >
          {{ t("about.title") }}
        </h1>
        <p class="mx-auto max-w-2xl text-[#94A3B8] leading-relaxed lg:text-lg">
          {{ t("about.description") }}
        </p>
      </div>
    </section>

    <section class="px-4 py-16 lg:px-6 lg:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <p
            class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
          >
            {{ t("about.techStack.eyebrow") }}
          </p>
          <h2
            class="devtools-heading text-2xl text-[#F8FAFC] font-bold lg:text-3xl"
          >
            {{ t("about.techStack.title") }}
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-[#94A3B8] leading-relaxed">
            {{ t("about.techStack.subtitle") }}
          </p>
        </div>

        <TechStackGrid />
      </div>
    </section>

    <section class="px-4 py-16 lg:px-6 lg:py-20">
      <div class="mx-auto max-w-6xl">
        <div class="mb-12 text-center">
          <p
            class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
          >
            {{ t("about.aiTools.eyebrow") }}
          </p>
          <h2
            class="devtools-heading text-2xl text-[#F8FAFC] font-bold lg:text-3xl"
          >
            {{ t("about.aiTools.title") }}
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-[#94A3B8] leading-relaxed">
            {{ t("about.aiTools.subtitle") }}
          </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3">
          <article
            v-for="tool in aiTools"
            :key="tool.key"
            class="group border border-[#334155] rounded-xl bg-[#1E293B] p-6 transition-all duration-200 hover:border-[#22C55E]/50"
          >
            <div
              class="mb-4 h-12 w-12 flex-center border border-[#334155] rounded-xl bg-[#0F172A] text-[#22C55E] transition-colors duration-200 group-hover:border-[#22C55E]/50 group-hover:text-[#4ADE80]"
            >
              <el-icon :size="22"><MagicStick /></el-icon>
            </div>
            <h3
              class="devtools-heading mb-2 text-lg text-[#F8FAFC] font-semibold"
            >
              {{ tool.title }}
            </h3>
            <p class="text-sm text-[#94A3B8] leading-relaxed">
              {{ tool.description }}
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
          {{ t("about.cta.title") }}
        </h2>
        <p class="mx-auto mb-6 max-w-lg text-[#94A3B8] leading-relaxed">
          {{ t("about.cta.subtitle") }}
        </p>
        <el-button
          size="large"
          class="!h-12 !border-none !bg-[#22C55E] !px-8 !text-base !text-[#0F172A] hover:!opacity-90"
          @click="goToDemo"
        >
          {{ t("about.cta.button") }}
          <el-icon class="ml-1"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </DevToolsLayout>
</template>

<style lang="scss" scoped></style>
