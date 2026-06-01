<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push("/");
};

const goBack = () => {
  router.back();
};
</script>

<template>
  <DefaultLayout>
    <section class="error-page l-section">
      <p class="error-page__code error-page__code--accent">403</p>
      <h1 class="error-page__title">{{ t("forbidden.title") }}</h1>
      <p class="error-page__desc">{{ t("forbidden.description") }}</p>
      <div class="error-page__actions">
        <el-button class="error-page__btn" @click="goHome">
          {{ t("forbidden.backHome") }}
        </el-button>
        <el-button
          class="error-page__btn error-page__btn--ghost"
          @click="goBack"
        >
          {{ t("forbidden.goBack") }}
        </el-button>
      </div>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.error-page {
  @apply mx-auto max-w-lg py-24 text-center;

  &__code {
    @include dl-error-code;

    &--accent {
      @include dl-error-code-accent;
    }
  }

  &__title {
    @include dl-heading-md;

    text-align: center;
  }

  &__desc {
    @include dl-subtitle;
    @apply mb-8;
  }

  &__actions {
    @apply flex flex-wrap items-center justify-center gap-3;
  }

  &__btn {
    @include dl-btn-primary;

    &--ghost {
      @include dl-btn-ghost;
    }
  }
}

.l-section {
  @apply px-4 lg:px-6;
}
</style>
