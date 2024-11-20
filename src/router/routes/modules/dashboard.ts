import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/dashboard',
  name: 'dashboard',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '主页',
    requiresAuth: true,
    icon: 'icon-home',
    order: 0,
  },
  children: [],
};

export default DASHBOARD;
