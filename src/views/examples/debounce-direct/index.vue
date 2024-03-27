<template>
  <div class="card h-full p-5 space-y-5">
    <div>防抖指令</div>
    <el-button v-debounce="debounceClick" type="primary"> 防抖按钮 (0.5秒后执行) </el-button>
  </div>
</template>

<script lang="ts" name="debounce-direct" setup>
import { ElMessage } from 'element-plus';
const debounceClick = () => {
  ElMessage.success('我是防抖按钮触发的事件 🍍🍓🍌');
};
</script>
