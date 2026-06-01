<script setup lang="ts">
import DefaultLayout from "@/layouts/default-layout/index.vue";

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

const handleLogout = async () => {
  await userStore.logout();
  await router.replace("/login");
};
</script>

<template>
  <DefaultLayout>
    <section class="admin l-section">
      <div class="admin__panel">
        <p class="admin__eyebrow">{{ t("admin.eyebrow") }}</p>
        <h1 class="admin__title">{{ t("admin.title") }}</h1>
        <p class="admin__subtitle">
          {{ t("admin.subtitle", { name: userStore.name }) }}
        </p>

        <div class="admin__roles">
          <el-tag v-for="role in userStore.roles" :key="role" type="success">
            {{ role }}
          </el-tag>
        </div>

        <h2 class="admin__section-title">{{ t("admin.permissionDemo") }}</h2>
        <div class="admin__actions">
          <el-button v-permission="'demo:edit'" type="primary">
            {{ t("admin.actions.edit") }}
          </el-button>
          <el-button v-permission="'demo:delete'" type="danger">
            {{ t("admin.actions.delete") }}
          </el-button>
          <el-button v-permission.all="['demo:edit', 'demo:delete']">
            {{ t("admin.actions.batch") }}
          </el-button>
        </div>

        <div class="admin__footer">
          <el-button class="admin__logout" @click="handleLogout">
            {{ t("admin.logout") }}
          </el-button>
        </div>
      </div>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.admin {
  @apply flex justify-center pb-20 pt-8;

  &__panel {
    @include dl-panel;
    @apply w-full max-w-3xl;
  }

  &__eyebrow {
    @include dl-eyebrow;
  }

  &__title {
    @include dl-heading-md;
  }

  &__subtitle {
    @include dl-body-sm;
    @apply mb-6;
  }

  &__roles {
    @apply mb-8 flex flex-wrap gap-2;
  }

  &__section-title {
    @apply mb-3 text-sm font-semibold;

    font-family: "DM Sans", sans-serif;
    color: var(--dl-text);
  }

  &__actions {
    @apply flex flex-wrap gap-3;
  }

  &__footer {
    @apply mt-8 border-t pt-8;

    border-color: var(--dl-border);
  }

  &__logout {
    border-radius: 9999px !important;
  }
}

.l-section {
  @apply px-4 lg:px-6;
}
</style>
