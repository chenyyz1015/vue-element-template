<script setup lang="ts">
import { TECH_STACK_KEYS } from "../constants";

const { t } = useI18n();

const items = computed(() =>
  TECH_STACK_KEYS.map((key) => ({
    key,
    name: t(`about.techStack.items.${key}.name`),
    description: t(`about.techStack.items.${key}.description`),
  }))
);
</script>

<template>
  <div class="tech-stack">
    <article v-for="item in items" :key="item.key" class="tech-stack__card">
      <div class="tech-stack__card-head">
        <span class="tech-stack__icon" aria-hidden="true">
          {{ item.name.charAt(0) }}
        </span>
        <h3 class="tech-stack__name">{{ item.name }}</h3>
      </div>
      <p class="tech-stack__desc">{{ item.description }}</p>
    </article>
  </div>
</template>

<style lang="scss" scoped>
@use "../../landing/styles/mixins" as *;

.tech-stack {
  @apply grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3;

  &__card {
    @include dl-surface-card;
    @apply p-5 transition-colors duration-200;

    &:hover {
      border-color: color-mix(in srgb, var(--dl-accent) 40%, var(--dl-border));
    }
  }

  &__card-head {
    @apply mb-3 flex items-center gap-3;
  }

  &__icon {
    @apply h-9 w-9 flex-center rounded-lg border text-sm font-bold font-mono;

    border-color: var(--dl-border);
    background-color: var(--dl-surface);
    color: var(--dl-accent);
  }

  &__name {
    @include dl-heading-sm;
    @apply mb-0 text-base;
  }

  &__desc {
    @include dl-body-sm;
  }
}
</style>
