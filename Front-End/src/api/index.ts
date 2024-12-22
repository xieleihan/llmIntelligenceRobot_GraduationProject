// 导入axios实例
import instance from "../utils/request";

// 导入host_url
const host_url = import.meta.env.VITE_BASE_API;

// 校验参数是否为对象类型
const validateParams = (params: any) => {
    if (params && typeof params !== 'object') {
        throw new Error('参数必须是一个对象');
    }
};

// 封装一个GET请求
export const get = async (url: string, params: any = {}) => {
    try {
        validateParams(params);
        const response = await instance({
            url: `${host_url}${url}`,
            method: 'get',
            params,
        });
        return response;
    } catch (error) {
        console.error(`GET 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};

// 封装一个POST请求
export const post = async (url: string, data: any = {}) => {
    try {
        validateParams(data);
        const response = await instance({
            url: `${host_url}${url}`,
            method: 'post',
            data,
        });
        return response;
    } catch (error) {
        console.error(`POST 请求错误: ${url}`, error);
        throw error; // 继续抛出错误，供调用方捕获
    }
};