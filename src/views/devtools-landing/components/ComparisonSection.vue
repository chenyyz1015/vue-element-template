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

const cellModifier = (value: string, highlighted: boolean) => {
  if (value === "yes")
    return highlighted
      ? "compare-table__cell--yes-highlight"
      : "compare-table__cell--yes";
  if (value === "partial") return "compare-table__cell--partial";
  if (value === "no") return "compare-table__cell--no";
  return "compare-table__cell--text";
};
</script>

<template>
  <section :id="DEVTOOLS_SECTION_IDS.compare" class="compare l-section">
    <div class="compare__inner l-container">
      <header class="compare__header l-section-header">
        <p class="compare__eyebrow">
          {{ t("devtools.compare.eyebrow") }}
        </p>
        <h2 class="compare__title">
          {{ t("devtools.compare.title") }}
        </h2>
        <p class="compare__subtitle">
          {{ t("devtools.compare.subtitle") }}
        </p>
      </header>

      <div class="compare-table">
        <table class="compare-table__table">
          <thead>
            <tr class="compare-table__head-row">
              <th class="compare-table__head-feature" scope="col">
                {{ t("devtools.compare.featureCol") }}
              </th>
              <th
                v-for="col in columns"
                :key="col.key"
                class="compare-table__head-col"
                :class="{
                  'compare-table__head-col--highlighted': col.highlighted,
                }"
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
              class="compare-table__row"
              :class="{
                'compare-table__row--even': index % 2 === 0,
                'compare-table__row--odd': index % 2 !== 0,
              }"
            >
              <th class="compare-table__feature" scope="row">
                {{ row.label }}
              </th>
              <td
                v-for="col in columns"
                :key="col.key"
                class="compare-table__cell"
                :class="[
                  cellModifier(
                    row.values[col.key as ComparisonColumn],
                    col.highlighted
                  ),
                  {
                    'compare-table__cell--col-highlighted': col.highlighted,
                  },
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

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.compare {
  &__eyebrow {
    @include dl-eyebrow;
  }

  &__title {
    @include dl-heading-lg;
  }

  &__subtitle {
    @include dl-subtitle;
  }
}

.compare-table {
  @apply overflow-x-auto rounded-xl border;

  border-color: $dl-border;
  background-color: $dl-surface;

  &__table {
    @apply min-w-160 w-full border-collapse text-left text-sm;
  }

  &__head-row {
    @apply border-b;

    border-color: $dl-border;
  }

  &__head-feature {
    @apply px-4 py-4 font-medium;

    color: $dl-text-muted;
  }

  &__head-col {
    @apply px-4 py-4 font-semibold;

    color: $dl-text;

    &--highlighted {
      @apply bg-[#22C55E]/10;

      color: $dl-accent;
    }
  }

  &__row {
    @apply border-b transition-colors duration-200 last:border-b-0 hover:bg-[#0F172A]/50;

    border-color: $dl-border;

    &--even {
      background-color: $dl-surface;
    }

    &--odd {
      background-color: rgb(30 41 59 / 80%);
    }
  }

  &__feature {
    @apply px-4 py-3.5 font-medium;

    color: $dl-text;
  }

  &__cell {
    @apply px-4 py-3.5 text-center font-mono;

    &--col-highlighted {
      @apply bg-[#22C55E]/5;
    }

    &--yes {
      color: $dl-accent-hover;
    }

    &--yes-highlight {
      @apply font-semibold;

      color: $dl-accent;
    }

    &--partial {
      color: #ffcb6b;
    }

    &--no {
      color: $dl-text-dim;
    }

    &--text {
      color: $dl-text-muted;
    }
  }
}

.l-section {
  @include l-section;
}

.l-container {
  @include l-container;
}

.l-section-header {
  @include l-section-header;
}
</style>
