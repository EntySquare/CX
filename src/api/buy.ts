import axios from 'axios';

// webApi.Post("/getNodeList", web.GetNodeList)
// 获取节点列表

export function getNodeList(data: any) {
  return axios.post<any>('/getNodeList', data);
}
// 处理提现状态
export function withdrawalHandle() {
  // return axios.post<any>('/withdrawalHandle', data);
}
