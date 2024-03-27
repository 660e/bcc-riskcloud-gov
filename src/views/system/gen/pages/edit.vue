<template>
  <div class="card h-full flex flex-col px-5">
    <el-tabs v-model="active" class="flex-1 flex flex-col h-0">
      <info-pane :info="data.info" :tables="data.tables" label="基本信息" name="info" />
      <rows-pane :rows="data.rows" label="字段信息" name="rows" />
    </el-tabs>
    <div class="flex justify-center py-5">
      <el-button @click="cancel">取消</el-button>
      <el-button @click="confirm" type="primary">确定</el-button>
    </div>
  </div>
</template>

<script lang="ts" name="edit-page" setup>
import { onMounted, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { useTabsStore } from '@/stores/modules/tabs';
import { getTable, editTable } from '@/api/modules/code';
import { DataType } from '../models';

import InfoPane from './panes/info.vue';
import RowsPane from './panes/rows.vue';

const $route = useRoute();
const $tabStore = useTabsStore();

const active = ref('info');
const data = reactive<DataType>({
  info: {
    tableName: '',
    tableComment: '',
    tplCategory: 'crud',
    className: '',
    packageName: '',
    moduleName: '',
    businessName: '',
    functionName: '',

    treeCode: '',
    treeParentCode: '',
    treeName: '',

    subTableName: '',
    subTableFkName: '',

    remark: '',

    functionAuthor: 'admin',
    tplWebType: 'element-plus',
    genType: '0',
    parentMenuId: '',
    columns: []
  },
  rows: [],
  tables: []
});

const confirm = async () => {
  const params = {
    ...data.info,
    columns: data.rows,
    params: {
      treeCode: data.info.treeCode,
      treeName: data.info.treeName,
      treeParentCode: data.info.treeParentCode,
      parentMenuId: data.info.parentMenuId
    }
  };
  const { msg } = await editTable(params);
  ElMessage.success(msg);
  cancel();
};
const cancel = () => $tabStore.removeTabs($route.fullPath);

onMounted(async () => {
  const response: any = await getTable($route.params.tableId as string);
  data.info = response.data.info;
  data.rows = response.data.rows;
  data.tables = response.data.tables;
});
</script>
