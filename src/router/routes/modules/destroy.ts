import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DESTROY: AppRouteRecordRaw = {
  path: '/destroy',
  name: 'destroy',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '销毁记录',
    requiresAuth: true,
    icon: 'icon-user',
    order: 5,
  },
  children: [
    {
      path: 'list',
      name: 'destroyList',
      component: () => import('@/views/destroy/index.vue'),
      meta: {
        locale: '销毁列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DESTROY;
