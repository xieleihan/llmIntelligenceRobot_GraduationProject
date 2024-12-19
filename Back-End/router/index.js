const userRouter = require('./Modules/user');
const createSvgCodeRouter = require('./Modules/createSvgCode');
const emailApiRouter = require('./Modules/emailRouter');

// 导出全部引入的模块
module.exports = {
    userRouter,
    createSvgCodeRouter,
    emailApiRouter
};