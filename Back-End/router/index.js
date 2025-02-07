const userRouter = require('./Modules/user');
const createSvgCodeRouter = require('./Modules/createSvgCode');
const emailApiRouter = require('./Modules/emailRouter');
const testGet = require('./Modules/testAxios');
const deepseekRouter = require('./Modules/deepseekRouter');
const githubRouter = require('./Modules/githubRouter');
const getServerStateRouter = require('./Modules/serverStateRouter');
const superAdminRouter = require('./Modules/superAdminRouter');
const TelegramRouter = require('./Modules/TelerafRouter');
const getFileInfoRouter = require('./Modules/getFileInfo');
const utilsIndex = require('./Modules/base/index');

// 导出全部引入的模块
module.exports = {
    userRouter,
    createSvgCodeRouter,
    emailApiRouter,
    testGet,
    deepseekRouter,
    githubRouter,
    getServerStateRouter,
    superAdminRouter,
    TelegramRouter,
    getFileInfoRouter,
    utilsIndex
};