<template>
  <div class="flex flex-col h-full">
    <pro-table :columns="columns" :request-api="requestApi" :pagination="false" row-key="menuId" ref="tableRef">
      <template #tableHeader>
        <el-button @click="create(0)" type="primary">新增</el-button>
      </template>
      <template #icon="scope">
        <el-icon v-if="scope.row.icon" :size="16">
          <component :is="scope.row.icon" />
        </el-icon>
      </template>
      <template #operation="scope">
        <el-button @click="create(scope.row.menuId)" type="primary" link>新增</el-button>
        <el-button @click="create(scope.row)" type="primary" link>编辑</el-button>
        <el-button @click="remove(scope.row)" type="primary" link>删除</el-button>
      </template>
    </pro-table>

    <!-- 新增/编辑 -->
    <create-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum)" ref="createDialogRef" />
  </div>
</template>

<script lang="ts" name="menu-manage" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { getMenuList, deleteMenu, getDictDataType } from '@/api/modules/system';
import { buildTree } from '@bcc/utils';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import CreateDialog from './dialogs/create.vue';

const tableRef = ref();
const createDialogRef = ref();

const columns: ColumnProps[] = [
  { prop: 'menuName', label: '菜单名称', search: { el: 'input' } },
  { prop: 'icon', label: '菜单图标', width: 100 },
  { prop: 'orderNum', label: '显示顺序', width: 100 },
  { prop: 'perms', label: '权限标识' },
  { prop: 'path', label: '路由地址' },
  { prop: 'component', label: '组件路径' },
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

const requestApi = (params: any) => {
  return new Promise(async resolve => {
    const { data } = await getMenuList(params);
    const tree = buildTree(data, 'menuId', 'parentId');
    resolve({ data: tree });
  });
};
const create = (row: any) => createDialogRef.value.open(row);
const remove = (row: any) => {
  ElMessageBox.confirm(`是否删除“${row.menuName}”？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await deleteMenu(row.menuId);
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      ElMessage.success(msg);
    })
    .catch(() => false);
};
</script>
