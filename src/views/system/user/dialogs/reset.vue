<template>
  <el-dialog v-model="visible" @closed="closed" title="重置密码" width="500" align-center draggable>
    <el-form :model="forms" :rules="rules" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="新密码" prop="password">
        <el-input v-model="forms.password" type="password" maxlength="20" show-password />
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

<script lang="ts" name="create-dialog" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { resetPwd } from '@/api/modules/system';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  userId: undefined,
  password: ''
});
const rules = reactive<FormRules>({
  password: [
    { required: true, message: '用户密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
      message: '用户密码需要包含大、小写字母、数字、特殊字符'
    }
  ]
});

const open = (row: any) => {
  visible.value = true;
  forms.value = JSON.parse(JSON.stringify(row));
};
const closed = () => formsRef.value?.resetFields();
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { userId, password } = forms.value;
      const { msg } = await resetPwd({ userId, password });
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
