import axios from 'axios';

import { failResponseWrap } from '@/utils/setup-mock';

export interface LoginData {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
}

export function getMenuList() {
  // return axios.post<RouteRecordNormalized[]>('/api/user/menu');
}

export function logout() {
  // return axios.post<LoginRes>('/api/user/logout');
}

export function login(data: LoginData) {
  // return axios.post<LoginRes>('/api/user/login', data);
  if (!data.username) {
    return failResponseWrap(null, '用户名不能为空', 50000);
  }

  if (!data.password) {
    return failResponseWrap(null, '密码不能为空', 50000);
  }
  return axios.post<LoginRes, any>('/login', data);
}

// 查询用户信息
export function getUserInfoApi(data: any) {
  return axios.post<any>('/getUserList', data);
}
// webApi.Post("/createNode", AuthWebUser(), web.CreateNode)   // 创建订单
export function createNode(data: any) {
  return axios.post<any>('/createNode', data);
}
// webApi.Post("/updateUserState", AuthWebUser(), web.UpdateUserState) // 更新用户状态
export function updateUserState(data: any) {
  return axios.post<any>('/updateUserState', data);
}
