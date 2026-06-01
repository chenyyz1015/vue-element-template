<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section class="demo-hero l-section">
    <div class="demo-hero__inner l-container-narrow">
      <p class="demo-hero__eyebrow">{{ t("demo.eyebrow") }}</p>
      <h1 class="demo-hero__title">{{ t("demo.title") }}</h1>
      <p class="demo-hero__subtitle">{{ t("demo.subtitle") }}</p>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../../landing/styles/mixins" as *;

.demo-hero {
  @apply pb-12 pt-8;

  &__eyebrow {
    @include dl-eyebrow;

    text-align: center;
  }

  &__title {
    @include dl-heading-lg;

    text-align: center;
  }

  &__subtitle {
    @include dl-subtitle;
  }
}

.l-container-narrow {
  @include l-container-narrow;
}
</style>
