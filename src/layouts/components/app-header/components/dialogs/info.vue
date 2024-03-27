<template>
  <el-dialog v-model="visible" title="个人信息" width="500" align-center draggable>
    <div class="p-5">
      <table class="table">
        <tr>
          <th>用户昵称：</th>
          <td>{{ user.nickName }}</td>
        </tr>
        <tr>
          <th>手机号码：</th>
          <td>{{ user.phonenumber }}</td>
        </tr>
        <tr>
          <th>邮箱：</th>
          <td>{{ user.email }}</td>
        </tr>
      </table>
    </div>

    <template #footer>
      <div class="flex justify-end">
        <el-button @click="visible = false">取消</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useUserStore } from '@/stores/modules/user';

interface User {
  nickName?: string;
  phonenumber?: string;
  email?: string;
}

const $useUser = useUserStore();
const visible = ref(false);
const user = ref<User>({});
const open = async () => {
  visible.value = true;
  user.value = $useUser.userInfo;
};

defineExpose({ open });
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  th {
    text-align: right;
    padding: 5px 0;
    width: 80px;
  }
}
</style>
