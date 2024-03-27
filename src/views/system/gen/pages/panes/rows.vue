<template>
  <el-tab-pane v-bind="$attrs" class="h-full no-card">
    <pro-table :data="$props.rows" :columns="columns" :pagination="false">
      <template #columnComment="scope">
        <el-input v-model="scope.row.columnComment" />
      </template>
      <template #javaType="scope">
        <el-select v-model="scope.row.javaType">
          <el-option v-for="option in javaTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template #javaField="scope">
        <el-input v-model="scope.row.javaField" />
      </template>
      <template #isInsert="scope">
        <el-checkbox v-model="scope.row.isInsert" true-value="1" false-value="0" />
      </template>
      <template #isEdit="scope">
        <el-checkbox v-model="scope.row.isEdit" true-value="1" false-value="0" />
      </template>
      <template #isList="scope">
        <el-checkbox v-model="scope.row.isList" true-value="1" false-value="0" />
      </template>
      <template #isQuery="scope">
        <el-checkbox v-model="scope.row.isQuery" true-value="1" false-value="0" />
      </template>
      <template #queryType="scope">
        <el-select v-model="scope.row.queryType">
          <el-option v-for="option in queryTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template #isRequired="scope">
        <el-checkbox v-model="scope.row.isRequired" true-value="1" false-value="0" />
      </template>
      <template #htmlType="scope">
        <el-select v-model="scope.row.htmlType">
          <el-option v-for="option in htmlTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
      <template #dictType="scope">
        <el-select v-model="scope.row.dictType">
          <el-option v-for="option in dictTypeOptions" :key="option.value" :label="option.label" :value="option.value" />
        </el-select>
      </template>
    </pro-table>
  </el-tab-pane>
</template>

<script lang="ts" name="rows-pane" setup>
import { onMounted, ref } from 'vue';
import { ColumnProps } from '@/components/pro-table/interface';
import { SelectOption } from '@bcc/utils';
import { InfoType } from '../../models';
import { optionselect } from '@/api/modules/system';

import ProTable from '@/components/pro-table/index.vue';

defineProps<{ rows: InfoType[] }>();

const columns: ColumnProps[] = [
  { prop: 'columnName', label: '字段列名' },
  { prop: 'columnComment', label: '字段描述' },
  { prop: 'columnType', label: '物理类型' },
  { prop: 'javaType', label: 'java类型' },
  { prop: 'javaField', label: 'java属性' },
  { prop: 'isInsert', label: '插入', width: 70 },
  { prop: 'isEdit', label: '编辑', width: 70 },
  { prop: 'isList', label: '列表', width: 70 },
  { prop: 'isQuery', label: '查询', width: 70 },
  { prop: 'queryType', label: '查询方式' },
  { prop: 'isRequired', label: '必填', width: 70 },
  { prop: 'htmlType', label: '显示类型' },
  { prop: 'dictType', label: '字典类型' }
];

const javaTypeOptions = ref<SelectOption[]>([
  { label: 'Long', value: 'Long' },
  { label: 'String', value: 'String' },
  { label: 'Integer', value: 'Integer' },
  { label: 'Double', value: 'Double' },
  { label: 'BigDecimal', value: 'BigDecimal' },
  { label: 'Date', value: 'Date' },
  { label: 'Boolean', value: 'Boolean' }
]);
const queryTypeOptions = ref<SelectOption[]>([
  { label: '=', value: 'EQ' },
  { label: '!=', value: 'NE' },
  { label: '>', value: 'GT' },
  { label: '>=', value: 'GTE' },
  { label: '<', value: 'LT' },
  { label: '<=', value: 'LTE' },
  { label: 'LIKE', value: 'LIKE' },
  { label: 'BETWEEN', value: 'BETWEEN' }
]);
const htmlTypeOptions = ref<SelectOption[]>([
  { label: '文本框', value: 'input' },
  { label: '文本域', value: 'textarea' },
  { label: '下拉框', value: 'select' },
  { label: '单选框', value: 'radio' },
  { label: '复选框', value: 'checkbox' },
  { label: '日期控件', value: 'datetime' },
  { label: '图片上传', value: 'imageUpload' },
  { label: '文件上传', value: 'fileUpload' },
  { label: '富文本控件', value: 'editor' }
]);
const dictTypeOptions = ref<SelectOption[]>([]);

onMounted(async () => {
  const { data } = await optionselect();
  dictTypeOptions.value = data.map((e: any) => {
    return { label: e.dictName, value: e.dictType };
  });
});
</script>

<style lang="scss" scoped>
.no-card :deep(.table-main) {
  padding: 20px 0 0 0;
}
</style>
