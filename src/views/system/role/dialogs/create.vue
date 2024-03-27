<template>
  <el-dialog v-model="visible" :title="forms.roleId ? '编辑' : '新增'" @closed="closed" width="800" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="p-5 flex space-x-5">
      <div class="flex-1">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="forms.roleName" />
        </el-form-item>
        <el-form-item prop="roleKey">
          <template #label>
            <div class="flex items-center space-x-1">
              <span>权限字符</span>
              <el-tooltip content="控制器中定义的权限字符，如：@PreAuthorize(`@ss.hasRole('admin')`)" placement="top">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input v-model="forms.roleKey" />
        </el-form-item>
        <el-form-item label="显示顺序" prop="roleSort">
          <el-input-number v-model="forms.roleSort" :min="0" />
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="forms.status">
            <el-radio v-for="s in statusOptions" :key="s.dictCode" :value="s.dictValue">{{ s.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="forms.remark" type="textarea" />
        </el-form-item>
      </div>
      <div class="flex-1 h-[500px] overflow-auto border border-gray-300 rounded">
        <el-tree :data="treeData" node-key="id" ref="treeRef" show-checkbox />
      </div>
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
import { createRole, editRole, getDictDataType, treeselect, roleMenuTreeselect } from '@/api/modules/system';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const treeRef = ref();
const formsRef = ref<FormInstance>();
const forms = ref({
  roleId: undefined,
  roleName: '',
  roleKey: '',
  roleSort: 0,
  status: '0',
  remark: '',
  menuIds: [],
  deptIds: [],
  menuCheckStrictly: true,
  deptCheckStrictly: true
});
const rules = reactive<FormRules>({
  roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }],
  roleKey: [{ required: true, message: '请输入权限字符', trigger: 'blur' }],
  roleSort: [{ required: true, message: '请输入显示顺序', trigger: 'blur' }]
});
const statusOptions = ref();
const treeData = ref();

const open = async (row: any) => {
  visible.value = true;

  const p0 = getDictDataType('enable_disable');
  const p1 = treeselect();
  const response = await Promise.all([p0, p1]);
  statusOptions.value = response[0].data;
  treeData.value = response[1].data;

  if (row.roleId) {
    forms.value = JSON.parse(JSON.stringify(row));
    const data: any = await roleMenuTreeselect(row.roleId);
    treeRef.value.setCheckedKeys(data.checkedKeys, false);
  }
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.roleId = undefined;
  treeRef.value.setCheckedKeys([], false);
  Object.values(treeRef.value.store.nodesMap).forEach((node: any) => node.collapse());
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      forms.value.menuIds = treeRef.value.getCheckedKeys().concat(treeRef.value.getHalfCheckedKeys());
      const { msg } = forms.value.roleId ? await editRole(forms.value) : await createRole(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
