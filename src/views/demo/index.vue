<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";
import ComponentsDemoSection from "./components/ComponentsDemoSection.vue";
import DemoHero from "./components/DemoHero.vue";
import I18nDemoSection from "./components/I18nDemoSection.vue";
import QuickStartSection from "./components/QuickStartSection.vue";
import ThemeColorSection from "./components/ThemeColorSection.vue";
import ThemeDemoSection from "./components/ThemeDemoSection.vue";

const router = useRouter();
const { t } = useI18n();

const goToAbout = () => {
  router.push("/about");
};
</script>

<template>
  <DefaultLayout>
    <DemoHero />
    <ThemeDemoSection />
    <ThemeColorSection />
    <I18nDemoSection />
    <ComponentsDemoSection />
    <QuickStartSection />

    <section class="demo-cta l-section">
      <div class="demo-cta__panel l-container-narrow">
        <h2 class="demo-cta__title">{{ t("demo.cta.title") }}</h2>
        <p class="demo-cta__subtitle">{{ t("demo.cta.subtitle") }}</p>
        <el-button size="large" class="demo-cta__btn" @click="goToAbout">
          {{ t("demo.cta.button") }}
          <el-icon class="ml-1"><ArrowRight /></el-icon>
        </el-button>
      </div>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.demo-cta {
  @apply pb-20;

  &__panel {
    @include dl-surface-card;
    @apply rounded-2xl p-8 text-center lg:p-12;
  }

  &__title {
    @include dl-heading-md;
  }

  &__subtitle {
    @include dl-subtitle;
    @apply mb-6;
  }

  &__btn {
    @include dl-btn-primary;

    height: 3rem !important;
  }
}

.l-section {
  @apply px-4 lg:px-6;
}

.l-container-narrow {
  @include l-container-narrow;
}
</style>
