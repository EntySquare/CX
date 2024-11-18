import axios from 'axios';

// webApi.Post("/getIncomeList", AuthWebUser(), web.GetIncomeList) // 获取收益列表

export function getIncomeList(data: any) {
  return axios.post<any>('/getIncomeList', data);
}
// 处理提现状态
export function withdrawalHandle() {
  // return axios.post<any>('/withdrawalHandle', data);
}
