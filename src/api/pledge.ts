import axios from 'axios';

// webApi.Post("/getPledgeList", AuthWebUser(), web.GetPledgeList) // 获取质押列表

export function getPledgeList(data: any) {
  return axios.post<any>('/getPledgeList', data);
}
// 处理提现状态
export function withdrawalHandle() {
  // return axios.post<any>('/withdrawalHandle', data);
}
