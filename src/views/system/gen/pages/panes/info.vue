<template>
  <el-tab-pane v-bind="$attrs">
    <el-form :model="propsInfo" :rules="rules" label-width="170px">
      <div class="grid grid-cols-2 pt-5">
        <el-form-item label="表名称" prop="tableName">
          <el-input v-model="propsInfo.tableName" />
        </el-form-item>
        <el-form-item label="表描述" prop="tableComment">
          <el-input v-model="propsInfo.tableComment" />
        </el-form-item>
        <el-form-item label="生成模板">
          <el-select v-model="propsInfo.tplCategory">
            <el-option v-for="option in tplCategoryOptions" :key="option.value" :label="option.label" :value="option.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="实体类名称" prop="className">
          <el-input v-model="propsInfo.className" />
        </el-form-item>
        <el-form-item prop="packageName">
          <template #label>
            <div class="flex items-center space-x-1">
              <span>生成包路径</span>
              <el-tooltip content="生成在哪个java包下，例如：com.bcc.system" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="propsInfo.packageName" />
        </el-form-item>
        <el-form-item prop="moduleName">
          <template #label>
            <div class="flex items-center space-x-1">
              <span>生成模块名</span>
              <el-tooltip content="可理解为子系统名，例如：system" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="propsInfo.moduleName" />
        </el-form-item>
        <el-form-item prop="businessName">
          <template #label>
            <div class="flex items-center space-x-1">
              <span>生成业务名</span>
              <el-tooltip content="可理解为功能英文名，例如：user" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="propsInfo.businessName" />
        </el-form-item>
        <el-form-item prop="functionName">
          <template #label>
            <div class="flex items-center space-x-1">
              <span>生成功能名</span>
              <el-tooltip content="用作类描述，例如：用户" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="propsInfo.functionName" />
        </el-form-item>

        <!-- 生成模板：树表 -->
        <template v-if="propsInfo.tplCategory === 'tree'">
          <el-form-item prop="treeCode">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>树编码字段</span>
                <el-tooltip content="树显示的编码字段名，如：dept_id" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="propsInfo.treeCode">
              <el-option
                v-for="option in propsInfo.columns"
                :key="option.columnId"
                :label="`${option.columnName}：${option.columnComment}`"
                :value="option.columnName"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="treeParentCode">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>树父编码字段</span>
                <el-tooltip content="树显示的父编码字段名，如：parent_Id" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="propsInfo.treeParentCode">
              <el-option
                v-for="option in propsInfo.columns"
                :key="option.columnId"
                :label="`${option.columnName}：${option.columnComment}`"
                :value="option.columnName"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="treeName">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>树名称字段</span>
                <el-tooltip content="树节点的显示名称字段名，如：dept_name" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="propsInfo.treeName">
              <el-option
                v-for="option in propsInfo.columns"
                :key="option.columnId"
                :label="`${option.columnName}：${option.columnComment}`"
                :value="option.columnName"
              />
            </el-select>
          </el-form-item>
        </template>

        <!-- 生成模板：主子表 -->
        <template v-if="propsInfo.tplCategory === 'sub'">
          <el-form-item prop="subTableName">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>关联子表的表名</span>
                <el-tooltip content="关联子表的表名，如：sys_user" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="propsInfo.subTableName" @change="onSubTableNameChange">
              <el-option
                v-for="option in propsTables"
                :key="option.tableId"
                :label="`${option.tableName}：${option.tableComment}`"
                :value="option.tableName"
              />
            </el-select>
          </el-form-item>
          <el-form-item prop="subTableFkName">
            <template #label>
              <div class="flex items-center space-x-1">
                <span>子表关联的外键名</span>
                <el-tooltip content="子表关联的外键名，如：user_id" placement="top">
                  <el-icon><QuestionFilled /></el-icon>
                </el-tooltip>
              </div>
            </template>
            <el-select v-model="propsInfo.subTableFkName">
              <el-option
                v-for="option in subTableFkNameOptions"
                :key="option.columnId"
                :label="`${option.columnName}：${option.columnComment}`"
                :value="option.columnName"
              />
            </el-select>
          </el-form-item>
        </template>
      </div>

      <el-form-item label="备注">
        <el-input v-model="propsInfo.remark" :rows="5" type="textarea" />
      </el-form-item>
    </el-form>
  </el-tab-pane>
</template>

<script lang="ts" name="info-pane" setup>
import { computed, reactive, ref } from 'vue';
import { FormRules } from 'element-plus';
import { SelectOption } from '@bcc/utils';
import { InfoType } from '../../models';

const $props = defineProps<{ info: InfoType; tables: any }>();

const propsInfo = computed(() => $props.info);
const propsTables = computed(() => $props.tables);

const rules = reactive<FormRules<InfoType>>({
  tableName: [{ required: true, message: '请填写表名称', trigger: 'blur' }],
  tableComment: [{ required: true, message: '请填写表描述', trigger: 'blur' }],
  className: [{ required: true, message: '请填写实体类名称', trigger: 'blur' }],
  packageName: [{ required: true, message: '请填写生成包路径', trigger: 'blur' }],
  moduleName: [{ required: true, message: '请填写生成模块名', trigger: 'blur' }],
  businessName: [{ required: true, message: '请填写生成业务名', trigger: 'blur' }],
  functionName: [{ required: true, message: '请填写生成功能名', trigger: 'blur' }],

  treeCode: [{ required: true, message: '请填写树编码字段', trigger: 'change' }],
  treeParentCode: [{ required: true, message: '请填写树父编码字段', trigger: 'change' }],
  treeName: [{ required: true, message: '请填写树名称字段', trigger: 'change' }],

  subTableName: [{ required: true, message: '请填写关联子表的表名', trigger: 'change' }],
  subTableFkName: [{ required: true, message: '请填写子表关联的外键名', trigger: 'change' }]
});

const tplCategoryOptions = ref<SelectOption[]>([
  { label: '单表（增删改查）', value: 'crud' },
  { label: '树表（增删改查）', value: 'tree' },
  { label: '主子表（增删改查）', value: 'sub' }
]);
const subTableFkNameOptions = ref();

const onSubTableNameChange = (value: any) => {
  propsInfo.value.subTableFkName = '';
  subTableFkNameOptions.value = propsTables.value.find((table: any) => table.tableName === value)?.columns || [];
};
</script>
