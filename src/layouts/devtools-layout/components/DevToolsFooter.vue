<script setup lang="ts">
const { t } = useI18n();
const currentYear = new Date().getFullYear();

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
};
</script>

<template>
  <footer
    id="docs"
    class="border-t border-[#334155] bg-[#1E293B] px-4 py-12 lg:px-6"
  >
    <div class="mx-auto max-w-6xl">
      <div
        class="mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
      >
        <div class="flex items-center gap-2">
          <span
            class="h-8 w-8 flex-center border border-[#334155] rounded-lg bg-[#0F172A] text-sm text-[#22C55E] font-bold font-mono"
          >
            &gt;_
          </span>
          <span class="devtools-heading text-[#F8FAFC] font-semibold">
            {{ t("devtools.brand") }}
          </span>
        </div>
        <button
          type="button"
          class="cursor-pointer border-none bg-transparent text-sm text-[#22C55E] underline-offset-4 transition-colors duration-200 hover:text-[#4ADE80] hover:underline"
          @click="openDocs"
        >
          {{ t("devtools.footer.docsLink") }} →
        </button>
      </div>
      <div
        class="flex flex-col items-center justify-between gap-4 border-t border-[#334155] pt-8 md:flex-row"
      >
        <p class="text-sm text-[#94A3B8]">
          {{ t("devtools.footer.copyright", { year: currentYear }) }}
        </p>
        <p class="text-sm text-[#64748B]">
          {{ t("devtools.footer.tagline") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped></style>
