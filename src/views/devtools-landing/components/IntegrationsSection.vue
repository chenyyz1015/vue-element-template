<script setup lang="ts">
import { DEVTOOLS_SECTION_IDS, INTEGRATION_ITEMS } from "../constants";

const { t } = useI18n();
</script>

<template>
  <section
    :id="DEVTOOLS_SECTION_IDS.integrations"
    class="px-4 py-20 lg:px-6 lg:py-28"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-14 text-center">
        <p
          class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
        >
          {{ t("devtools.integrations.eyebrow") }}
        </p>
        <h2
          class="devtools-heading mb-4 text-3xl text-[#F8FAFC] font-bold lg:text-4xl"
        >
          {{ t("devtools.integrations.title") }}
        </h2>
        <p class="mx-auto max-w-2xl text-[#94A3B8] leading-relaxed">
          {{ t("devtools.integrations.subtitle") }}
        </p>
      </div>

      <div class="grid grid-cols-2 gap-4 lg:grid-cols-5 sm:grid-cols-3">
        <div
          v-for="item in INTEGRATION_ITEMS"
          :key="item.id"
          class="group flex flex-col cursor-default items-center gap-3 border border-[#334155] rounded-xl bg-[#1E293B] p-5 transition-all duration-200 hover:border-[#334155] hover:bg-[#334155]/30"
        >
          <div
            class="h-12 w-12 flex-center rounded-lg text-lg font-bold transition-transform duration-200 group-hover:scale-105"
            :style="{
              backgroundColor: `${item.color}18`,
              color: item.color,
              border: `1px solid ${item.color}40`,
            }"
            aria-hidden="true"
          >
            {{ item.label.charAt(0) }}
          </div>
          <span class="text-sm text-[#F8FAFC] font-medium">{{
            item.label
          }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
