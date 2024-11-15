import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EARNINGS: AppRouteRecordRaw = {
  path: '/earnings',
  name: 'earnings',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '收益记录',
    requiresAuth: true,
    icon: 'icon-user',
    order: 3,
  },
  children: [
    {
      path: 'list',
      name: 'earningsList',
      component: () => import('@/views/earnings/index.vue'),
      meta: {
        locale: '收益列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default EARNINGS;
