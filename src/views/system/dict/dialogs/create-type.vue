<template>
  <el-dialog v-model="visible" :title="forms.dictId ? '编辑' : '新增'" @closed="closed" width="500" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="字典名称" prop="dictName">
        <el-input v-model="forms.dictName" />
      </el-form-item>
      <el-form-item label="字典类型" prop="dictType">
        <el-input v-model="forms.dictType" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="forms.status">
          <el-radio v-for="s in statusOptions" :key="s.dictCode" :value="s.dictValue">{{ s.dictLabel }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="forms.remark" type="textarea" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
        <el-button @click="confirm" type="primary">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { createDictType, editDictType, getDictDataType } from '@/api/modules/system';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  dictId: undefined,
  dictName: '',
  dictType: '',
  status: '0',
  remark: ''
});
const rules = reactive<FormRules>({
  dictName: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  dictType: [{ required: true, message: '请输入字典类型', trigger: 'blur' }]
});
const statusOptions = ref();

const open = async (row: any) => {
  visible.value = true;
  const response: any = await getDictDataType('enable_disable');
  statusOptions.value = response.data;
  if (row.dictId) forms.value = JSON.parse(JSON.stringify(row));
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.dictId = undefined;
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.dictId ? await editDictType(forms.value) : await createDictType(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
