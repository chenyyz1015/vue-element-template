<script setup lang="ts">
import DevToolsLayout from "@/layouts/devtools-layout/index.vue";

const router = useRouter();
const { t } = useI18n();
const userStore = useUserStore();

const handleLogout = async () => {
  await userStore.logout();
  await router.replace("/login");
};
</script>

<template>
  <DevToolsLayout>
    <section class="mx-auto max-w-3xl px-4 py-16">
      <div
        class="border border-[#334155] rounded-2xl bg-[#1E293B]/90 p-8 shadow-lg backdrop-blur-md"
      >
        <h1 class="devtools-heading mb-2 text-2xl text-[#F8FAFC] font-bold">
          {{ t("admin.title") }}
        </h1>
        <p class="mb-6 text-sm text-[#94A3B8]">
          {{ t("admin.subtitle", { name: userStore.name }) }}
        </p>

        <div class="mb-8 flex flex-wrap gap-2">
          <el-tag v-for="role in userStore.roles" :key="role" type="success">
            {{ role }}
          </el-tag>
        </div>

        <h2 class="mb-3 text-sm text-[#F8FAFC] font-semibold">
          {{ t("admin.permissionDemo") }}
        </h2>
        <div class="flex flex-wrap gap-3">
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

        <div class="mt-8">
          <el-button @click="handleLogout">
            {{ t("admin.logout") }}
          </el-button>
        </div>
      </div>
    </section>
  </DevToolsLayout>
</template>
