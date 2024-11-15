import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const PLEDGE: AppRouteRecordRaw = {
  path: '/pledge',
  name: 'pledge',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '质押管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 4,
  },
  children: [
    {
      path: 'list',
      name: 'pledgeList',
      component: () => import('@/views/pledge/index.vue'),
      meta: {
        locale: '质押列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default PLEDGE;
