<script setup lang="ts">
const { t } = useI18n();
const { mode, isDark, toggleMode } = useThemeMode();
</script>

<template>
  <section class="demo-section l-section">
    <div class="demo-section__inner l-container">
      <header class="demo-section__header l-section-header">
        <p class="demo-section__eyebrow">{{ t("demo.themeDemo.eyebrow") }}</p>
        <h2 class="demo-section__title">{{ t("demo.themeDemo.title") }}</h2>
        <p class="demo-section__subtitle">{{ t("demo.themeDemo.subtitle") }}</p>
      </header>

      <div class="demo-panel">
        <p class="demo-panel__status">
          {{ t("demo.themeDemo.current", { mode: isDark ? "dark" : "light" }) }}
        </p>
        <p class="demo-panel__hint">{{ t("demo.themeDemo.hint") }}</p>
        <el-button type="primary" @click="toggleMode()">
          {{ isDark ? t("nav.themeModeLight") : t("nav.themeModeDark") }}
        </el-button>
        <p class="demo-panel__meta">mode: {{ mode }}</p>
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

  &__status {
    @apply mb-2 font-[Rubik,sans-serif] text-lg font-semibold;

    font-family: var(--dl-font-body);
    color: var(--dl-text);
  }

  &__hint {
    @apply mb-6 text-sm;

    font-family: var(--dl-font-body);
    color: var(--dl-text-muted);
  }

  &__meta {
    @apply mt-4 font-mono text-xs;

    color: var(--dl-text-dim);
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
