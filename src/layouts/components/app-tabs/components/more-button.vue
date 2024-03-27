<template>
  <el-dropdown trigger="click" :teleported="false">
    <div class="more-button">
      <i :class="'iconfont icon-xiala'"></i>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="refresh">{{ $t('tabs.refresh') }}</el-dropdown-item>
        <el-dropdown-item @click="maximize">{{ $t('tabs.maximize') }}</el-dropdown-item>
        <el-dropdown-item divided @click="closeCurrentTab">{{ $t('tabs.closeCurrent') }}</el-dropdown-item>
        <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'left')">{{ $t('tabs.closeLeft') }}</el-dropdown-item>
        <el-dropdown-item @click="tabStore.closeTabsOnSide(route.fullPath, 'right')">
          {{ $t('tabs.closeRight') }}
        </el-dropdown-item>
        <el-dropdown-item divided @click="tabStore.closeMultipleTab(route.fullPath)">
          {{ $t('tabs.closeOther') }}
        </el-dropdown-item>
        <el-dropdown-item @click="closeAllTab">{{ $t('tabs.closeAll') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import { inject, nextTick } from 'vue';
import { HOME_URL } from '@/config';
import { useTabsStore } from '@/stores/modules/tabs';
import { useGlobalStore } from '@/stores/modules/global';
import { useKeepAliveStore } from '@/stores/modules/keep-alive';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const tabStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

// refresh current page
const refreshCurrentPage: Function = inject('refresh') as Function;
const refresh = () => {
  setTimeout(() => {
    route.meta.isKeepAlive && keepAliveStore.removeKeepAliveName(route.name as string);
    refreshCurrentPage(false);
    nextTick(() => {
      route.meta.isKeepAlive && keepAliveStore.addKeepAliveName(route.name as string);
      refreshCurrentPage(true);
    });
  }, 0);
};

// maximize current page
const maximize = () => {
  globalStore.setGlobalState('maximize', true);
};

// Close Current
const closeCurrentTab = () => {
  if (route.meta.isAffix) return;
  tabStore.removeTabs(route.fullPath);
};

// Close All
const closeAllTab = () => {
  tabStore.closeMultipleTab();
  router.push(HOME_URL);
};
</script>

<style lang="scss" scoped>
@import '../index.scss';
</style>
