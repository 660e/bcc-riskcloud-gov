<template>
  <div class="theme-setting">
    <i :class="'iconfont icon-zhuti'" class="toolBar-icon" @click="openDrawer"></i>
  </div>
</template>

<script lang="ts" setup>
import { mittBus } from '@/utils';
const openDrawer = () => {
  mittBus.emit('openThemeDrawer');
};
</script>
