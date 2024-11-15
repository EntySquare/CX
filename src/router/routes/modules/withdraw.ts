import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const WITHDRAW: AppRouteRecordRaw = {
  path: '/withdraw',
  name: 'withdraw',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '提现管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 1,
  },
  children: [
    {
      path: 'withdrawList',
      name: 'withdrawList',
      component: () => import('@/views/withdraw/index.vue'),
      meta: {
        locale: '提现列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default WITHDRAW;
