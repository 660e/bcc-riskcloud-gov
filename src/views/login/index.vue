<template>
  <div class="h-full flex justify-center items-center relative">
    <div class="flex rounded overflow-hidden border border-gray-300">
      <el-image :src="loginImage" fit="cover" class="w-96" />
      <login-form class="w-96" />
    </div>
    <switch-dark class="absolute right-3.5 bottom-2" />
  </div>
</template>

<script lang="ts" name="login" setup>
import loginImage from '@/assets/images/login.jpg';
import SwitchDark from '@/components/switch-dark/index.vue';
import LoginForm from './components/form.vue';
</script>
