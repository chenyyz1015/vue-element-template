<script setup lang="ts">
import { DEVTOOLS_SECTION_IDS, INTEGRATION_ITEMS } from "../constants";

const { t } = useI18n();
</script>

<template>
  <section
    :id="DEVTOOLS_SECTION_IDS.integrations"
    class="integrations l-section"
  >
    <div class="integrations__inner l-container">
      <header class="integrations__header l-section-header">
        <p class="integrations__eyebrow">
          {{ t("devtools.integrations.eyebrow") }}
        </p>
        <h2 class="integrations__title">
          {{ t("devtools.integrations.title") }}
        </h2>
        <p class="integrations__subtitle">
          {{ t("devtools.integrations.subtitle") }}
        </p>
      </header>

      <div class="integrations__grid l-grid l-grid--integrations">
        <div
          v-for="item in INTEGRATION_ITEMS"
          :key="item.id"
          class="integrations__item"
        >
          <div
            class="integrations__item-logo"
            :style="{
              backgroundColor: `${item.color}18`,
              color: item.color,
              border: `1px solid ${item.color}40`,
            }"
            aria-hidden="true"
          >
            {{ item.label.charAt(0) }}
          </div>
          <span class="integrations__item-label">{{ item.label }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.integrations {
  &__eyebrow {
    @include dl-eyebrow;
  }

  &__title {
    @include dl-heading-lg;
  }

  &__subtitle {
    @include dl-subtitle;
  }

  &__grid {
    @apply grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5;
  }

  &__item {
    @apply flex cursor-default flex-col items-center gap-3 rounded-xl border p-5 transition-all duration-200;

    border-color: $dl-border;
    background-color: $dl-surface;

    &:hover {
      background-color: rgb(51 65 85 / 30%);
    }
  }

  &__item-logo {
    @apply h-12 w-12 flex-center rounded-lg text-lg font-bold transition-transform duration-200;

    .integrations__item:hover & {
      @apply scale-105;
    }
  }

  &__item-label {
    @apply text-sm font-medium;

    color: $dl-text;
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
