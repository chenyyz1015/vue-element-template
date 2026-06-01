<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";
import ComparisonSection from "./components/ComparisonSection.vue";
import DocsCtaSection from "./components/DocsCtaSection.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import HeroSection from "./components/HeroSection.vue";
import IntegrationsSection from "./components/IntegrationsSection.vue";
</script>

<template>
  <DefaultLayout>
    <HeroSection />
    <FeaturesSection />
    <ComparisonSection />
    <IntegrationsSection />
    <DocsCtaSection />
  </DefaultLayout>
</template>

<style lang="scss" scoped></style>
