<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getDictTypeList" ref="tableRef" row-key="dictId">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button @click="exportData">导出</el-button>
        <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
        <el-button @click="refreshCache">刷新缓存</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="setting(scope.row)" type="primary" link>配置</el-button>
        <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-type-dialog
      @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()"
      ref="createTypeDialogRef"
    />
    <!-- 配置 -->
    <setting-dialog ref="settingDialogRef" />
  </div>
</template>

<script lang="ts" name="dict-manage" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getDictTypeList, deleteDictType, getDictDataType, refreshDictTypeCache, exportDictTypeList } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import ProTable from '@/components/pro-table/index.vue';
import CreateTypeDialog from './dialogs/create-type.vue';
import SettingDialog from './dialogs/setting.vue';

const tableRef = ref();
const createTypeDialogRef = ref();
const settingDialogRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'dictId', label: '字典编号', width: 100 },
  { prop: 'dictName', label: '字典名称', search: { el: 'input' } },
  { prop: 'dictType', label: '字典类型', search: { el: 'input' } },
  {
    prop: 'status',
    label: '状态',
    enum: () => getDictDataType('enable_disable'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'remark', label: '备注' },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'operation', label: '操作', width: 180 }
];

const create = (row: any = {}) => createTypeDialogRef.value.open(row);
const exportData = async () => {
  const blob: any = await exportDictTypeList({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `dict_type_${new Date().getTime()}.xlsx`);
};
const refreshCache = async () => {
  const { msg } = await refreshDictTypeCache();
  ElMessage.success(msg);
};
const setting = (row: any) => settingDialogRef.value.open(row);
const remove = (row: any) => {
  const name = row.dictId ? `“${row.dictName}”` : '';
  const ids = row.dictId ? [row.dictId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteDictType(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>
