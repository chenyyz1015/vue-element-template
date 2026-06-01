<script setup lang="ts">
const { t } = useI18n();
const { primaryColor, presetColors, setPrimaryColor } = useThemeColor();
</script>

<template>
  <section class="demo-section l-section">
    <div class="demo-section__inner l-container">
      <header class="demo-section__header l-section-header">
        <p class="demo-section__eyebrow">{{ t("demo.colorDemo.eyebrow") }}</p>
        <h2 class="demo-section__title">{{ t("demo.colorDemo.title") }}</h2>
        <p class="demo-section__subtitle">{{ t("demo.colorDemo.subtitle") }}</p>
      </header>

      <div class="demo-panel">
        <p class="demo-panel__label">{{ t("demo.colorDemo.current") }}</p>
        <div
          class="demo-panel__swatch"
          :style="{ backgroundColor: primaryColor }"
        />
        <p class="demo-panel__hex">{{ primaryColor }}</p>
        <div class="demo-panel__presets">
          <button
            v-for="preset in presetColors"
            :key="preset.name"
            type="button"
            class="demo-panel__preset"
            :class="{
              'demo-panel__preset--active': preset.value === primaryColor,
            }"
            :style="{ backgroundColor: preset.value }"
            :title="preset.name"
            @click="setPrimaryColor(preset.value)"
          />
        </div>
        <el-button type="primary" class="demo-panel__btn">{{
          t("demo.componentsDemo.sampleButton")
        }}</el-button>
        <div class="demo-panel__content-primary" aria-hidden="true" />
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
  @apply mx-auto flex max-w-xl flex-col items-center p-8;

  &__label {
    @include dl-body-sm;
    @apply mb-3;
  }

  &__swatch {
    @apply mb-2 h-12 w-12 rounded-lg border;

    border-color: var(--dl-border);
  }

  &__hex {
    @apply mb-6 font-mono text-sm;

    color: var(--dl-text);
  }

  &__presets {
    @apply mb-6 grid grid-cols-6 gap-2;
  }

  &__preset {
    @apply h-8 w-8 cursor-pointer rounded-md border-2 border-transparent p-0 transition-transform duration-150;

    &:hover {
      transform: scale(1.06);
    }

    &--active {
      border-color: var(--dl-text);
    }
  }

  &__content-primary {
    @apply mt-6 h-1 w-full rounded-full;

    background-color: var(--dl-primary);
  }

  &__btn {
    @apply min-w-32;
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
