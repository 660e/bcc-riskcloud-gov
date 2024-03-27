<template>
  <div
    class="h-8 px-2.5 text-xs text-gray-400 flex items-center"
    style="border-top: 1px solid var(--el-border-color-light); background-color: var(--el-bg-color)"
  >
    <div class="flex-1"></div>
    <div class="flex-1 text-center">2024 © 北京市计算中心有限公司</div>
    <div class="flex-1 text-right">{{ $package.version }}</div>
  </div>
</template>

<script lang="ts" setup>
import $package from '../../../../package.json';
</script>
