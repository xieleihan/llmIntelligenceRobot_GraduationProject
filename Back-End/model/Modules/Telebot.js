const { axiosPost } = require('../../api/index');

/**
 * 获取月之暗面返回的消息
 * @param {string} question 
 * @returns text
 */
const getMoonshotMessage = async (question,username) => {
    const res = await axiosPost('/protected/telebot', {
        question,
        username
    });
    console.log("res",res)
    return res.data.msg;
}

module.exports = {
    getMoonshotMessage,
};