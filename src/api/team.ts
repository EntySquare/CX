import axios from 'axios';

// webApi.Post("/getTeamList", AuthAppUser(), web.GetTeamList) // 获取团队列表
export function getTeamList(data: any) {
  return axios.post<any>('/getTeamList', data);
}
export function getTeamListq() {
  //   return axios.get<any>('/getTeamList');
}
