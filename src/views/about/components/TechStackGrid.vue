<script setup lang="ts">
import { TECH_STACK_KEYS } from "../constants";

const { t } = useI18n();

const items = computed(() =>
  TECH_STACK_KEYS.map((key) => ({
    key,
    name: t(`about.techStack.items.${key}.name`),
    description: t(`about.techStack.items.${key}.description`),
  }))
);
</script>

<template>
  <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
    <article
      v-for="item in items"
      :key="item.key"
      class="border border-[#334155] rounded-xl bg-[#1E293B] p-5 transition-all duration-200 hover:border-[#22C55E]/40"
    >
      <div class="mb-3 flex items-center gap-3">
        <span
          class="h-9 w-9 flex-center border border-[#334155] rounded-lg bg-[#0F172A] text-sm text-[#22C55E] font-bold font-mono"
        >
          {{ item.name.charAt(0) }}
        </span>
        <h3 class="devtools-heading text-base text-[#F8FAFC] font-semibold">
          {{ item.name }}
        </h3>
      </div>
      <p class="text-sm text-[#94A3B8] leading-relaxed">
        {{ item.description }}
      </p>
    </article>
  </div>
</template>

<style lang="scss" scoped></style>
