<template>
  <div class="card h-full flex justify-center items-center">
    <h1>首页</h1>
  </div>
</template>

<script lang="ts" name="home" setup>
import { $c } from '@bcc/utils';

console.log($c.encrypt(Math.random()));
</script>
