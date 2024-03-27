import router from '@/routers/index';
import { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
import { ElNotification } from 'element-plus';
import { LOGIN_URL } from '@/config';

const modules = import.meta.glob('@/views/**/*.vue');

export const initDynamicRouter = async () => {
  const $userStore = useUserStore();
  const $authStore = useAuthStore();

  try {
    // 设置菜单列表
    await $authStore.setAuthMenuList();

    // 设置按钮权限
    await $authStore.setAuthButtonList();

    // 当前用户没有菜单时
    if (!$authStore.authMenuListGet.length) {
      ElNotification({
        title: '无权限访问',
        message: '当前账号无任何菜单权限，请联系系统管理员！',
        type: 'warning',
        duration: 3000
      });
      $userStore.setToken('');
      router.replace(LOGIN_URL);
      return Promise.reject();
    }

    // 详情页动态路由
    $authStore.flatMenuListGet.push(
      ...[
        {
          path: '/system/gen/:tableId',
          name: 'gen-edit',
          component: '/system/gen/pages/edit',
          meta: {
            activeMenu: '/system/gen',
            icon: 'Menu',
            isAffix: false,
            isFull: false,
            isHide: true,
            isKeepAlive: false,
            isLink: '',
            title: '详情页'
          }
        },
        {
          path: '/examples/pro-table/detail/:id',
          name: 'pro-table-detail',
          component: '/examples/pro-table/detail',
          meta: {
            activeMenu: '/examples/pro-table',
            icon: 'Menu',
            isAffix: false,
            isFull: false,
            isHide: true,
            isKeepAlive: false,
            isLink: '',
            title: '详情页'
          }
        },
        {
          path: '/examples/tabs/detail/:id',
          name: 'tabs-detail',
          component: '/examples/tabs/detail',
          meta: {
            activeMenu: '/examples/tabs',
            icon: 'Menu',
            isAffix: false,
            isFull: false,
            isHide: true,
            isKeepAlive: false,
            isLink: '',
            title: '详情页'
          }
        }
      ]
    );

    // 添加动态路由
    $authStore.flatMenuListGet.forEach(item => {
      item.children && delete item.children;
      if (item.component && typeof item.component === 'string') {
        item.component = modules[`/src/views${item.component}.vue`];
      }
      if (item.meta.isFull) {
        if (item.path.slice(0, 1) !== '/') item.path = `/${item.path}`;
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute('layout', item as unknown as RouteRecordRaw);
      }
    });
  } catch (error) {
    $userStore.setToken('');
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
