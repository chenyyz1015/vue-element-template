<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";
import TechStackGrid from "./components/TechStackGrid.vue";
import { AI_TOOL_KEYS } from "./constants";

const router = useRouter();
const { t } = useI18n();

const aiTools = computed(() =>
  AI_TOOL_KEYS.map((key) => ({
    key,
    title: t(`about.aiTools.items.${key}.title`),
    description: t(`about.aiTools.items.${key}.description`),
  }))
);

const goToDemo = () => {
  router.push("/demo");
};

const openGithub = () => {
  window.open(import.meta.env.VITE_GITHUB_URL, "_blank", "noopener,noreferrer");
};
</script>

<template>
  <DefaultLayout>
    <section class="about-hero l-section">
      <div class="about-hero__inner l-container-narrow">
        <p class="about-hero__eyebrow">{{ t("about.eyebrow") }}</p>
        <h1 class="about-hero__title">{{ t("about.title") }}</h1>
        <p class="about-hero__subtitle">{{ t("about.description") }}</p>
      </div>
    </section>

    <section class="about-stack l-section">
      <div class="about-stack__inner l-container">
        <header class="about-stack__header l-section-header">
          <p class="about-stack__eyebrow">{{ t("about.techStack.eyebrow") }}</p>
          <h2 class="about-stack__title">{{ t("about.techStack.title") }}</h2>
          <p class="about-stack__subtitle">
            {{ t("about.techStack.subtitle") }}
          </p>
        </header>
        <TechStackGrid />
      </div>
    </section>

    <section class="about-ai l-section">
      <div class="about-ai__inner l-container">
        <header class="about-ai__header l-section-header">
          <p class="about-ai__eyebrow">{{ t("about.aiTools.eyebrow") }}</p>
          <h2 class="about-ai__title">{{ t("about.aiTools.title") }}</h2>
          <p class="about-ai__subtitle">{{ t("about.aiTools.subtitle") }}</p>
        </header>

        <div class="about-ai__grid">
          <article
            v-for="tool in aiTools"
            :key="tool.key"
            class="about-ai__card"
          >
            <div class="about-ai__card-icon" aria-hidden="true">
              <el-icon :size="22"><MagicStick /></el-icon>
            </div>
            <h3 class="about-ai__card-title">{{ tool.title }}</h3>
            <p class="about-ai__card-desc">{{ tool.description }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="about-cta l-section">
      <div class="about-cta__panel l-container-narrow">
        <h2 class="about-cta__title">{{ t("about.cta.title") }}</h2>
        <p class="about-cta__subtitle">{{ t("about.cta.subtitle") }}</p>
        <div class="about-cta__actions">
          <el-button size="large" class="about-cta__btn" @click="goToDemo">
            {{ t("about.cta.button") }}
            <el-icon class="ml-1"><ArrowRight /></el-icon>
          </el-button>
          <el-button
            size="large"
            class="about-cta__btn about-cta__btn--ghost"
            @click="openGithub"
          >
            GitHub
          </el-button>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.about-hero {
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

.about-stack {
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

.about-ai {
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
    @apply grid grid-cols-1 gap-6 md:grid-cols-3;
  }

  &__card {
    @include dl-surface-card;
    @apply group p-6 transition-shadow duration-200;

    &:hover {
      border-color: color-mix(in srgb, var(--dl-accent) 40%, var(--dl-border));
      box-shadow: 0 4px 24px
        color-mix(in srgb, var(--dl-accent) 8%, transparent);
    }
  }

  &__card-icon {
    @apply mb-4 h-12 w-12 flex-center rounded-xl border transition-colors duration-200;

    border-color: var(--dl-border);
    background-color: var(--dl-surface);
    color: var(--dl-accent);

    .about-ai__card:hover & {
      border-color: color-mix(in srgb, var(--dl-accent) 40%, var(--dl-border));
    }
  }

  &__card-title {
    @include dl-heading-sm;
  }

  &__card-desc {
    @include dl-body-sm;
  }
}

.about-cta {
  @apply pb-20;

  &__panel {
    @apply rounded-2xl border p-8 text-center lg:p-12;

    border-color: color-mix(in srgb, var(--dl-accent) 30%, transparent);
    background-color: var(--dl-accent);
  }

  &__title {
    @include dl-heading-md;

    color: #fff;
  }

  &__subtitle {
    @apply mx-auto mb-8 max-w-lg leading-relaxed;

    font-family: Rubik, sans-serif;
    color: rgb(255 255 255 / 85%);
  }

  &__actions {
    @apply flex flex-wrap items-center justify-center gap-4;
  }

  &__btn {
    @include dl-btn-primary;

    height: 3rem !important;

    &--ghost {
      height: 3rem !important;
      padding-inline: 1.75rem !important;
      border-radius: 9999px !important;
      border: 1px solid rgb(255 255 255 / 40%) !important;
      background-color: transparent !important;
      color: #fff !important;

      &:hover {
        background-color: rgb(255 255 255 / 10%) !important;
        opacity: 1 !important;
      }
    }
  }
}

.l-section {
  @include l-section;
}

.l-container {
  @include l-container;
}

.l-container-narrow {
  @include l-container-narrow;
}

.l-section-header {
  @include l-section-header;
}
</style>
