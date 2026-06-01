<script setup lang="ts">
import DefaultFooter from "./components/DefaultFooter.vue";
import DefaultNav from "./components/DefaultNav.vue";
</script>

<template>
  <div class="default-layout">
    <DefaultNav />
    <main class="default-layout__main">
      <slot />
    </main>
    <DefaultFooter />
  </div>
</template>

<style lang="scss" scoped>
.default-layout {
  min-height: 100vh;
  font-family: var(--dl-font-body);
  background-color: var(--dl-bg);
  color: var(--dl-text);

  &__main {
    @apply pt-20;
  }

  :deep(.landing-heading) {
    font-family: var(--dl-font-heading);
  }

  :deep(.syn-keyword) {
    color: #c792ea;
  }

  :deep(.syn-string) {
    color: #c3e88d;
  }

  :deep(.syn-function) {
    color: #82aaff;
  }

  :deep(.syn-comment) {
    color: #546e7a;
  }

  :deep(.syn-number) {
    color: #f78c6c;
  }

  :deep(.syn-operator) {
    color: #89ddff;
  }

  :deep(.syn-property) {
    color: #eff;
  }

  :deep(.syn-punctuation) {
    color: #89ddff;
  }

  :deep(.syn-builtin) {
    color: #ffcb6b;
  }
}
</style>
