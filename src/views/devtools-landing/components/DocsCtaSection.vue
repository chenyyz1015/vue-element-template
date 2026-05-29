<script setup lang="ts">
const router = useRouter();
const { t } = useI18n();

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
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
        {{ t("devtools.docsCta.title") }}
      </h2>
      <p class="docs-cta__subtitle">
        {{ t("devtools.docsCta.subtitle") }}
      </p>
      <div class="docs-cta__actions">
        <el-button
          size="large"
          class="docs-cta__cta docs-cta__cta--primary"
          @click="openDocs"
        >
          {{ t("devtools.docsCta.docsButton") }}
          <el-icon class="docs-cta__cta-icon"><Link /></el-icon>
        </el-button>
        <el-button
          size="large"
          class="docs-cta__cta docs-cta__cta--ghost"
          @click="goToDemo"
        >
          {{ t("devtools.docsCta.demoButton") }}
        </el-button>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../styles/mixins" as *;

.docs-cta {
  &__panel {
    @apply overflow-hidden rounded-2xl border bg-gradient-to-br p-8 text-center lg:p-12;

    border-color: $dl-border;
    background-image: linear-gradient(to bottom right, $dl-surface, $dl-bg);
  }

  &__icon-wrap {
    @apply mx-auto mb-6 h-14 w-14 flex-center rounded-xl border text-2xl;

    border-color: rgb(34 197 94 / 30%);
    background-color: rgb(34 197 94 / 10%);
    color: $dl-accent;
  }

  &__title {
    @include dl-heading-md;
  }

  &__subtitle {
    @apply mx-auto mb-8 max-w-lg leading-relaxed;

    color: $dl-text-muted;
  }

  &__actions {
    @apply flex flex-wrap items-center justify-center gap-4;
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
  @apply px-4 pb-20 lg:px-6 lg:pb-28;
}

.l-container-narrow {
  @include l-container-narrow;
}
</style>
