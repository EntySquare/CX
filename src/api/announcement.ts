import axios from 'axios';

// webApi.Post( path: "/getBulletinList", Authwebuser(),web.GetBulletinList)// 获取公告列表
// webApi.Post( path: "/createBulletin", AuthWebuser(), web.createBulletin) // 创建公告

export function getBulletinList() {
  return axios.post<any>('/getBulletinList');
}
export function createBulletin(data: any) {
  return axios.post<any>('/createBulletin', data);
}
// webApi.Post("/deleteBulletin", AuthWebUser(), web.DeleteBulletin)   // 删除公告
export function deleteBulletin(data: any) {
  return axios.post<any>('/deleteBulletin', data);
}
