<template>
  <el-dialog v-model="visible" title="导入" align-center draggable>
    <div class="p-2.5">
      <pro-table :columns="columns" :request-api="getDbList" ref="tableRef" row-key="tableName" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" name="import-dialog" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { ColumnProps } from '@/components/pro-table/interface';
import { getDbList, importTable } from '@/api/modules/code';

import ProTable from '@/components/pro-table/index.vue';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const tableRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', fixed: 'left', width: 0 },
  { prop: 'tableName', label: '表名称', search: { el: 'input' }, width: 180 },
  { prop: 'tableComment', label: '表描述', search: { el: 'input' } },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'updateTime', label: '更新时间', width: 180 }
];

const open = () => {
  visible.value = true;
  tableRef.value?.reset();
  tableRef.value?.clearSelection();
};
const confirm = async () => {
  if (tableRef.value.selectedListIds.length) {
    const { msg } = await importTable({ tables: tableRef.value.selectedListIds.join(',') });
    $emit('confirm');
    ElMessage.success(msg);
  }
  visible.value = false;
};

defineExpose({ open });
</script>
