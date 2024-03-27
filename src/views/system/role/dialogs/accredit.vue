<template>
  <el-dialog v-model="visible" title="添加用户" width="1000" align-center draggable>
    <div class="p-2.5">
      <pro-table :columns="columns" :request-api="requestApi" ref="tableRef" row-key="userId" />
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" name="setting-dialog" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { unallocatedList, getDictDataType, authUserSelectAll } from '@/api/modules/system';
import { ColumnProps } from '@/components/pro-table/interface';

import ProTable from '@/components/pro-table/index.vue';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const roleId = ref();
const tableRef = ref();

const columns: ColumnProps[] = [
  { type: 'selection', width: 0 },
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
  { prop: 'createTime', label: '创建时间', width: 180 }
];

const open = (id: string) => {
  visible.value = true;
  roleId.value = id;
  tableRef.value?.reset();
  tableRef.value?.clearSelection();
};
const requestApi = (params: any) => {
  params.roleId = roleId.value;
  return unallocatedList(params);
};
const confirm = async () => {
  if (tableRef.value.selectedListIds.length) {
    const { msg } = await authUserSelectAll({ roleId: roleId.value, userIds: tableRef.value.selectedListIds.join(',') });
    $emit('confirm');
    ElMessage.success(msg);
  }
  visible.value = false;
};

defineExpose({ open });
</script>
