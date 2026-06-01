<script setup lang="ts">
const { t } = useI18n();
const currentYear = new Date().getFullYear();

const openDocs = () => {
  window.open(import.meta.env.VITE_GITHUB_URL, "_blank", "noopener,noreferrer");
};
</script>

<template>
  <footer id="docs" class="site-footer">
    <div class="site-footer__inner l-container">
      <div class="site-footer__top">
        <div class="site-footer__brand">
          <span class="site-footer__logo" aria-hidden="true" />
          <span class="site-footer__name">{{ t("app.title") }}</span>
        </div>
        <button type="button" class="site-footer__link" @click="openDocs">
          {{ t("landing.footer.docsLink") }} →
        </button>
      </div>
      <div class="site-footer__bottom">
        <p class="site-footer__copy">
          {{ t("landing.footer.copyright", { year: currentYear }) }}
        </p>
        <p class="site-footer__tagline">
          {{ t("landing.footer.tagline") }}
        </p>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.site-footer {
  @apply border-t px-4 py-12 lg:px-6;

  border-color: var(--dl-border);
  background-color: var(--dl-surface);

  &__inner {
    @apply mx-auto max-w-[1440px];
  }

  &__top {
    @apply mb-8 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center;
  }

  &__brand {
    @apply flex items-center gap-2.5;
  }

  &__logo {
    @apply h-7 w-7 rounded-md;

    background-color: var(--dl-cta);
  }

  &__name {
    @apply text-base font-semibold;

    font-family: var(--dl-font-heading);
    color: var(--dl-text);
  }

  &__link {
    @apply cursor-pointer border-none bg-transparent text-sm underline-offset-4 transition-colors duration-200 hover:underline;

    font-family: var(--dl-font-body);
    color: var(--dl-text);

    &:hover {
      color: var(--dl-accent);
    }
  }

  &__bottom {
    @apply flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row;

    border-color: var(--dl-border);
  }

  &__copy {
    @apply text-sm;

    font-family: var(--dl-font-body);
    color: var(--dl-text-muted);
  }

  &__tagline {
    @apply text-sm;

    font-family: var(--dl-font-body);
    color: var(--dl-text-dim);
  }
}
</style>
