<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="demo-section l-section">
    <div class="demo-section__inner l-container">
      <header class="demo-section__header l-section-header">
        <p class="demo-section__eyebrow">
          {{ t("demo.componentsDemo.eyebrow") }}
        </p>
        <h2 class="demo-section__title">
          {{ t("demo.componentsDemo.title") }}
        </h2>
        <p class="demo-section__subtitle">
          {{ t("demo.componentsDemo.subtitle") }}
        </p>
      </header>

      <div class="demo-panel">
        <div class="demo-panel__grid">
          <el-button type="primary">{{
            t("demo.i18nDemo.sampleButton")
          }}</el-button>
          <el-button>{{ t("demo.i18nDemo.sampleTag") }}</el-button>
          <el-button type="success">Success</el-button>
          <el-button type="warning">Warning</el-button>
          <el-button type="danger">Danger</el-button>
          <el-input
            class="demo-panel__input"
            :placeholder="t('demo.componentsDemo.inputPlaceholder')"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../landing/styles/mixins" as *;

.demo-section {
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
  @apply mx-auto max-w-3xl p-8;

  &__grid {
    @apply flex flex-wrap items-center gap-3;
  }

  &__input {
    @apply min-w-48 flex-1;
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
