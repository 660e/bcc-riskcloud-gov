import { defineStore } from 'pinia';
import { UserState } from '@/stores/interface';
import piniaPersistConfig from '@/stores/helper/persist';

export const useUserStore = defineStore({
  id: 'bcc-user',
  state: (): UserState => ({
    token: '',
    userInfo: { nickName: '' }
  }),
  getters: {},
  actions: {
    setToken(token: string) {
      this.token = token;
    },
    setUserInfo(userInfo: UserState['userInfo']) {
      this.userInfo = userInfo;
    }
  },
  persist: piniaPersistConfig('bcc-user')
});
