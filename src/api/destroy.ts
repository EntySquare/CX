import axios from 'axios';

// webApi.Post("/getBurnList", AuthWebUser(), web.GetBurnList) // 获取销毁列表

export function getBurnList(data: any) {
    return axios.post<any>('/getBurnList', data);
}
// 处理提现状态
export function withdrawalHandle() {
    // return axios.post<any>('/withdrawalHandle', data);
}
