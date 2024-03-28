<template>
  <el-dialog v-model="visible" title="配置" width="1000" align-center draggable>
    <div class="p-2.5">
      <pro-table :columns="columns" :request-api="requestApi" ref="tableRef" row-key="dictCode">
        <template #tableHeader>
          <el-button @click="create()" type="primary">新增</el-button>
          <el-button @click="exportData">导出</el-button>
          <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        </template>
      </pro-table>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
      </div>
    </template>

    <!-- 新增/编辑 -->
    <create-data-dialog
      @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()"
      ref="createDataDialogRef"
    />
  </el-dialog>
</template>

<script lang="ts" name="setting-dialog" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictDataList, deleteDictData, getDictType, getDictDataType, exportDictDataList } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import ProTable from '@/components/pro-table/index.vue';
import CreateDataDialog from './create-data.vue';

const visible = ref(false);
const dictId = ref();
const dictType = ref();
const tableRef = ref();
const createDataDialogRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'dictSort', label: '序号', width: 100 },
  { prop: 'dictCode', label: '字典编码', width: 100 },
  { prop: 'dictLabel', label: '字典标签', search: { el: 'input' } },
  { prop: 'dictValue', label: '字典键值', width: 100 },
  {
    prop: 'status',
    label: '状态',
    enum: () => getDictDataType('enable_disable'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'operation', label: '操作', width: 120 }
];

const open = (row: any) => {
  visible.value = true;
  dictId.value = row.dictId;
  tableRef.value?.reset();
};
const requestApi = async (params: any) => {
  const { data } = await getDictType(dictId.value);
  dictType.value = data.dictType;
  params.dictType = data.dictType;
  return getDictDataList(params);
};
const create = (row: any = {}) => createDataDialogRef.value.open(row, dictType.value);
const exportData = async () => {
  const blob: any = await exportDictDataList({
    ...tableRef.value.searchParam,
    dictType: dictType.value,
    ids: tableRef.value.selectedListIds
  });
  saveAs(blob, `dict_data_${new Date().getTime()}.xlsx`);
};
const remove = (row: any) => {
  const name = row.dictCode ? `“${row.dictLabel}”` : '';
  const ids = row.dictCode ? [row.dictCode] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteDictData(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};

defineExpose({ open });
</script>
