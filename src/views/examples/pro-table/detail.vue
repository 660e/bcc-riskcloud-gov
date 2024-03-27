<template>
  <div class="card p-5 h-full">
    <span class="text">我是 ProTable 详情页，属于 ProTable 下面的子集 🍓🍇🍈🍉</span>
    <span class="text">params:{{ route.params }}</span>
    <span class="text">query:{{ route.query }}</span>
  </div>
</template>

<script lang="ts" name="pro-table-detail" setup>
import { useRoute } from 'vue-router';
const route = useRoute();
</script>
