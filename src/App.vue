<script setup lang="ts">
const route = useRoute();
const { elementLocale, locale, t } = useLocale();

watch(locale, () => {
  const titleKey = route.meta.titleKey as string | undefined;
  const appTitle = t("app.title");

  document.title = titleKey ? `${t(titleKey)} | ${appTitle}` : appTitle;
});
</script>

<template>
  <el-config-provider :locale="elementLocale" :message="{ plain: true }">
    <router-view />
  </el-config-provider>
</template>
