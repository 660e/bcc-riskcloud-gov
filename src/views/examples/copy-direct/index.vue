<template>
  <div class="card p-5 h-full space-y-5">
    <div>复制指令</div>
    <div>
      <el-input v-model="data" placeholder="请输入内容" class="w-96">
        <template #append>
          <el-button v-copy="data">复制</el-button>
        </template>
      </el-input>
    </div>
    <div>
      <el-input v-model="input" type="textarea" class="w-96" />
    </div>
  </div>
</template>

<script lang="ts" name="copy-direct" setup>
import { ref } from 'vue';

const data = ref<string>('我是被复制的内容');
const input = ref();
</script>
