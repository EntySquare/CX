import axios from 'axios';

// webApi.Post("/getAssetChangeList", AuthWebUser(), web.GetAssetChangeList) // 获取资产变动列表
export function getAssetChangeList(data: any) {
    return axios.post<any>('/getAssetChangeList', data);
}
export function cs() {
  // return axios.post<any>('/cs');
}
