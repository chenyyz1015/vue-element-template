<script setup lang="ts">
import type { Locale } from "@/i18n/types";
import { useSiteHeaderNav } from "../useSiteHeaderNav";
import DefaultNavMobileMenu from "./DefaultNavMobileMenu.vue";
import ThemeControls from "./ThemeControls.vue";

const {
  route,
  t,
  locale,
  localeOptions,
  setLocale,
  mobileMenuOpen,
  isHome,
  sectionLinks,
  routeLinks,
  closeMobileMenu,
  openMobileMenu,
  scrollToSection,
  navigateTo,
  goHome,
  openDocs,
  goToDemo,
} = useSiteHeaderNav();
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner l-container">
      <div class="site-header__start">
        <button
          type="button"
          class="site-header__menu-btn"
          :aria-label="t('nav.openMenu')"
          :aria-expanded="mobileMenuOpen"
          aria-controls="site-header-mobile-nav"
          @click="openMobileMenu"
        >
          <el-icon :size="20"><Menu /></el-icon>
        </button>

        <button type="button" class="site-header__brand" @click="goHome">
          <span class="site-header__logo" aria-hidden="true" />
          <span class="site-header__brand-text">{{ t("app.title") }}</span>
        </button>
      </div>

      <nav class="site-header__nav" :aria-label="t('nav.main')">
        <template v-if="isHome">
          <button
            v-for="link in sectionLinks"
            :key="link.id"
            type="button"
            class="site-header__link"
            @click="scrollToSection(link.id)"
          >
            {{ link.label }}
          </button>
        </template>
        <button
          v-for="link in routeLinks"
          :key="link.path"
          type="button"
          class="site-header__link"
          :class="{ 'site-header__link--active': route.path === link.path }"
          @click="navigateTo(link.path)"
        >
          {{ link.label }}
        </button>
        <button type="button" class="site-header__link" @click="openDocs">
          {{ t("landing.nav.docs") }}
        </button>
      </nav>

      <div class="site-header__actions">
        <ThemeControls class="site-header__theme" />
        <el-select
          v-model="locale"
          class="site-header__locale site-header__locale--desktop"
          size="small"
          @change="setLocale($event as Locale)"
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
          class="site-header__link site-header__link--plain site-header__github"
          @click="openDocs"
        >
          {{ t("nav.github") }}
        </button>
        <button type="button" class="site-header__cta" @click="goToDemo">
          {{ t("landing.nav.cta") }}
        </button>
      </div>
    </div>

    <DefaultNavMobileMenu
      :locale="locale as Locale"
      :open="mobileMenuOpen"
      :is-home="isHome"
      :section-links="sectionLinks"
      :route-links="routeLinks"
      :active-path="route.path"
      :locale-options="localeOptions"
      @close="closeMobileMenu"
      @scroll-section="scrollToSection"
      @navigate="navigateTo"
      @open-docs="openDocs"
      @go-demo="goToDemo"
      @set-locale="setLocale"
    />
  </header>
</template>

<style lang="scss" scoped>
@use "@/views/landing/styles/mixins" as *;

.site-header {
  @apply fixed inset-x-0 top-0 z-50 h-20 border-b backdrop-blur-md;

  border-color: color-mix(in srgb, var(--dl-border) 70%, transparent);
  background-color: var(--dl-header-bg);

  &__inner {
    @apply mx-auto flex h-full max-w-[1440px] items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6 lg:gap-4 lg:px-12;
  }

  &__start {
    @apply flex min-w-0 flex-1 items-center gap-2 lg:flex-none;
  }

  &__menu-btn {
    @include dl-interactive-btn;

    display: inline-flex;
    height: 2.75rem;
    width: 2.75rem;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    color: var(--dl-text);

    @media (width >= 1024px) {
      display: none;
    }

    &:hover {
      background-color: var(--dl-hover);
    }
  }

  &__brand {
    @include dl-interactive-btn;
    @apply flex min-w-0 items-center gap-2.5 p-0;
  }

  &__logo {
    @apply h-7 w-7 shrink-0 rounded-md;

    background-color: var(--dl-cta);
  }

  &__brand-text {
    @apply truncate text-sm font-semibold sm:text-base;

    font-family: var(--dl-font-body);
    color: var(--dl-text);
  }

  &__nav {
    @apply hidden items-center gap-1 lg:flex;
  }

  &__link {
    @include dl-interactive-btn;
    @apply rounded-full px-4 py-2 text-base;

    font-family: var(--dl-font-body);
    color: var(--dl-text);

    &:hover {
      background-color: var(--dl-hover);
    }

    &--active {
      @apply font-medium;

      background-color: var(--dl-hover);
    }

    &--plain {
      @apply px-0 py-0;

      &:hover {
        background-color: transparent;
        color: var(--dl-accent);
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }

  &__actions {
    @apply flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-4;
  }

  &__locale {
    width: auto;

    &--desktop {
      display: none;

      @media (width >= 1024px) {
        display: inline-flex;
      }
    }

    :deep(.el-select__wrapper) {
      background-color: transparent;
      box-shadow: none;
      padding-left: 0;
      padding-right: 0;
    }

    :deep(.el-select__placeholder),
    :deep(.el-select__selected-item) {
      font-family: var(--dl-font-body);
      color: var(--dl-text);
    }
  }

  &__github {
    display: none;

    @media (width >= 1024px) {
      display: inline-flex;
    }
  }

  &__cta {
    @include dl-interactive-btn;

    display: none;
    height: 2.75rem;
    flex-shrink: 0;
    align-items: center;
    border-radius: 9999px;
    padding-inline: 1rem;
    font-family: var(--dl-font-body);
    font-size: 1rem;
    background-color: var(--dl-cta);
    color: var(--dl-bg);

    @media (width >= 1024px) {
      display: inline-flex;
    }

    &:hover {
      opacity: 0.9;
    }
  }
}
</style>
