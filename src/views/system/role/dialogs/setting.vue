<template>
  <el-dialog v-model="visible" title="分配用户" width="1000" align-center draggable>
    <div class="p-2.5">
      <pro-table :columns="columns" :request-api="requestApi" ref="tableRef">
        <template #tableHeader>
          <el-button @click="accredit" type="primary">添加用户</el-button>
        </template>
        <template #operation="scope">
          <el-button @click="remove(scope.row)" type="primary" link>取消授权</el-button>
        </template>
      </pro-table>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
      </div>
    </template>

    <!-- 授权 -->
    <accredit-dialog @confirm="tableRef.search(tableRef.pageable?.pageNum)" ref="accreditDialogRef" />
  </el-dialog>
</template>

<script lang="ts" name="setting-dialog" setup>
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { allocatedList, authUserCancel, getDictDataType } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';
import AccreditDialog from './accredit.vue';

const visible = ref(false);
const roleId = ref();
const tableRef = ref();
const accreditDialogRef = ref();

const columns: ColumnProps[] = [
  { prop: 'userId', label: '用户编号' },
  { prop: 'userName', label: '用户名称', search: { el: 'input' } },
  { prop: 'nickName', label: '用户昵称' },
  { prop: 'phonenumber', label: '手机号码', search: { el: 'input' } },
  {
    prop: 'status',
    label: '状态',
    enum: () => getDictDataType('enable_disable'),
    search: { el: 'select' },
    fieldNames: { label: 'dictLabel', value: 'dictValue' }
  },
  { prop: 'createTime', label: '创建时间', width: 180 },
  { prop: 'operation', label: '操作', width: 100 }
];

const open = (row: any) => {
  visible.value = true;
  roleId.value = row.roleId;
  tableRef.value?.reset();
};
const requestApi = (params: any) => {
  params.roleId = roleId.value;
  return allocatedList(params);
};
const accredit = () => accreditDialogRef.value.open(roleId.value);
const remove = (row: any) => {
  ElMessageBox.confirm(`是否取消“${row.userName}”授权？`, '系统提示', { type: 'warning' })
    .then(async () => {
      const { msg } = await authUserCancel({ roleId: roleId.value, userId: row.userId });
      tableRef.value.search(tableRef.value.pageable?.pageNum);
      ElMessage.success(msg);
    })
    .catch(() => false);
};

defineExpose({ open });
</script>
