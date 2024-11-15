import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';
// direct_thrust
const RANKING: AppRouteRecordRaw = {
  path: '/ranking',
  name: 'ranking',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '排行奖励',
    requiresAuth: true,
    icon: 'icon-user',
    order: 6,
  },
  children: [
    {
      path: 'thrust',
      name: 'thrust',
      component: () => import('@/views/ranking/direct_thrust.vue'),
      meta: {
        locale: '直推排行',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'performance',
      name: 'performance',
      component: () => import('@/views/ranking/team.vue'),
      meta: {
        locale: '团队业绩排行',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default RANKING;
