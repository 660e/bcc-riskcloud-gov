<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getUserList" ref="tableRef" row-key="userId">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button @click="importData">导入</el-button>
        <el-button @click="exportData">导出</el-button>
        <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
      </template>
      <template #operation="scope">
        <template v-if="scope.row.userId !== 1">
          <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
          <el-button @click="reset(scope.row)" type="primary" link>重置密码</el-button>
        </template>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="createDialogRef" />
    <!-- 导入 -->
    <import-template-dialog @confirm="tableRef.search() && tableRef.clearSelection()" ref="importTemplateDialogRef" />
    <!-- 重置密码 -->
    <reset-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="resetDialogRef" />
  </div>
</template>

<script lang="ts" name="user-manage" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getUserList, deleteUser, exportUserList, getDictDataType, importTemplate, importUserData } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import { ImportTemplateDialog } from '@bcc/components';
import ProTable from '@/components/pro-table/index.vue';
import CreateDialog from './dialogs/create.vue';
import ResetDialog from './dialogs/reset.vue';

const tableRef = ref();
const createDialogRef = ref();
const importTemplateDialogRef = ref();
const resetDialogRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'userId', label: '用户编号', width: 100 },
  { prop: 'userName', label: '用户名称', search: { el: 'input' } },
  { prop: 'nickName', label: '用户昵称' },
  { prop: 'phonenumber', label: '手机号码', search: { el: 'input' }, width: 180 },
  {
    prop: 'status',
    label: '状态',
    enum: () => getDictDataType('enable_disable'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' },
    width: 100
  },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'operation', label: '操作', width: 180 }
];

const create = (row: any = {}) => createDialogRef.value.open(row);
const importData = () => {
  importTemplateDialogRef.value.open({
    templateApi: importTemplate,
    templateName: '用户列表模板.xlsx',
    importApi: importUserData
  });
};
const exportData = async () => {
  const blob: any = await exportUserList({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `user_${new Date().getTime()}.xlsx`);
};
const remove = (row: any) => {
  const name = row.userId ? `“${row.userName}”` : '';
  const ids = row.userId ? [row.userId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteUser(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
const reset = (row: any) => resetDialogRef.value.open(row);
</script>
