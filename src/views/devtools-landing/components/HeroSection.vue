<script setup lang="ts">
import CodePreview from "./CodePreview.vue";

const router = useRouter();
const { t } = useI18n();

const goToDemo = () => {
  router.push("/demo");
};

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
};
</script>

<template>
  <section id="hero" class="hero l-section">
    <div class="hero__glow hero__glow--center" aria-hidden="true" />
    <div class="hero__glow hero__glow--right" aria-hidden="true" />

    <div class="hero__inner l-container">
      <div class="hero__grid l-grid l-grid--hero">
        <div class="hero__content">
          <div class="hero__badge">
            <span class="hero__badge-dot" />
            {{ t("devtools.hero.badge") }}
          </div>

          <h1 class="hero__title">
            {{ t("devtools.hero.title") }}
            <span class="hero__title-accent">{{
              t("devtools.hero.titleAccent")
            }}</span>
          </h1>

          <p class="hero__subtitle">
            {{ t("devtools.hero.subtitle") }}
          </p>

          <div class="hero__actions">
            <el-button
              size="large"
              class="hero__cta hero__cta--primary"
              @click="goToDemo"
            >
              {{ t("devtools.hero.ctaPrimary") }}
              <el-icon class="hero__cta-icon"><ArrowRight /></el-icon>
            </el-button>
            <el-button
              size="large"
              class="hero__cta hero__cta--ghost"
              @click="openDocs"
            >
              {{ t("devtools.hero.ctaDocs") }}
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

  &__glow {
    @apply pointer-events-none absolute rounded-full bg-gradient-to-br blur-3xl;

    &--center {
      @apply left-1/2 top-0 h-96 w-96 -translate-x-1/2 from-[#22C55E]/10 to-transparent;
    }

    &--right {
      @apply right-0 top-1/4 h-64 w-64 bg-gradient-to-bl from-[#82AAFF]/10 to-transparent;
    }
  }

  &__inner {
    @apply relative;
  }

  &__grid {
    @apply grid grid-cols-1 items-center gap-12 lg:grid-cols-2;
  }

  &__badge {
    @apply mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-mono;

    border-color: $dl-border;
    background-color: $dl-surface;
    color: $dl-accent;
  }

  &__badge-dot {
    @apply h-2 w-2 animate-pulse rounded-full;

    background-color: $dl-accent;
  }

  &__title {
    @apply mb-4 text-4xl font-bold leading-tight lg:text-5xl;

    font-family: $dl-heading-font;
    color: $dl-text;
  }

  &__title-accent {
    color: $dl-accent;
  }

  &__subtitle {
    @apply mb-8 max-w-lg leading-relaxed lg:text-lg;

    color: $dl-text-muted;
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
