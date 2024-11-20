import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EARNINGS: AppRouteRecordRaw = {
  path: '/disposition',
  name: 'disposition',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '配置',
    requiresAuth: true,
    icon: 'icon-user',
    order: 9,
  },
  children: [
    {
      path: 'system',
      name: 'system',
      component: () => import('@/views/disposition/system.vue'),
      meta: {
        locale: '系统配置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'products',
      name: 'products',
      component: () => import('@/views/disposition/products.vue'),
      meta: {
        locale: '产品配置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default EARNINGS;
