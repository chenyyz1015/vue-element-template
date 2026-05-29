<script setup lang="ts">
const route = useRoute();
const { elementLocale, locale, t } = useLocale();

watch(locale, () => {
  const titleKey = route.meta.titleKey;
  const appTitle = t("app.title");

  document.title = titleKey ? `${t(titleKey)} | ${appTitle}` : appTitle;
});
</script>

<template>
  <el-config-provider
    :locale="elementLocale"
    :message="{ plain: true }"
    :dialog="{ alignCenter: true, draggable: true, overflow: false }"
    :table="{ showOverflowTooltip: true }"
  >
    <router-view />
  </el-config-provider>
</template>
