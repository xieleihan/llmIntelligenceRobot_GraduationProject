const user = require('./Modules/user'); // 导出用户的sql语句
const github = require('./Modules/github'); // 导出GitHub的sql语句
const serverState = require('./Modules/serverState'); // 导出服务端状态获取函数
const setFileInfo = require('./Modules/setFileInfo'); // 导出设置文件信息的函数

// 导出全部引入的模块
module.exports = {
    user,
    github,
    serverState,
    setFileInfo,
};