<template>
  <el-dialog v-model="visible" :title="forms.menuId ? '编辑' : '新增'" @closed="closed" width="800" align-center draggable>
    <el-form :model="forms" :rules="rules" label-width="100" ref="formsRef" class="px-5 pt-5">
      <el-form-item label="上级菜单" prop="parentId">
        <el-tree-select v-model="forms.parentId" :data="parentIdOptions" check-strictly clearable />
      </el-form-item>
      <el-form-item label="菜单类型" prop="menuType">
        <el-radio-group v-model="forms.menuType">
          <el-radio value="M">目录</el-radio>
          <el-radio value="C">菜单</el-radio>
          <el-radio value="F">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="forms.menuType === 'M' || forms.menuType === 'C'" label="菜单图标" prop="icon">
        <icon-select v-model:icon-value="forms.icon" />
      </el-form-item>
      <div class="grid grid-cols-2 gap-x-5">
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="forms.menuName" />
        </el-form-item>
        <el-form-item label="序号" prop="orderNum">
          <el-input-number v-model="forms.orderNum" :min="0" class="w-full" />
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'M' || forms.menuType === 'C'" prop="isFrame">
          <template #label>
            <label-tooltip label="是否外链" content="选择是外链则路由地址需要以`http(s)://`开头" />
          </template>
          <el-radio-group v-model="forms.isFrame">
            <el-radio value="0">是</el-radio>
            <el-radio value="1">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'M' || forms.menuType === 'C'" prop="path">
          <template #label>
            <label-tooltip label="路由地址" content="访问的路由地址，如：`user`，如外网地址需内链访问则以`http(s)://`开头" />
          </template>
          <el-input v-model="forms.path" />
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'C'" prop="component">
          <template #label>
            <label-tooltip label="组件路径" content="访问的组件路径，如：`system/user/index`，默认在`views`目录下" />
          </template>
          <el-input v-model="forms.component" />
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'F' || forms.menuType === 'C'" prop="perms">
          <template #label>
            <label-tooltip
              label="权限标识"
              content="控制器中定义的权限标识，如：@PreAuthorize(`@ss.hasPermi('system:user:list')`)"
            />
          </template>
          <el-input v-model="forms.perms" />
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'C'" prop="query">
          <template #label>
            <label-tooltip label="路由参数" content="访问路由的默认传递参数" />
          </template>
          <el-input v-model="forms.query" />
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'C'" prop="isCache">
          <template #label>
            <label-tooltip label="是否缓存" content="选择是则会被`keep-alive`缓存，需要匹配组件的`name`和地址保持一致" />
          </template>
          <el-radio-group v-model="forms.isCache">
            <el-radio value="0">缓存</el-radio>
            <el-radio value="1">不缓存</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'C'" label="是否固定" prop="isAffix">
          <el-radio-group v-model="forms.isAffix">
            <el-radio value="0">固定</el-radio>
            <el-radio value="1">不固定</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'C'" label="是否全屏" prop="isFull">
          <el-radio-group v-model="forms.isFull">
            <el-radio value="0">全屏</el-radio>
            <el-radio value="1">不全屏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forms.menuType === 'M' || forms.menuType === 'C'" prop="visible">
          <template #label>
            <label-tooltip label="显示状态" content="选择隐藏则路由将不会出现在侧边栏，但仍然可以访问" />
          </template>
          <el-radio-group v-model="forms.visible">
            <el-radio value="0">显示</el-radio>
            <el-radio value="1">隐藏</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item prop="status">
          <template #label>
            <label-tooltip label="菜单状态" content="选择停用则路由将不会出现在侧边栏，也不能被访问" />
          </template>
          <el-radio-group v-model="forms.status">
            <el-radio v-for="s in statusOptions" :key="s.dictCode" :value="s.dictValue">{{ s.dictLabel }}</el-radio>
          </el-radio-group>
        </el-form-item>
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
import { LabelTooltip, IconSelect } from '@bcc/components';
import { TreeSelectOption, buildTree } from '@bcc/utils';
import { getMenuList, createMenu, editMenu, getDictDataType } from '@/api/modules/system';

const $emit = defineEmits(['confirm']);

const visible = ref(false);
const formsRef = ref<FormInstance>();
const forms = ref({
  menuId: undefined,
  parentId: '',
  menuType: 'C',
  icon: 'Menu',
  menuName: '',
  orderNum: 0,
  isFrame: '1',
  path: '',
  component: '',
  perms: '',
  query: '',
  isCache: '1',
  isAffix: '1',
  isFull: '1',
  visible: '0',
  status: '0'
});
const rules = reactive<FormRules>({
  menuName: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  orderNum: [{ required: true, message: '请输入菜单顺序', trigger: 'blur' }],
  path: [{ required: true, message: '请输入路由地址', trigger: 'blur' }]
});
const parentIdOptions = ref<TreeSelectOption[]>([{ label: '根目录', value: 0, children: [] }]);
const statusOptions = ref();

const open = async (row: any) => {
  visible.value = true;

  const p0 = getMenuList();
  const p1 = getDictDataType('enable_disable');
  const response = await Promise.all([p0, p1]);
  parentIdOptions.value[0].children = buildTree(
    response[0].data.map((e: any) => {
      return { label: e.menuName, value: e.menuId, id: e.menuId, pid: e.parentId };
    })
  );
  statusOptions.value = response[1].data;

  if (row.menuId) {
    forms.value = JSON.parse(JSON.stringify(row));
    forms.value.icon = forms.value.icon || '';
  } else {
    forms.value.parentId = row;
  }
};
const closed = () => {
  formsRef.value?.resetFields();
  forms.value.menuId = undefined;
};
const confirm = () => {
  formsRef.value?.validate(async valid => {
    if (valid) {
      const { msg } = forms.value.menuId ? await editMenu(forms.value) : await createMenu(forms.value);
      $emit('confirm');
      ElMessage.success(msg);
      visible.value = false;
    }
  });
};

defineExpose({ open });
</script>
