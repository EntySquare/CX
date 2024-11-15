import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const BUY: AppRouteRecordRaw = {
  path: '/buy',
  name: 'buy',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '购买记录',
    requiresAuth: true,
    icon: 'icon-user',
    order: 2,
  },
  children: [
    {
      path: 'list',
      name: 'buyList',
      component: () => import('@/views/buy/index.vue'),
      meta: {
        locale: '购买列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default BUY;
