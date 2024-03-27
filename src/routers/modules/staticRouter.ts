import { RouteRecordRaw } from 'vue-router';
import { HOME_URL, LOGIN_URL } from '@/config';
import { ErrorMessage403, ErrorMessage404, ErrorMessage500 } from '@bcc/ui';

export const staticRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: 'login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/layouts/index.vue'),
    redirect: HOME_URL,
    children: []
  }
];

export const errorRouter = [
  {
    path: '/403',
    name: '403',
    component: ErrorMessage403,
    meta: {
      title: '403'
    }
  },
  {
    path: '/404',
    name: '404',
    component: ErrorMessage404,
    meta: {
      title: '404'
    }
  },
  {
    path: '/500',
    name: '500',
    component: ErrorMessage500,
    meta: {
      title: '500'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorMessage404
  }
];
