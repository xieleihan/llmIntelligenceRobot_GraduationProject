const userRouter = require('./Modules/user');
const createSvgCodeRouter = require('./Modules/createSvgCode');
const emailApiRouter = require('./Modules/emailRouter');
const testGet = require('./Modules/testAxios');
const deepseekRouter = require('./Modules/deepseekRouter');

// 导出全部引入的模块
module.exports = {
    userRouter,
    createSvgCodeRouter,
    emailApiRouter,
    testGet,
    deepseekRouter
};