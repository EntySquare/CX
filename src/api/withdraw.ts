import axios from 'axios';

// 获取提现记录
export function getWithdrawalLog(data: any) {
  return axios.post<any>('/getWithdrawalLog', data);
}
// 处理提现状态
export function withdrawalHandle(data: any) {
  return axios.post<any>('/withdrawalHandle', data);
}
