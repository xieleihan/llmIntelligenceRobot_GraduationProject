const user = require('./Modules/user'); // 导出用户的sql语句
const github = require('./Modules/github'); // 导出GitHub的sql语句

// 导出全部引入的模块
module.exports = {
    user,
    github
};