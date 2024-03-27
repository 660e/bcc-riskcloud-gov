<template>
  <!-- 列设置 -->
  <el-drawer v-model="drawerVisible" title="列设置" size="400px" :z-index="2100" append-to-body>
    <div class="p-5">
      <el-table
        :data="colSetting"
        :border="true"
        :show-header="false"
        :tree-props="{ children: '_children' }"
        row-key="prop"
        default-expand-all
      >
        <el-table-column prop="label" align="center" />
        <el-table-column v-slot="scope" prop="isShow" align="center">
          <el-switch v-model="scope.row.isShow" active-text="显示" inactive-text="显示" inline-prompt />
        </el-table-column>
        <el-table-column v-slot="scope" prop="sortable" align="center">
          <el-switch v-model="scope.row.sortable" active-text="排序" inactive-text="排序" inline-prompt />
        </el-table-column>
        <template #empty>
          <div>
            <img src="@/assets/images/notData.png" alt="notData" />
            <div>暂无可配置列</div>
          </div>
        </template>
      </el-table>
    </div>
  </el-drawer>
</template>

<script lang="ts" name="col-setting" setup>
import { ref } from 'vue';
import { ColumnProps } from '../interface';

defineProps<{ colSetting: ColumnProps[] }>();

const drawerVisible = ref<boolean>(false);

const openColSetting = () => {
  drawerVisible.value = true;
};

defineExpose({
  openColSetting
});
</script>
