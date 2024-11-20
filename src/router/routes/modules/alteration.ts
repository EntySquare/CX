import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const alteration: AppRouteRecordRaw = {
  path: '/alteration',
  name: 'alteration',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '资产管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 8,
  },
  children: [
    {
      path: 'alterationList',
      name: 'alterationList',
      component: () => import('@/views/alteration/index.vue'),
      meta: {
        locale: '用户资产变动',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default alteration;
