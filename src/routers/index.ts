import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/modules/user';
import { useAuthStore } from '@/stores/modules/auth';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config';
import { initDynamicRouter } from '@/routers/modules/dynamicRouter';
import { staticRouter, errorRouter } from '@/routers/modules/staticRouter';
import NProgress from '@/config/nprogress';

const mode = import.meta.env.VITE_ROUTER_MODE;

const routerMode = {
  hash: () => createWebHashHistory(),
  history: () => createWebHistory()
};

/**
 * @description 路由参数配置简介
 * @param path -> 路由菜单访问路径
 * @param name -> 路由 name (对应页面组件 name, 可用作 KeepAlive 缓存标识 && 按钮权限筛选)
 * @param redirect -> 路由重定向地址
 * @param component -> 视图文件路径
 * @param meta -> 路由菜单元信息
 * @param meta.icon -> 菜单和面包屑对应的图标
 * @param meta.title -> 路由标题 (用作 document.title || 菜单的名称)
 * @param meta.activeMenu -> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink -> 路由外链时填写的访问地址
 * @param meta.isHide -> 是否在菜单中隐藏 (通常列表详情页需要隐藏)
 * @param meta.isFull -> 菜单是否全屏 (示例：数据大屏页面)
 * @param meta.isAffix -> 菜单是否固定在标签页中 (首页通常是固定项)
 * @param meta.isKeepAlive -> 当前路由是否缓存
 */
const router = createRouter({
  history: routerMode[mode](),
  routes: [...staticRouter, ...errorRouter],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

router.beforeEach(async (to, from, next) => {
  const $userStore = useUserStore();
  const $authStore = useAuthStore();

  // NProgress开始
  NProgress.start();

  // 动态设置标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  // 判断是否为登录页，有token就在当前页，没有token重定向到登录页
  if (to.path.toLocaleLowerCase() === LOGIN_URL) {
    if ($userStore.token) return next(from.fullPath);
    resetRouter();
    return next();
  }

  // 判断访问页是否在路由白名单（静态路由）中，如果存在直接放行
  if (ROUTER_WHITE_LIST.includes(to.path)) return next();

  // 判断是否有token，没有重定向到登录页
  if (!$userStore.token) return next({ path: LOGIN_URL, replace: true });

  // 如果没有菜单列表，就重新请求菜单列表并添加动态路由
  if (!$authStore.authMenuListGet.length) {
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }

  // 存储routeName做按钮权限筛选
  $authStore.setRouteName(to.name as string);

  // 正常访问页面
  next();
});

export const resetRouter = () => {
  const $authStore = useAuthStore();
  $authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    if (name && router.hasRoute(name)) router.removeRoute(name);
  });
};

router.onError(error => {
  NProgress.done();
  console.warn('路由错误', error.message);
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
