<template>
  <div @click="changeCollapse" class="h-10 flex justify-center items-center cursor-pointer">
    <el-icon class="text-2xl">
      <component :is="globalStore.isCollapse ? 'expand' : 'fold'"></component>
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useGlobalStore } from '@/stores/modules/global';

const globalStore = useGlobalStore();
const changeCollapse = () => globalStore.setGlobalState('isCollapse', !globalStore.isCollapse);
</script>
