<script setup lang="ts">
import type { Locale } from "@/i18n/types";
import { DEVTOOLS_SECTION_IDS } from "@/views/devtools-landing/constants";
import ThemeControls from "./ThemeControls.vue";

const router = useRouter();
const route = useRoute();
const { t, locale, localeOptions, setLocale } = useLocale();

const isHome = computed(() => route.path === "/");

const sectionLinks = computed(() => [
  { id: DEVTOOLS_SECTION_IDS.features, label: t("devtools.nav.features") },
  { id: DEVTOOLS_SECTION_IDS.compare, label: t("devtools.nav.compare") },
  {
    id: DEVTOOLS_SECTION_IDS.integrations,
    label: t("devtools.nav.integrations"),
  },
]);

const routeLinks = computed(() => [
  { path: "/demo", label: t("nav.demo") },
  { path: "/about", label: t("nav.about") },
]);

const scrollToSection = (id: string) => {
  if (route.path !== "/") {
    router.push({ path: "/", hash: `#${id}` });
    return;
  }
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const goHome = () => {
  router.push("/");
};

const openDocs = () => {
  window.open("https://github.com", "_blank", "noopener,noreferrer");
};

onMounted(() => {
  if (route.hash) {
    const id = route.hash.slice(1);
    nextTick(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    });
  }
});

watch(
  () => route.hash,
  (hash) => {
    if (!hash || route.path !== "/") return;
    nextTick(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({
        behavior: "smooth",
      });
    });
  }
);
</script>

<template>
  <header
    class="fixed left-4 right-4 top-4 z-50 mx-auto max-w-6xl border border-[#334155] rounded-2xl bg-[#1E293B]/90 px-4 py-3 shadow-lg backdrop-blur-md lg:px-6"
  >
    <div class="flex-between gap-4">
      <button
        type="button"
        class="devtools-heading flex shrink-0 cursor-pointer items-center gap-2 border-none bg-transparent text-lg text-[#F8FAFC] font-semibold transition-colors duration-200 hover:text-[#22C55E]"
        @click="goHome"
      >
        <span
          class="h-8 w-8 flex-center border border-[#334155] rounded-lg bg-[#0F172A] text-sm text-[#22C55E] font-bold font-mono"
        >
          &gt;_
        </span>
        <span class="hidden sm:inline">{{ t("devtools.brand") }}</span>
      </button>

      <nav class="hidden items-center gap-1 lg:flex">
        <template v-if="isHome">
          <button
            v-for="link in sectionLinks"
            :key="link.id"
            type="button"
            class="cursor-pointer rounded-lg border-none bg-transparent px-3 py-2 text-sm text-[#94A3B8] transition-colors duration-200 hover:bg-[#334155]/50 hover:text-[#F8FAFC]"
            @click="scrollToSection(link.id)"
          >
            {{ link.label }}
          </button>
        </template>
        <button
          v-for="link in routeLinks"
          :key="link.path"
          type="button"
          class="cursor-pointer rounded-lg border-none bg-transparent px-3 py-2 text-sm transition-colors duration-200"
          :class="
            route.path === link.path
              ? 'bg-[#334155]/80 text-[#22C55E] font-medium'
              : 'text-[#94A3B8] hover:bg-[#334155]/50 hover:text-[#F8FAFC]'
          "
          @click="router.push(link.path)"
        >
          {{ link.label }}
        </button>
        <button
          type="button"
          class="cursor-pointer rounded-lg border-none bg-transparent px-3 py-2 text-sm text-[#94A3B8] transition-colors duration-200 hover:bg-[#334155]/50 hover:text-[#F8FAFC]"
          @click="openDocs"
        >
          {{ t("devtools.nav.docs") }}
        </button>
      </nav>

      <div class="flex items-center gap-2">
        <ThemeControls />
        <el-select
          v-model="locale"
          class="devtools-select !w-100px"
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
        <el-button
          type="primary"
          class="!border-none !bg-[#22C55E] !text-[#0F172A] hover:!opacity-90"
          @click="router.push('/demo')"
        >
          {{ t("devtools.nav.cta") }}
        </el-button>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.devtools-select {
  :deep(.el-select__wrapper) {
    background-color: #0f172a;
    box-shadow: 0 0 0 1px #334155 inset;
  }

  :deep(.el-select__placeholder),
  :deep(.el-select__selected-item) {
    color: #f8fafc;
  }
}
</style>
