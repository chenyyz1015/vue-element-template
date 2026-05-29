<script setup lang="ts">
import type { FormInstance, FormRules } from "element-plus";
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";

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
  <DevToolsLayout>
    <section class="mx-auto max-w-md px-4 py-16">
      <div
        class="border border-[#334155] rounded-2xl bg-[#1E293B]/90 p-8 shadow-lg backdrop-blur-md"
      >
        <h1 class="devtools-heading mb-2 text-2xl text-[#F8FAFC] font-bold">
          {{ t("login.title") }}
        </h1>
        <p class="mb-8 text-sm text-[#94A3B8]">
          {{ t("login.subtitle") }}
        </p>

        <el-form
          ref="formRef"
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
            class="w-full !border-none !bg-[#22C55E] !text-[#0F172A]"
            native-type="submit"
            :loading="loading"
          >
            {{ t("login.submit") }}
          </el-button>
        </el-form>

        <p
          v-if="showMockHint"
          class="mt-6 text-xs text-[#64748B] leading-relaxed"
        >
          {{ t("login.mockHint") }}
        </p>
      </div>
    </section>
  </DevToolsLayout>
</template>
