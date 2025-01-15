import { getOut, post } from './index';

export const sendMsg = function (data: any) {
    return post('/protected/deepseek', data);
};

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params: any) {
    return getOut('https://api.vore.top/api/IPdata', params);
}