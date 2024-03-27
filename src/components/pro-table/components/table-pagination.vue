<template>
  <!-- 分页组件 -->
  <el-pagination
    :current-page="pageable.pageNum"
    :page-size="pageable.pageSize"
    :page-sizes="[10, 25, 50, 100]"
    :total="pageable.total"
    :small="assemblySize !== 'large'"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    layout="total, sizes, prev, pager, next, jumper"
    background
  />
</template>

<script lang="ts" name="table-pagination" setup>
import { computed } from 'vue';
import { useGlobalStore } from '@/stores/modules/global';

interface Pageable {
  pageNum: number;
  pageSize: number;
  total: number;
}

interface PaginationProps {
  pageable: Pageable;
  handleSizeChange: (size: number) => void;
  handleCurrentChange: (currentPage: number) => void;
}

defineProps<PaginationProps>();

const globalStore = useGlobalStore();
const assemblySize = computed(() => globalStore.assemblySize);
</script>

<style lang="scss" scoped>
.el-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  :deep(.el-pagination__sizes) {
    margin: 0 0 0 10px;
  }
  :deep(.btn-prev) {
    margin: 0 0 0 10px;
  }
  :deep(.btn-next) {
    margin: 0;
  }
  :deep(.el-pagination__jump) {
    margin: 0 0 0 10px;
    .el-pagination__goto,
    .el-pagination__classifier {
      margin: 0;
    }
    .el-input {
      margin: 0 10px;
    }
  }
  :deep(.el-pager) {
    padding: 0 5px;
    li {
      margin: 0 5px;
    }
  }
}
</style>
