<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getList" ref="tableRef" row-key="tableId">
      <template #tableHeader>
        <el-button @click="importData" type="primary">导入</el-button>
        <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
        <el-button @click="generate" :disabled="!tableRef?.selectedListIds.length">生成代码</el-button>
      </template>
      <template #operation="scope">
        <el-button @click="preview(scope.row.tableId)" type="primary" link>预览</el-button>
        <el-button @click="edit(scope.row.tableId)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
        <el-button @click="sync(scope.row.tableName)" type="primary" link>同步</el-button>
        <el-button @click="generate(scope.row)" type="primary" link>生成代码</el-button>
      </template>
    </pro-table>

    <!-- 导入 -->
    <import-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="importDialogRef" />
    <!-- 预览 -->
    <preview-dialog ref="previewDialogRef" />
  </div>
</template>

<script lang="ts" name="gen-manage" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { ColumnProps } from '@/components/pro-table/interface';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getList, deleteTable, synchDb, batchGenCode } from '@/api/modules/code';
import { saveAs } from 'file-saver';

import ProTable from '@/components/pro-table/index.vue';
import ImportDialog from './dialogs/import.vue';
import PreviewDialog from './dialogs/preview.vue';

const $router = useRouter();

const tableRef = ref();
const importDialogRef = ref();
const previewDialogRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'tableName', label: '表名称', search: { el: 'input' } },
  { prop: 'tableComment', label: '表描述', search: { el: 'input' } },
  { prop: 'className', label: '实体' },
  { prop: 'createTime', label: '创建时间' },
  { prop: 'updateTime', label: '更新时间' },
  { prop: 'operation', label: '操作', width: 0 }
];

const importData = () => importDialogRef.value.open();
const preview = (tableId: string) => previewDialogRef.value.open(tableId);
const edit = (tableId: string) => $router.push({ name: 'gen-edit', params: { tableId } });
const remove = (row: any) => {
  const name = row.tableId ? `“${row.tableName}”` : '';
  const ids = row.tableId ? [row.tableId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteTable(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
const sync = (tableName: string) => {
  ElMessageBox.confirm(`是否同步“${tableName}”？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await synchDb(tableName);
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      ElMessage.success(msg);
    })
    .catch(() => false);
};
const generate = async (row: any) => {
  const names = row.tableId ? [row.tableName] : tableRef.value.selectedList.map((s: any) => s.tableName);
  const blob: any = await batchGenCode(names.join(','));
  saveAs(blob, `table_${new Date().getTime()}.zip`);
};
</script>
