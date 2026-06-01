<script setup lang="ts">
import type { Locale } from "@/i18n/types";

interface NavLink { id: string; label: string }
interface RouteLink { path: string; label: string }
interface LocaleOption { readonly value: Locale; readonly label: string }

defineProps<{
  open: boolean;
  isHome: boolean;
  sectionLinks: NavLink[];
  routeLinks: RouteLink[];
  activePath: string;
  locale: Locale;
  localeOptions: readonly LocaleOption[];
}>();

const emit = defineEmits<{
  close: [];
  scrollSection: [id: string];
  navigate: [path: string];
  openDocs: [];
  goDemo: [];
  setLocale: [Locale];
}>();

const { t } = useI18n();
</script>

<template>
  <Teleport to="body">
    <Transition name="mobile-nav">
      <div
        v-if="open"
        id="site-header-mobile-nav"
        class="mobile-nav"
        @keydown.esc="emit('close')"
      >
        <button
          type="button"
          class="mobile-nav__backdrop"
          :aria-label="t('nav.closeMenu')"
          @click="emit('close')"
        />

        <aside
          class="mobile-nav__panel"
          role="dialog"
          aria-modal="true"
          :aria-label="t('nav.main')"
        >
          <div class="mobile-nav__header">
            <div>
              <p class="mobile-nav__eyebrow">MENU</p>
              <h2 class="mobile-nav__title">{{ t("nav.main") }}</h2>
            </div>
            <button
              type="button"
              class="mobile-nav__close"
              :aria-label="t('nav.closeMenu')"
              @click="emit('close')"
            >
              <el-icon :size="18"><Close /></el-icon>
            </button>
          </div>

          <nav class="mobile-nav__links" :aria-label="t('nav.main')">
            <template v-if="isHome">
              <button
                v-for="link in sectionLinks"
                :key="link.id"
                type="button"
                class="mobile-nav__link"
                @click="emit('scrollSection', link.id)"
              >
                {{ link.label }}
              </button>
            </template>
            <button
              v-for="link in routeLinks"
              :key="link.path"
              type="button"
              class="mobile-nav__link"
              :class="{ 'mobile-nav__link--active': activePath === link.path }"
              @click="emit('navigate', link.path)"
            >
              {{ link.label }}
            </button>
            <button
              type="button"
              class="mobile-nav__link"
              @click="emit('openDocs')"
            >
              {{ t("landing.nav.docs") }}
            </button>
            <button
              type="button"
              class="mobile-nav__link"
              @click="emit('openDocs')"
            >
              {{ t("nav.github") }}
            </button>
          </nav>

          <div class="mobile-nav__footer">
            <label class="mobile-nav__label" for="mobile-nav-locale">
              {{ t("nav.language") }}
            </label>
            <el-select
              id="mobile-nav-locale"
              :model-value="locale"
              class="mobile-nav__locale"
              size="large"
              @change="emit('setLocale', $event as Locale)"
            >
              <el-option
                v-for="item in localeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <button
              type="button"
              class="mobile-nav__cta"
              @click="emit('goDemo')"
            >
              {{ t("landing.nav.cta") }}
            </button>
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use "@/views/landing/styles/mixins" as *;

.mobile-nav {
  position: fixed;
  inset: 0;
  z-index: 100;

  @media (width >= 1024px) {
    display: none;
  }

  &__backdrop {
    @include dl-interactive-btn;

    position: absolute;
    inset: 0;
    background-color: var(--dl-overlay);
  }

  &__panel {
    @apply absolute inset-y-0 right-0 flex w-[min(100%,320px)] flex-col border-l shadow-xl;

    border-color: var(--dl-border);
    background-color: var(--dl-bg);
    color: var(--dl-text);
  }

  &__header {
    @apply flex items-start justify-between gap-4 border-b px-5 py-5;

    border-color: var(--dl-border);
  }

  &__eyebrow {
    @apply mb-1 text-xs font-semibold tracking-wide uppercase;

    font-family: var(--dl-font-body);
    color: var(--dl-accent);
  }

  &__title {
    @apply text-xl font-bold;

    font-family: var(--dl-font-heading);
    color: var(--dl-text);
  }

  &__close {
    @include dl-interactive-btn;
    @apply inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full;

    color: var(--dl-text-muted);

    &:hover {
      background-color: var(--dl-hover);
      color: var(--dl-text);
    }
  }

  &__links {
    @apply flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4;
  }

  &__link {
    @include dl-interactive-btn;
    @apply w-full rounded-xl px-4 py-3.5 text-left text-base;

    font-family: var(--dl-font-body);
    color: var(--dl-text);

    &:hover {
      background-color: var(--dl-hover);
    }

    &--active {
      @apply font-medium;

      background-color: var(--dl-hover);
    }
  }

  &__footer {
    @apply flex flex-col gap-3 border-t px-5 py-5;

    border-color: var(--dl-border);
  }

  &__label {
    @apply text-sm font-medium;

    font-family: var(--dl-font-body);
    color: var(--dl-text-muted);
  }

  &__locale {
    width: 100%;

    :deep(.el-select__wrapper) {
      min-height: 44px;
      border: 1px solid var(--dl-border);
      border-radius: 12px;
      box-shadow: none;
      background-color: var(--dl-surface);
    }

    :deep(.el-select__placeholder),
    :deep(.el-select__selected-item) {
      font-family: var(--dl-font-body);
      color: var(--dl-text);
    }
  }

  &__cta {
    @include dl-btn-primary;
    @apply mt-1 w-full;
  }
}

.mobile-nav-enter-active,
.mobile-nav-leave-active {
  transition: opacity 0.2s ease;

  .mobile-nav__panel {
    transition: transform 0.24s ease;
  }
}

.mobile-nav-enter-from,
.mobile-nav-leave-to {
  opacity: 0;

  .mobile-nav__panel {
    transform: translateX(100%);
  }
}
</style>
