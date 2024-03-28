<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="getRoleList" ref="tableRef" row-key="roleId">
      <template #tableHeader>
        <el-button @click="create()" type="primary">新增</el-button>
        <el-button @click="exportData">导出</el-button>
        <el-button @click="remove" :disabled="!tableRef?.selectedListIds.length" type="danger" plain>删除</el-button>
      </template>
      <template #operation="scope">
        <template v-if="scope.row.roleId !== 1">
          <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
          <el-button @click="remove(scope.row)" type="danger" link>删除</el-button>
          <el-button @click="setting(scope.row)" type="primary" link>分配用户</el-button>
        </template>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum) && tableRef.clearSelection()" ref="createDialogRef" />
    <!-- 配置 -->
    <setting-dialog ref="settingDialogRef" />
  </div>
</template>

<script lang="ts" name="role-manage" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getRoleList, deleteRole, exportRoleList, getDictDataType } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';
import { saveAs } from 'file-saver';

import ProTable from '@/components/pro-table/index.vue';
import CreateDialog from './dialogs/create.vue';
import SettingDialog from './dialogs/setting.vue';

const tableRef = ref();
const createDialogRef = ref();
const settingDialogRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
  { prop: 'roleSort', label: '序号', width: 100 },
  { prop: 'roleId', label: '角色编号', width: 100 },
  { prop: 'roleName', label: '角色名称', search: { el: 'input' } },
  { prop: 'roleKey', label: '权限字符', search: { el: 'input' } },
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
const exportData = async () => {
  const blob: any = await exportRoleList({ ...tableRef.value.searchParam, ids: tableRef.value.selectedListIds });
  saveAs(blob, `role_${new Date().getTime()}.xlsx`);
};
const setting = (row: any) => settingDialogRef.value.open(row);
const remove = (row: any) => {
  const name = row.roleId ? `“${row.roleName}”` : '';
  const ids = row.roleId ? [row.roleId] : tableRef.value.selectedListIds;
  ElMessageBox.confirm(`是否删除${name}？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteRole(ids.join(','));
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      tableRef.value.clearSelection();
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>
