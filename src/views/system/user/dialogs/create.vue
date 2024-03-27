<template>
  <el-dialog v-model="visible" :title="forms.userId ? '编辑' : '新增'" @closed="closed" width="800" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <div class="grid grid-cols-2 gap-x-5">
        <template v-if="!forms.userId">
          <el-form-item label="用户名称" prop="userName">
            <el-input v-model="forms.userName" maxlength="30" />
          </el-form-item>
          <el-form-item label="用户密码" prop="password">
            <el-input v-model="forms.password" type="password" maxlength="20" show-password />
          </el-form-item>
        </template>
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="forms.nickName" maxlength="30" />
        </el-form-item>
        <el-form-item label="用户性别" prop="sex">
          <el-select v-model="forms.sex">
            <el-option v-for="s in sexOptions" :key="s.dictCode" :label="s.dictLabel" :value="s.dictValue" />
          </el-select>
        </el-form-item>
        <el-form-item label="手机号码" prop="phonenumber">
          <el-input v-model="forms.phonenumber" maxlength="11" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="forms.email" maxlength="50" />
        </el-form-item>
        <el-form-item label="角色" prop="roleIds">
          <el-select v-model="forms.roleIds" multiple>
            <el-option
              v-for="r in roleIdsOptions"
              :key="r.roleId"
              :label="r.roleName"
              :value="r.roleId"
              :disabled="r.status === '1'"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="forms.status">
            <el-radio v-for="s in statusOptions" :key="s.dictCode" :value="s.dictValue">{{ s.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </div>
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

<script lang="ts" name="create-dialog" setup>
import { reactive, ref } from 'vue';
import { ElMessage, FormInstance, FormRules } from 'element-plus';
import { getUser, createUser, editUser, getDictDataType } from '@/api/modules/system';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  userId: undefined,
  userName: '',
  password: '',
  nickName: '',
  phonenumber: '',
  email: '',
  sex: '',
  roleIds: [],
  status: '0',
  remark: ''
});
const rules = reactive<FormRules>({
  userName: [
    { required: true, message: '用户名称不能为空', trigger: 'blur' },
    { min: 2, max: 20, message: '用户名称长度必须介于 2 和 20 之间', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '用户密码不能为空', trigger: 'blur' },
    { min: 5, max: 20, message: '用户密码长度必须介于 5 和 20 之间', trigger: 'blur' },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]/,
      message: '用户密码需要包含大、小写字母、数字、特殊字符'
    }
  ],
  nickName: [{ required: true, message: '用户昵称不能为空', trigger: 'blur' }],
  email: [{ type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }],
  phonenumber: [{ pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/, message: '请输入正确的手机号码', trigger: 'blur' }]
});
const roleIdsOptions = ref();
const sexOptions = ref();
const statusOptions = ref();

const open = async (row: any) => {
  visible.value = true;

  const p0 = getUser(row.userId || '');
  const p1 = getDictDataType('user_sex');
  const p2 = getDictDataType('enable_disable');
  const response: any = await Promise.all([p0, p1, p2]);
  roleIdsOptions.value = response[0].roles;
  sexOptions.value = response[1].data;
  statusOptions.value = response[2].data;

  if (row.userId) {
    forms.value = JSON.parse(JSON.stringify(row));
    forms.value.roleIds = response[0].roleIds;
  }
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.userId = undefined;
  forms.value.userName = '';
  forms.value.password = '';
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.userId ? await editUser(forms.value) : await createUser(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
