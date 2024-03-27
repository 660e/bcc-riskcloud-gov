<script lang="ts" name="tianditu" setup>
import { onMounted, ref } from 'vue';
import { CloudMarkerCollection, MapMarker, OnePicture, PlanMarker, SensitiveTargets } from '@bcc/ui';

const data = ref();
const active = ref(3);
const activeChange = (value: number) => {
  switch (value) {
    case 1: // 周边敏感目标
      data.value = {
        lnglat: [116.22874, 40.07758],
        radius: 200,
        targets: [
          { id: 1, label: 'Target-001', lnglat: [116.22685, 40.07829] },
          { id: 2, label: 'Target-002', lnglat: [116.22733, 40.07677] }
        ]
      };
      break;
    case 2: // 地图标注
    case 3: // 平面图标注
      data.value = {
        lnglat: [116.22874, 40.07758],
        sources: [
          { id: 1, label: 'Risk-001-L1', type: 'danger' },
          { id: 2, label: 'Risk-002-L2', type: 'warning' },
          { id: 3, label: 'Risk-003-L2', type: 'warning' },
          { id: 4, label: 'Risk-004-L2', type: 'warning' },
          { id: 5, label: 'Risk-005-L3', type: 'primary' },
          { id: 6, label: 'Risk-006-L3', type: 'primary' },
          { id: 7, label: 'Risk-007-L4', type: 'success' }
        ]
      };
      break;
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
      <el-radio-button :value="1" label="周边敏感目标" />
      <el-radio-button :value="2" label="地图标注" />
      <el-radio-button :value="3" label="平面图标注" />
      <el-radio-button :value="4" label="风险一张图" />
    </el-radio-group>
    <el-divider class="m-0" />

    <!-- 海量点位 -->
    <cloud-marker-collection v-if="active === 0" class="flex-1" />
    <!-- 周边敏感目标 -->
    <sensitive-targets v-if="active === 1" :company="data" class="flex-1 h-0" />
    <!-- 地图标注 -->
    <map-marker v-if="active === 2" :company="data" class="flex-1 h-0" />
    <!-- 平面图标注 -->
    <plan-marker v-if="active === 3" :company="data" class="flex-1 h-0" />
    <!-- 风险一张图 -->
    <one-picture v-if="active === 4" :code="data" class="flex-1" />
  </div>
</template>
