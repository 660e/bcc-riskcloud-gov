<template>
  <div class="card h-full p-5 space-y-5">
    <span class="text">按钮权限</span>
    <el-alert :title="`当前用户按钮权限：${Object.keys(BUTTONS).join(', ')}`" type="success" />

    <el-divider content-position="left">使用 v-auth 指令绑定权限</el-divider>
    <div>
      <el-button v-auth="['examples:auth:create']" type="success">新增</el-button>
      <el-button v-auth="['examples:auth:remove']" type="danger">删除</el-button>
      <el-button v-auth="['examples:auth:edit']" type="warning">编辑</el-button>
      <el-button v-auth="['examples:auth:search']" type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script lang="ts" name="auth-direct" setup>
import { useAuthButtons } from '@/hooks/useAuthButtons';

const { BUTTONS } = useAuthButtons();
</script>
