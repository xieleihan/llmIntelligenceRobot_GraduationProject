import { get, post } from './index';

export const sendMsg = function (data: any) {
    return post('/protected/deepseek', data);
};