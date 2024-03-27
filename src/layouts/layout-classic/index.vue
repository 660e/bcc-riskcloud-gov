<!-- 经典布局 -->
<template>
  <el-container class="min-w-[600px]">
    <el-header>
      <div class="header-lf mask-image">
        <div class="logo flex justify-center items-center">
          <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" />
          <span class="logo-text">{{ title }}</span>
        </div>
        <toolbar-left />
      </div>
      <div class="header-ri">
        <toolbar-right />
      </div>
    </el-header>
    <el-container class="classic-content">
      <el-aside>
        <div class="aside-box" :style="{ width: isCollapse ? '65px' : '210px' }">
          <collapse-icon />
          <el-scrollbar>
            <el-menu
              :router="false"
              :default-active="activeMenu"
              :collapse="isCollapse"
              :unique-opened="accordion"
              :collapse-transition="false"
            >
              <sub-menu :menu-list="menuList" />
            </el-menu>
          </el-scrollbar>
        </div>
      </el-aside>
      <el-container class="classic-main">
        <app-main />
      </el-container>
    </el-container>
  </el-container>
</template>

<script lang="ts" name="layout-classic" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/modules/auth';
import { useGlobalStore } from '@/stores/modules/global';

import AppMain from '@/layouts/components/app-main/index.vue';
import SubMenu from '@/layouts/components/app-menu/sub-menu.vue';
import ToolbarLeft from '@/layouts/components/app-header/toolbar-left.vue';
import ToolbarRight from '@/layouts/components/app-header/toolbar-right.vue';
import CollapseIcon from '../components/collapse-icon.vue';

const title = import.meta.env.VITE_GLOB_APP_TITLE;

const route = useRoute();
const authStore = useAuthStore();
const globalStore = useGlobalStore();
const accordion = computed(() => globalStore.accordion);
const isCollapse = computed(() => globalStore.isCollapse);
const menuList = computed(() => authStore.showMenuListGet);
const activeMenu = computed(() => (route.meta.activeMenu ? route.meta.activeMenu : route.path) as string);
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
