import axios from 'axios';

// webApi.Post("/getConfiguration", AuthWebUser(), web.GetBurnList) // 获取配置信息 系统配置

export function getConfiguration(data: any) {
    return axios.post<any>('/getConfiguration', data);
}
// webApi.Post("/updateConfiguration", AuthWebUser(), web.UpdateConfiguration) // 更新配置信息

export function updateConfiguration(data: any) {
    return axios.post<any>('/updateConfiguration', data);
}
// webApi.Post("/getNodeConfigurations", AuthWebUser(), web.GetNodeConfigurations) // 获取节点配置

export function getNodeConfigurations() {
    return axios.post<any>('/getNodeConfigurations');
}