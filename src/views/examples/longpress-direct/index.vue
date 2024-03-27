<template>
  <div class="card h-full p-5 space-y-5">
    <div>长按指令</div>
    <el-button v-longpress="longpress" type="primary"> 长按2秒触发事件 </el-button>
  </div>
</template>

<script lang="ts" name="longpress-direct" setup>
import { ElMessage } from 'element-plus';
const longpress = () => {
  ElMessage.success('长按事件触发成功 🎉🎉🎉');
};
</script>
