<script setup lang="ts">
import type { ComparisonColumn } from "../constants";
import {
  COMPARISON_COLUMNS,
  COMPARISON_ROW_KEYS,
  LANDING_SECTION_IDS,
} from "../constants";

const { t } = useI18n();

const columns = computed(() =>
  COMPARISON_COLUMNS.map((key) => ({
    key,
    label: t(`landing.compare.columns.${key}`),
    highlighted: key === "template",
  }))
);

const rows = computed(() =>
  COMPARISON_ROW_KEYS.map((key) => ({
    key,
    label: t(`landing.compare.rows.${key}`),
    values: COMPARISON_COLUMNS.reduce(
      (acc, col) => {
        acc[col] = t(`landing.compare.values.${key}.${col}`);
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
  <section :id="LANDING_SECTION_IDS.compare" class="compare l-section">
    <div class="compare__inner l-container">
      <header class="compare__header l-section-header">
        <p class="compare__eyebrow">
          {{ t("landing.compare.eyebrow") }}
        </p>
        <h2 class="compare__title">
          {{ t("landing.compare.title") }}
        </h2>
        <p class="compare__subtitle">
          {{ t("landing.compare.subtitle") }}
        </p>
      </header>

      <div class="compare-table">
        <table class="compare-table__table">
          <thead>
            <tr class="compare-table__head-row">
              <th class="compare-table__head-feature" scope="col">
                {{ t("landing.compare.featureCol") }}
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

  border-color: var(--dl-border, #{$dl-border});
  background-color: var(--dl-surface, #{$dl-surface});

  &__table {
    @apply min-w-160 w-full border-collapse text-left text-sm;
  }

  &__head-row {
    @apply border-b;

    border-color: var(--dl-border, #{$dl-border});
  }

  &__head-feature {
    @apply px-4 py-4 font-medium;

    color: var(--dl-text-muted, #{$dl-text-muted});
  }

  &__head-col {
    @apply px-4 py-4 font-semibold;

    color: var(--dl-text, #{$dl-text});

    &--highlighted {
      background-color: color-mix(in srgb, var(--dl-accent) 12%, transparent);
      color: var(--dl-accent);
    }
  }

  &__row {
    @apply border-b transition-colors duration-200 last:border-b-0;

    border-color: var(--dl-border, #{$dl-border});

    &:hover {
      background-color: var(--dl-hover, rgb(0 0 0 / 3%));
    }

    &--even {
      background-color: var(--dl-bg, #{$dl-bg});
    }

    &--odd {
      background-color: var(--dl-surface, #{$dl-surface});
    }
  }

  &__feature {
    @apply px-4 py-3.5 font-medium;

    color: var(--dl-text, #{$dl-text});
  }

  &__cell {
    @apply px-4 py-3.5 text-center font-mono;

    &--col-highlighted {
      background-color: color-mix(in srgb, var(--dl-accent) 8%, transparent);
    }

    &--yes {
      color: var(--dl-accent, #{$dl-accent});
    }

    &--yes-highlight {
      @apply font-semibold;

      color: var(--dl-accent, #{$dl-accent});
    }

    &--partial {
      color: var(--dl-accent-hover);
    }

    &--no {
      color: var(--dl-text-dim, #{$dl-text-dim});
    }

    &--text {
      color: var(--dl-text-muted, #{$dl-text-muted});
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
