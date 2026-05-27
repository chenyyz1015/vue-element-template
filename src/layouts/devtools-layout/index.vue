<script setup lang="ts">
import DevToolsFooter from "./components/DevToolsFooter.vue";
import DevToolsNav from "./components/DevToolsNav.vue";
</script>

<template>
  <div
    class="devtools-layout min-h-screen bg-[#0F172A] text-[#F8FAFC] font-[DM_Sans,sans-serif]"
  >
    <DevToolsNav />
    <main class="pt-24">
      <slot />
    </main>
    <DevToolsFooter />
  </div>
</template>

<style lang="scss" scoped>
.devtools-layout {
  :deep(.devtools-heading) {
    font-family: "Space Grotesk", sans-serif;
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
