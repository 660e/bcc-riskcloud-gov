<template>
  <el-drawer v-model="drawerVisible" title="布局设置" size="300px">
    <div class="px-5 text-sm">
      <!-- 布局样式 -->
      <el-divider content-position="center">布局样式</el-divider>
      <div class="layout-box">
        <el-tooltip content="纵向" placement="top" :show-after="200">
          <div :class="['layout-item layout-vertical', { 'is-active': layout == 'vertical' }]" @click="setLayout('vertical')">
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'vertical'">
              <circle-check-filled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="经典" placement="top" :show-after="200">
          <div :class="['layout-item layout-classic', { 'is-active': layout == 'classic' }]" @click="setLayout('classic')">
            <div class="layout-dark"></div>
            <div class="layout-container">
              <div class="layout-light"></div>
              <div class="layout-content"></div>
            </div>
            <el-icon v-if="layout == 'classic'">
              <circle-check-filled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="横向" placement="top" :show-after="200">
          <div
            :class="['layout-item layout-transverse', { 'is-active': layout == 'transverse' }]"
            @click="setLayout('transverse')"
          >
            <div class="layout-dark"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'transverse'">
              <circle-check-filled />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="分栏" placement="top" :show-after="200">
          <div :class="['layout-item layout-columns', { 'is-active': layout == 'columns' }]" @click="setLayout('columns')">
            <div class="layout-dark"></div>
            <div class="layout-light"></div>
            <div class="layout-content"></div>
            <el-icon v-if="layout == 'columns'">
              <circle-check-filled />
            </el-icon>
          </div>
        </el-tooltip>
      </div>
      <div class="flex items-center">
        <span class="pr-1">侧边栏反转色</span>
        <el-tooltip content="侧边栏颜色变为深色模式" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
        <div class="flex-1"></div>
        <el-switch v-model="asideInverted" @change="setAsideTheme" />
      </div>
      <div class="flex items-center">
        <span class="pr-1">头部反转色</span>
        <el-tooltip content="头部颜色变为深色模式" placement="top">
          <el-icon><QuestionFilled /></el-icon>
        </el-tooltip>
        <div class="flex-1"></div>
        <el-switch v-model="headerInverted" @change="setHeaderTheme" />
      </div>

      <!-- 全局主题 -->
      <el-divider content-position="center">全局主题</el-divider>
      <div class="flex items-center justify-between">
        <span>主题颜色</span>
        <el-color-picker v-model="primary" :predefine="colorList" @change="changePrimary" />
      </div>
      <div class="flex items-center justify-between">
        <span>暗黑模式</span>
        <switch-dark />
      </div>
      <div class="flex items-center justify-between">
        <span>灰色模式</span>
        <el-switch v-model="isGrey" @change="changeGreyOrWeak('grey', !!$event)" />
      </div>
      <div class="flex items-center justify-between">
        <span>色弱模式</span>
        <el-switch v-model="isWeak" @change="changeGreyOrWeak('weak', !!$event)" />
      </div>

      <!-- 界面设置 -->
      <el-divider content-position="center">界面设置</el-divider>
      <div class="flex items-center justify-between">
        <span>菜单折叠</span>
        <el-switch v-model="isCollapse" />
      </div>
      <div class="flex items-center justify-between">
        <span>菜单手风琴</span>
        <el-switch v-model="accordion" />
      </div>
      <div class="flex items-center justify-between">
        <span>面包屑</span>
        <el-switch v-model="breadcrumb" />
      </div>
      <div class="flex items-center justify-between">
        <span>面包屑图标</span>
        <el-switch v-model="breadcrumbIcon" />
      </div>
      <div class="flex items-center justify-between">
        <span>标签栏</span>
        <el-switch v-model="tabs" />
      </div>
      <div class="flex items-center justify-between">
        <span>标签栏图标</span>
        <el-switch v-model="tabsIcon" />
      </div>
      <div class="flex items-center justify-between">
        <span>页脚</span>
        <el-switch v-model="footer" />
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/hooks/useTheme';
import { useGlobalStore } from '@/stores/modules/global';
import { LayoutType } from '@/stores/interface';
import { DEFAULT_PRIMARY } from '@/config';
import { mittBus } from '@/utils';
import SwitchDark from '@/components/switch-dark/index.vue';

const { changePrimary, changeGreyOrWeak, setAsideTheme, setHeaderTheme } = useTheme();

const globalStore = useGlobalStore();
const {
  layout,
  primary,
  isGrey,
  isWeak,
  asideInverted,
  headerInverted,
  isCollapse,
  accordion,
  breadcrumb,
  breadcrumbIcon,
  tabs,
  tabsIcon,
  footer
} = storeToRefs(globalStore);

// 预定义主题颜色
const colorList = [
  DEFAULT_PRIMARY,
  '#daa96e',
  '#0c819f',
  '#409eff',
  '#27ae60',
  '#ff5c93',
  '#e74c3c',
  '#fd726d',
  '#f39c12',
  '#9b59b6'
];

// 设置布局方式
const setLayout = (val: LayoutType) => {
  globalStore.setGlobalState('layout', val);
  setAsideTheme();
};

// 打开主题设置
const drawerVisible = ref(false);
mittBus.on('openThemeDrawer', () => (drawerVisible.value = true));
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
