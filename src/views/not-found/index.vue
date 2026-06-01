<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";

const router = useRouter();
const { t } = useI18n();

const goHome = () => {
  router.push("/");
};
</script>

<template>
  <DefaultLayout>
    <section class="error-page l-section">
      <p class="error-page__code">404</p>
      <h1 class="error-page__title">{{ t("notFound.title") }}</h1>
      <p class="error-page__desc">{{ t("notFound.description") }}</p>
      <el-button class="error-page__btn" @click="goHome">
        {{ t("notFound.backHome") }}
      </el-button>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.error-page {
  @apply mx-auto max-w-lg py-24 text-center;

  &__code {
    @include dl-error-code;
  }

  &__title {
    @include dl-heading-md;

    text-align: center;
  }

  &__desc {
    @include dl-subtitle;
    @apply mb-8;
  }

  &__btn {
    @include dl-btn-primary;
  }
}

.l-section {
  @apply px-4 lg:px-6;
}
</style>
