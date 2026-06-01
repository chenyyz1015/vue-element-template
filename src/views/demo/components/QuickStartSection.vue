<script setup lang="ts">
import { DEMO_STEP_KEYS } from "../constants";

const { t } = useI18n();

const steps = computed(() =>
  DEMO_STEP_KEYS.map((key, index) => ({
    key,
    step: index + 1,
    title: t(`demo.steps.${key}.title`),
    description: t(`demo.steps.${key}.description`),
  }))
);
</script>

<template>
  <section class="demo-section l-section">
    <div class="demo-section__inner l-container">
      <header class="demo-section__header l-section-header">
        <p class="demo-section__eyebrow">{{ t("demo.quickStart.eyebrow") }}</p>
        <h2 class="demo-section__title">{{ t("demo.quickStart.title") }}</h2>
      </header>

      <div class="demo-steps">
        <article v-for="item in steps" :key="item.key" class="demo-steps__card">
          <span class="demo-steps__num">{{ item.step }}</span>
          <h3 class="demo-steps__title">{{ item.title }}</h3>
          <p class="demo-steps__desc">{{ item.description }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../landing/styles/mixins" as *;

.demo-section {
  @include dl-section-surface;

  &__eyebrow {
    @include dl-eyebrow;
  }

  &__title {
    @include dl-heading-lg;
  }
}

.demo-steps {
  @apply grid grid-cols-1 gap-6 md:grid-cols-3;

  &__card {
    @include dl-surface-card;
    @apply p-6;
  }

  &__num {
    @apply mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg border font-[Fira_Code,monospace] text-lg font-bold;

    border-color: var(--dl-border);
    background-color: var(--dl-surface);
    color: var(--dl-text);
  }

  &__title {
    @include dl-heading-sm;
  }

  &__desc {
    @include dl-body-sm;
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
