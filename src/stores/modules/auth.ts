import { defineStore } from 'pinia';
import { AuthState } from '@/stores/interface';
import { getAuthButtonListApi, getAuthMenuListApi } from '@/api/modules/login';
import { getFlatMenuList, getShowMenuList, getAllBreadcrumbList } from '@/utils';
import { HOME_URL } from '@/config';

export const useAuthStore = defineStore({
  id: 'bcc-auth',
  state: (): AuthState => ({
    authButtonList: [],
    authMenuList: [],
    routeName: ''
  }),
  getters: {
    // 按钮权限
    authButtonListGet: state => state.authButtonList,
    // 菜单列表（这里的菜单没有经过任何处理）
    authMenuListGet: state => state.authMenuList,
    // 菜单列表（左侧菜单渲染使用，移除isHide）
    showMenuListGet: state => getShowMenuList(state.authMenuList),
    // 菜单列表（扁平化处理）
    flatMenuListGet: state => getFlatMenuList(state.authMenuList),
    // 递归处理后的所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    async setAuthMenuList() {
      this.authMenuList = await getAuthMenuListApi();
      this.authMenuList.unshift({
        path: HOME_URL,
        name: 'home',
        component: '/home/index',
        meta: {
          icon: 'HomeFilled',
          title: '首页',
          isLink: '',
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: false
        }
      });
    },
    async setAuthButtonList() {
      this.authButtonList = await getAuthButtonListApi();
    },
    async setRouteName(name: string) {
      this.routeName = name;
    }
  }
});
