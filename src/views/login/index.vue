<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import DefaultLayout from "@/layouts/default-layout/index.vue";

const route = useRoute();
const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

const formRef = ref<FormInstance>();
const loading = ref(false);
const showMockHint = import.meta.env.DEV;

const form = reactive({
  username: "admin",
  password: "admin123",
});

const rules = computed<FormRules>(() => ({
  username: [
    {
      required: true,
      message: t("login.validation.usernameRequired"),
      trigger: "blur",
    },
  ],
  password: [
    {
      required: true,
      message: t("login.validation.passwordRequired"),
      trigger: "blur",
    },
  ],
}));

const handleSubmit = async () => {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;

  try {
    await userStore.login(form);
    usePermissionStore().resetPermission();

    const redirect =
      typeof route.query.redirect === "string" ? route.query.redirect : "/";
    await router.replace(redirect);
  } catch {
    ElMessage.error(t("login.error.invalidCredentials"));
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <DefaultLayout>
    <section class="login l-section">
      <div class="login__panel">
        <p class="login__eyebrow">{{ t("login.eyebrow") }}</p>
        <h1 class="login__title">{{ t("login.title") }}</h1>
        <p class="login__subtitle">{{ t("login.subtitle") }}</p>

        <el-form
          ref="formRef"
          class="login__form"
          :model="form"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleSubmit"
        >
          <el-form-item :label="t('login.username')" prop="username">
            <el-input v-model="form.username" autocomplete="username" />
          </el-form-item>
          <el-form-item :label="t('login.password')" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              show-password
              autocomplete="current-password"
            />
          </el-form-item>
          <el-button
            type="primary"
            class="login__submit"
            native-type="submit"
            :loading="loading"
          >
            {{ t("login.submit") }}
          </el-button>
        </el-form>

        <p v-if="showMockHint" class="login__hint">
          {{ t("login.mockHint") }}
        </p>
      </div>
    </section>
  </DefaultLayout>
</template>

<style lang="scss" scoped>
@use "../landing/styles/mixins" as *;

.login {
  @apply flex justify-center pb-20 pt-8;

  &__panel {
    @include dl-panel;
    @apply w-full max-w-md;
  }

  &__eyebrow {
    @include dl-eyebrow;
  }

  &__title {
    @include dl-heading-md;
  }

  &__subtitle {
    @include dl-body-sm;
    @apply mb-8;
  }

  &__form {
    @apply w-full;
  }

  &__submit {
    @apply w-full;

    height: 2.75rem !important;
    border-radius: 9999px !important;
  }

  &__hint {
    @apply mt-6 text-xs leading-relaxed;

    font-family: var(--dl-font-body);
    color: var(--dl-text-dim);
  }
}

.l-section {
  @apply px-4 lg:px-6;
}
</style>
