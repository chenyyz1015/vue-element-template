<script setup lang="ts">
const router = useRouter();
</script>

<template>
  <header class="flex-between bg-white px-6 py-4 shadow-sm">
    <h1 class="flex items-center gap-2 text-xl text-gray-800 font-semibold">
      <SvgIcon name="home" class="text-xl text-primary" />
      Vue Element Template
    </h1>
    <nav class="flex gap-4">
      <el-button
        text
        :type="$route.path === '/' ? 'primary' : 'default'"
        @click="router.push('/')"
      >
        首页
      </el-button>
      <el-button
        text
        :type="$route.path === '/about' ? 'primary' : 'default'"
        @click="router.push('/about')"
      >
        关于
      </el-button>
    </nav>
  </header>
</template>

<style lang="scss" scoped></style>
