import { get, post } from './index';

const sendMsg = function (data: any) {
    return post('/sendMsg', data);
}

export default {
    sendMsg
}

// 该文件未经过测试，仅供参考