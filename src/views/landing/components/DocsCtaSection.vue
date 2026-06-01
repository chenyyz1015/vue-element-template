<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();

const openDocs = () => {
  window.open(import.meta.env.VITE_GITHUB_URL, "_blank", "noopener,noreferrer");
};

const goToDemo = () => {
  router.push("/demo");
};
</script>

<template>
  <section class="docs-cta l-section">
    <div class="docs-cta__panel l-container-narrow">
      <div class="docs-cta__icon-wrap" aria-hidden="true">
        <el-icon :size="28"><Document /></el-icon>
      </div>
      <h2 class="docs-cta__title">
        {{ t("landing.docsCta.title") }}
      </h2>
      <p class="docs-cta__subtitle">
        {{ t("landing.docsCta.subtitle") }}
      </p>
      <div class="docs-cta__actions">
        <el-button
          size="large"
          class="docs-cta__cta docs-cta__cta--primary"
          @click="openDocs"
        >
          {{ t("landing.docsCta.docsButton") }}
          <el-icon class="docs-cta__cta-icon"><Link /></el-icon>
        </el-button>
        <el-button
          size="large"
          class="docs-cta__cta docs-cta__cta--ghost"
          @click="goToDemo"
        >
          {{ t("landing.docsCta.demoButton") }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.docs-cta {
  &__panel {
    @apply overflow-hidden rounded-2xl border p-8 text-center lg:p-12;

    border-color: color-mix(in srgb, var(--dl-accent) 30%, transparent);
    background-color: var(--dl-accent);
  }

  &__icon-wrap {
    @apply mx-auto mb-6 h-14 w-14 flex-center rounded-xl border text-2xl;

    border-color: rgb(255 255 255 / 30%);
    background-color: rgb(255 255 255 / 15%);
    color: #fff;
  }

  &__title {
    @include dl-heading-md;

    color: #fff;
  }

  &__subtitle {
    @apply mx-auto mb-8 max-w-lg leading-relaxed;

    color: rgb(255 255 255 / 85%);
  }

  &__actions {
    @apply flex flex-wrap items-center justify-center gap-4;
  }

  &__cta-icon {
    @apply ml-1;
  }

  &__cta--primary {
    height: 2.5rem !important;
    padding-inline: 1.75rem !important;
    border: none !important;
    border-radius: 9999px !important;
    background-color: var(--dl-cta) !important;
    color: var(--dl-bg) !important;
  }

  &__cta--ghost {
    height: 2.5rem !important;
    padding-inline: 1.75rem !important;
    border-radius: 9999px !important;
    border: 1px solid rgb(255 255 255 / 40%) !important;
    background-color: transparent !important;
    color: #fff !important;

    &:hover {
      background-color: rgb(255 255 255 / 10%) !important;
    }
  }
}

.l-section {
  @apply px-4 pb-20 lg:px-6 lg:pb-28;
}

.l-container-narrow {
  @include l-container-narrow;
}
</style>
