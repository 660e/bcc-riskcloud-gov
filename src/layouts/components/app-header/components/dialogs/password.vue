<template>
  <el-dialog v-model="visible" title="修改密码" width="500" align-center draggable>
    <div class="p-5">修改密码</div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const visible = ref(false);

const open = () => {
  visible.value = true;
};
const confirm = () => {
  visible.value = false;
};

defineExpose({ open });
</script>
