<script setup lang="ts">
import type { DevToolsFeatureKey } from "../constants";
import {
  DEVTOOLS_FEATURE_ICON_MAP,
  DEVTOOLS_FEATURE_KEYS,
  DEVTOOLS_SECTION_IDS,
} from "../constants";

const { t } = useI18n();

const features = computed(() =>
  DEVTOOLS_FEATURE_KEYS.map((key) => ({
    key,
    icon: DEVTOOLS_FEATURE_ICON_MAP[key as DevToolsFeatureKey],
    title: t(`devtools.features.items.${key}.title`),
    description: t(`devtools.features.items.${key}.description`),
  }))
);
</script>

<template>
  <section
    :id="DEVTOOLS_SECTION_IDS.features"
    class="px-4 py-20 lg:px-6 lg:py-28"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-14 text-center">
        <p
          class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
        >
          {{ t("devtools.features.eyebrow") }}
        </p>
        <h2
          class="devtools-heading mb-4 text-3xl text-[#F8FAFC] font-bold lg:text-4xl"
        >
          {{ t("devtools.features.title") }}
        </h2>
        <p class="mx-auto max-w-2xl text-[#94A3B8] leading-relaxed">
          {{ t("devtools.features.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 md:grid-cols-2">
        <article
          v-for="feature in features"
          :key="feature.key"
          class="group border border-[#334155] rounded-xl bg-[#1E293B] p-6 transition-all duration-200 hover:border-[#22C55E]/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.08)]"
        >
          <div
            class="mb-4 h-10 w-10 flex-center border border-[#334155] rounded-lg bg-[#0F172A] text-sm text-[#22C55E] font-mono transition-colors duration-200 group-hover:border-[#22C55E]/50"
          >
            {{ feature.icon }}
          </div>
          <h3
            class="devtools-heading mb-2 text-lg text-[#F8FAFC] font-semibold"
          >
            {{ feature.title }}
          </h3>
          <p class="text-sm text-[#94A3B8] leading-relaxed">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
