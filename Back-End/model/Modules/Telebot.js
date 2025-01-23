const { axiosPost } = require('../../api/index');

/**
 * 获取月之暗面返回的消息
 * @param {string} question 
 * @returns text
 */
const getMoonshotMessage = async (question) => {
    const res = await axiosPost('/protected/telebot', {
        question,
    });
    console.log("res",res)
    return res.data.msg;
}

module.exports = {
    getMoonshotMessage,
};