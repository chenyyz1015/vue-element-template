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
  <section :id="DEVTOOLS_SECTION_IDS.features" class="features l-section">
    <div class="features__inner l-container">
      <header class="features__header l-section-header">
        <p class="features__eyebrow">
          {{ t("devtools.features.eyebrow") }}
        </p>
        <h2 class="features__title">
          {{ t("devtools.features.title") }}
        </h2>
        <p class="features__subtitle">
          {{ t("devtools.features.subtitle") }}
        </p>
      </header>

      <div class="features__grid l-grid l-grid--features">
        <article
          v-for="feature in features"
          :key="feature.key"
          class="features__card"
        >
          <div class="features__card-icon" aria-hidden="true">
            {{ feature.icon }}
          </div>
          <h3 class="features__card-title">
            {{ feature.title }}
          </h3>
          <p class="features__card-desc">
            {{ feature.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.features {
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
    @apply grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3;
  }

  &__card {
    @include dl-surface-card;
    @apply group p-6 hover:border-[#22C55E]/50 hover:shadow-[0_0_24px_rgba(34,197,94,0.08)];
  }

  &__card-icon {
    @apply mb-4 h-10 w-10 flex-center rounded-lg border text-sm font-mono transition-colors duration-200;

    border-color: $dl-border;
    background-color: $dl-bg;
    color: $dl-accent;

    .features__card:hover & {
      border-color: rgb(34 197 94 / 50%);
    }
  }

  &__card-title {
    @include dl-heading-sm;
  }

  &__card-desc {
    @apply text-sm leading-relaxed;

    color: $dl-text-muted;
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
