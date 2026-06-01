<script setup lang="ts">
import CodePreview from "./CodePreview.vue";

const router = useRouter();
const { t } = useI18n();

const goToDemo = () => {
  router.push("/demo");
};

const openDocs = () => {
  window.open(import.meta.env.VITE_GITHUB_URL, "_blank", "noopener,noreferrer");
};
</script>

<template>
  <section id="hero" class="hero l-section">
    <div class="hero__inner l-container">
      <div class="hero__grid l-grid l-grid--hero">
        <div class="hero__content">
          <div class="hero__badge">
            <span class="hero__badge-dot" />
            {{ t("landing.hero.badge") }}
          </div>

          <h1 class="hero__title">
            {{ t("landing.hero.title") }}
            <span class="hero__title-accent">{{
              t("landing.hero.titleAccent")
            }}</span>
          </h1>

          <p class="hero__subtitle">
            {{ t("landing.hero.subtitle") }}
          </p>

          <div class="hero__actions">
            <el-button
              size="large"
              class="hero__cta hero__cta--primary"
              @click="goToDemo"
            >
              {{ t("landing.hero.ctaPrimary") }}
              <el-icon class="hero__cta-icon"><ArrowRight /></el-icon>
            </el-button>
            <el-button
              size="large"
              class="hero__cta hero__cta--ghost"
              @click="openDocs"
            >
              {{ t("landing.hero.ctaDocs") }}
              <el-icon class="hero__cta-icon"><Document /></el-icon>
            </el-button>
          </div>
        </div>

        <CodePreview />
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.hero {
  @apply relative overflow-hidden pb-16 lg:pb-24;

  &__inner {
    @apply relative;
  }

  &__grid {
    @apply grid grid-cols-1 items-center gap-12 lg:grid-cols-2;
  }

  &__badge {
    @apply mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm;

    font-family: $dl-body-font;
    border-color: var(--dl-accent-border, #{$dl-accent-border});
    background-color: var(--dl-accent-soft, #{$dl-accent-soft});
    color: var(--dl-accent-hover, #{$dl-accent-hover});
  }

  &__badge-dot {
    @apply h-1.5 w-1.5 rounded-full;

    background-color: var(--dl-accent, #{$dl-accent});
  }

  &__title {
    @apply mb-4 text-4xl font-bold leading-tight lg:text-5xl;

    font-family: $dl-heading-font;
    color: var(--dl-text, #{$dl-text});
  }

  &__title-accent {
    color: var(--dl-text, #{$dl-text});
  }

  &__subtitle {
    @apply mb-8 max-w-lg leading-relaxed lg:text-lg;

    color: var(--dl-text-muted, #{$dl-text-muted});
  }

  &__actions {
    @apply flex flex-wrap gap-4;
  }

  &__cta-icon {
    @apply ml-1;
  }

  &__cta--primary {
    @include dl-btn-primary;
  }

  &__cta--ghost {
    @include dl-btn-ghost;
  }
}

.l-section {
  @apply px-4 lg:px-6;
}

.l-container {
  @include l-container;
}
</style>
