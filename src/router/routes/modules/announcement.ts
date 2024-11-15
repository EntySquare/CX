import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const announcement: AppRouteRecordRaw = {
  path: '/announcement',
  name: 'announcement',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '公告管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 7,
  },
  children: [
    {
      path: 'announcementList',
      name: 'announcementList',
      component: () => import('@/views/announcement/index.vue'),
      meta: {
        locale: '公告列表',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default announcement;
