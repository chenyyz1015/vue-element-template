<script setup lang="ts">
const { t, locale } = useI18n();
const { setLocale } = useLocale();
</script>

<template>
  <section class="demo-section l-section">
    <div class="demo-section__inner l-container">
      <header class="demo-section__header l-section-header">
        <p class="demo-section__eyebrow">{{ t("demo.i18nDemo.eyebrow") }}</p>
        <h2 class="demo-section__title">{{ t("demo.i18nDemo.title") }}</h2>
        <p class="demo-section__subtitle">{{ t("demo.i18nDemo.subtitle") }}</p>
      </header>

      <div class="demo-panel">
        <p class="demo-panel__label">{{ t("demo.i18nDemo.sampleTitle") }}</p>
        <div class="demo-panel__row">
          <el-button type="primary">{{
            t("demo.i18nDemo.sampleButton")
          }}</el-button>
          <el-tag>{{ t("demo.i18nDemo.sampleTag") }}</el-tag>
        </div>
        <p class="demo-panel__meta">locale: {{ locale }}</p>
        <div class="demo-panel__actions">
          <el-button @click="setLocale('zh-CN')">中文</el-button>
          <el-button @click="setLocale('en-US')">English</el-button>
        </div>
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

  &__subtitle {
    @include dl-subtitle;
  }
}

.demo-panel {
  @include dl-surface-card;
  @apply mx-auto max-w-xl p-8 text-center;

  &__label {
    @include dl-body-sm;
    @apply mb-4;
  }

  &__meta {
    @apply mb-4 font-mono text-xs;

    color: var(--dl-text-dim);
  }

  &__row {
    @apply mb-4 flex flex-wrap items-center justify-center gap-3;
  }

  &__actions {
    @apply flex justify-center gap-3;
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
