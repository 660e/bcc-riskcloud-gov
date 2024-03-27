<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
  <component :is="LayoutComponents[layout]" />
  <theme-drawer />
</template>

<script lang="ts" name="layout" setup>
import { computed, type Component } from 'vue';
import { LayoutType } from '@/stores/interface';
import { useGlobalStore } from '@/stores/modules/global';

import LayoutVertical from './layout-vertical/index.vue';
import LayoutClassic from './layout-classic/index.vue';
import LayoutTransverse from './layout-transverse/index.vue';
import LayoutColumns from './layout-columns/index.vue';
import ThemeDrawer from './components/theme-drawer/index.vue';

const LayoutComponents: Record<LayoutType, Component> = {
  vertical: LayoutVertical,
  classic: LayoutClassic,
  transverse: LayoutTransverse,
  columns: LayoutColumns
};

const globalStore = useGlobalStore();
const layout = computed(() => globalStore.layout);
</script>
