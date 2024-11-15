import axios from 'axios';

// 直推排行
export function getRankingList(data: any) {
  return axios.post<any>('/getRankingList', data);
}
// webApi.Post("/createRanking", AuthWebUser(), web.CreateRanking)   // 创建排行
export function createRanking(data: any) {
  return axios.post<any>('/createRanking', data);
}
