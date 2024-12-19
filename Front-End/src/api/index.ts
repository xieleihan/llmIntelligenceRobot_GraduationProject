// 导入axios实例
import instance from "../utils/request";

// 导入host_url
const host_url = process.env.React_APP_BASE_API;

// 封装一个GET请求
export const get = (url: string, params: any) => {
    return instance({
        url: `${host_url}${url}`,
        method: 'get',
        params
    });
};

// 封装一个POST请求
export const post = (url: string, data: any) => {
    return instance({
        url: `${host_url}${url}`,
        method: 'post',
        data
    });
};