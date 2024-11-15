import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const EARNINGS: AppRouteRecordRaw = {
  path: '/team',
  name: 'team',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '团队管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 5,
  },
  children: [
    {
      path: 'teamList',
      name: 'teamList',
      component: () => import('@/views/team/index.vue'),
      meta: {
        locale: '团队配置',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default EARNINGS;
