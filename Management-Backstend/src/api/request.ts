import { getOut, post,get } from './index';

/**
 * 发送消息给Deepseek
 * @param data 
 * @returns 
 */
export const sendMsg = function (data: any) {
    return post('/protected/deepseek', data);
};

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.ip
 */
export const getUserIp = function (params: any){
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 超级管理员登录
 * @param {object} data
 * @returns res
 */
export const adminLogin = function (data: any) { 
    return post('/private/superadminlogin', data);
}

/**
 * 获取中国用户访问数据
 * @returns {object} res
 * @returns {object.province} res.province
 * @renturn {object.value} res.value
 */
export const chinaDataList = function () {
    return get('/private/get-china-datalist');
}

/**
 * 获取服务器状态
 * @returns {object} res
 */
export const getServerStatus = function () {
    return get('/private/get-server-state');
}