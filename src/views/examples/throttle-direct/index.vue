<template>
  <div class="card h-full p-5 space-y-5">
    <div>节流指令</div>
    <el-button v-throttle="throttleClick" type="primary"> 节流按钮 (每隔1S秒后执行) </el-button>
  </div>
</template>

<script lang="ts" name="throttle-direct" setup>
import { ElMessage } from 'element-plus';
const throttleClick = () => {
  ElMessage.success('我是节流按钮触发的事件 🍍🍓🍌');
};
</script>
