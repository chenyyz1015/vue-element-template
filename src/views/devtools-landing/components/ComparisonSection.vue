<script setup lang="ts">
import type { ComparisonColumn } from "../constants";
import {
  COMPARISON_COLUMNS,
  COMPARISON_ROW_KEYS,
  DEVTOOLS_SECTION_IDS,
} from "../constants";

const { t } = useI18n();

const columns = computed(() =>
  COMPARISON_COLUMNS.map((key) => ({
    key,
    label: t(`devtools.compare.columns.${key}`),
    highlighted: key === "template",
  }))
);

const rows = computed(() =>
  COMPARISON_ROW_KEYS.map((key) => ({
    key,
    label: t(`devtools.compare.rows.${key}`),
    values: COMPARISON_COLUMNS.reduce(
      (acc, col) => {
        acc[col] = t(`devtools.compare.values.${key}.${col}`);
        return acc;
      },
      {} as Record<ComparisonColumn, string>
    ),
  }))
);

const isCheck = (value: string) => value === "yes" || value === "partial";

const cellDisplay = (value: string) => {
  if (value === "yes") return "✓";
  if (value === "no") return "—";
  if (value === "partial") return "~";
  return value;
};

const cellClass = (value: string, highlighted: boolean) => {
  if (value === "yes")
    return highlighted ? "text-[#22C55E] font-semibold" : "text-[#4ADE80]";
  if (value === "partial") return "text-[#FFCB6B]";
  if (value === "no") return "text-[#64748B]";
  return "text-[#94A3B8]";
};
</script>

<template>
  <section
    :id="DEVTOOLS_SECTION_IDS.compare"
    class="px-4 py-20 lg:px-6 lg:py-28"
  >
    <div class="mx-auto max-w-6xl">
      <div class="mb-14 text-center">
        <p
          class="mb-3 text-sm text-[#22C55E] font-semibold tracking-wide font-mono uppercase"
        >
          {{ t("devtools.compare.eyebrow") }}
        </p>
        <h2
          class="devtools-heading mb-4 text-3xl text-[#F8FAFC] font-bold lg:text-4xl"
        >
          {{ t("devtools.compare.title") }}
        </h2>
        <p class="mx-auto max-w-2xl text-[#94A3B8] leading-relaxed">
          {{ t("devtools.compare.subtitle") }}
        </p>
      </div>

      <div
        class="overflow-x-auto border border-[#334155] rounded-xl bg-[#1E293B]"
      >
        <table class="min-w-160 w-full border-collapse text-left text-sm">
          <thead>
            <tr class="border-b border-[#334155]">
              <th class="px-4 py-4 text-[#94A3B8] font-medium" scope="col">
                {{ t("devtools.compare.featureCol") }}
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                class="px-4 py-4 font-semibold"
                :class="
                  col.highlighted
                    ? 'bg-[#22C55E]/10 text-[#22C55E]'
                    : 'text-[#F8FAFC]'
                "
                scope="col"
              >
                {{ col.label }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(row, index) in rows"
              :key="row.key"
              class="border-b border-[#334155] transition-colors duration-200 last:border-b-0 hover:bg-[#0F172A]/50"
              :class="index % 2 === 0 ? 'bg-[#1E293B]' : 'bg-[#1E293B]/80'"
            >
              <th class="px-4 py-3.5 text-[#F8FAFC] font-medium" scope="row">
                {{ row.label }}
              </th>
              <td
                v-for="col in columns"
                :key="col.key"
                class="px-4 py-3.5 text-center font-mono"
                :class="[
                  cellClass(
                    row.values[col.key as ComparisonColumn],
                    col.highlighted
                  ),
                  col.highlighted ? 'bg-[#22C55E]/5' : '',
                ]"
              >
                <span
                  v-if="isCheck(row.values[col.key as ComparisonColumn])"
                  :aria-label="row.values[col.key as ComparisonColumn]"
                >
                  {{ cellDisplay(row.values[col.key as ComparisonColumn]) }}
                </span>
                <span v-else>{{
                  row.values[col.key as ComparisonColumn]
                }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped></style>
