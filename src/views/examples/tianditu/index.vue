<script lang="ts" name="tianditu" setup>
import { onMounted, ref } from 'vue';
import { CloudMarkerCollection, OnePicture } from '@bcc/ui';

const data = ref();
const active = ref(4);
const activeChange = (value: number) => {
  switch (value) {
    case 4: // 风险一张图
      // data.value = 110000; // 北京
      data.value = 510100; // 成都
      break;
  }
};

onMounted(() => activeChange(active.value));
</script>

<template>
  <div class="card h-full flex flex-col">
    <el-radio-group v-model="active" @change="activeChange" class="p-2.5">
      <el-radio-button :value="0" label="海量点位" />
      <el-radio-button :value="4" label="风险一张图" />
    </el-radio-group>
    <el-divider class="m-0" />

    <!-- 海量点位 -->
    <cloud-marker-collection v-if="active === 0" class="flex-1" />
    <!-- 风险一张图 -->
    <one-picture v-if="active === 4" :code="data" class="flex-1" />
  </div>
</template>
