<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";
import ComparisonSection from "./components/ComparisonSection.vue";
import DocsCtaSection from "./components/DocsCtaSection.vue";
import FeaturesSection from "./components/FeaturesSection.vue";
import HeroSection from "./components/HeroSection.vue";
import IntegrationsSection from "./components/IntegrationsSection.vue";
</script>

<template>
  <DevToolsLayout>
    <HeroSection />
    <FeaturesSection />
    <ComparisonSection />
    <IntegrationsSection />
    <DocsCtaSection />
  </DevToolsLayout>
</template>

<style lang="scss" scoped></style>
