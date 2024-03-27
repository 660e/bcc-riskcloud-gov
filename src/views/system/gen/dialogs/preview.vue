<template>
  <el-dialog v-model="visible" title="代码预览" fullscreen>
    <el-tabs v-model="active" tab-position="left" class="tabs">
      <el-tab-pane
        v-for="(value, key) in preview"
        :label="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
        :name="key.substring(key.lastIndexOf('/') + 1, key.indexOf('.vm'))"
        :key="key"
      >
        <div class="p-5">
          <pre>{{ value }}</pre>
        </div>
        <div v-copy="value" class="fixed top-[61px] right-5 flex items-center space-x-1 cursor-pointer hover:text-blue-500">
          <el-icon><CopyDocument /></el-icon>
          <span>复制</span>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script lang="ts" name="preview-dialog" setup>
import { ref } from 'vue';
import { previewTable } from '@/api/modules/code';

const visible = ref(false);
const preview = ref<Record<string, string>>();
const active = ref('domain.java');

const open = async (tableId: string) => {
  const { data } = await previewTable(tableId);
  preview.value = data as Record<string, string>;
  visible.value = true;
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
$height: calc(100vh - 41px);
.tabs {
  height: $height;
  :deep(.el-tabs__content) {
    height: $height;
    overflow-y: auto;
  }
}
</style>
