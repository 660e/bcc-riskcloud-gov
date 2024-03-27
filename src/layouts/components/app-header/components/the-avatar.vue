<template>
  <el-dropdown trigger="click">
    <el-avatar :src="avatarImage" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="info">{{ $t('header.personalData') }}</el-dropdown-item>
        <el-dropdown-item @click="password">{{ $t('header.changePassword') }}</el-dropdown-item>
        <el-dropdown-item @click="logout" divided>{{ $t('header.logout') }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <info-dialog ref="infoDialogRef" />
  <password-dialog ref="passwordDialogRef" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { logoutApi } from '@/api/modules/login';
import { useUserStore } from '@/stores/modules/user';
import { LOGIN_URL } from '@/config';
import { ElMessageBox } from 'element-plus';

import InfoDialog from './dialogs/info.vue';
import PasswordDialog from './dialogs/password.vue';

import avatarImage from '@/assets/images/avatar.gif';

const $router = useRouter();
const $userStore = useUserStore();

const logout = () => {
  ElMessageBox.confirm('退出登录？', '提示', { type: 'warning' }).then(async () => {
    // 退出
    await logoutApi();

    // 清空token
    $userStore.setToken('');

    // 跳转到登录页
    $router.replace(LOGIN_URL);
  });
};

const infoDialogRef = ref();
const info = () => infoDialogRef.value?.open();

const passwordDialogRef = ref();
const password = () => passwordDialogRef.value?.open();
</script>
