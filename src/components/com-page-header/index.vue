<script setup lang="ts">
import type { Locale } from "@/i18n/types";

const router = useRouter();
const { t, locale, localeOptions, setLocale } = useLocale();
</script>

<template>
  <header class="flex-between bg-white px-6 py-4 shadow-sm">
    <h1 class="flex items-center gap-2 text-xl text-gray-800 font-semibold">
      <SvgIcon name="home" class="text-primary text-xl" />
      {{ t("app.title") }}
    </h1>
    <nav class="flex items-center gap-4">
      <el-button
        text
        :type="$route.path === '/' ? 'primary' : 'default'"
        @click="router.push('/')"
      >
        {{ t("nav.home") }}
      </el-button>
      <el-button
        text
        :type="$route.path === '/about' ? 'primary' : 'default'"
        @click="router.push('/about')"
      >
        {{ t("nav.about") }}
      </el-button>
      <el-select
        v-model="locale"
        class="!w-100px"
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
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
