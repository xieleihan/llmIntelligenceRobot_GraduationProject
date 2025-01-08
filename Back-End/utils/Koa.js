const Koa = require('koa'); // 导入Koa框架
const bodyParser = require('koa-bodyparser'); // 导入解析请求体
const Router = require('@koa/router'); // 导入Koa路由
// 导入跨域cors
const cors = require('@koa/cors');

const { userRouter } = require('../router/index'); // 导入Koa路由

const app = new Koa(); // 创建一个Koa对象表示web app本身

// 使用跨域
app.use(cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // 允许所有域名访问
    origin: function (ctx) {
        return ctx.header.origin;
    }
}));

// 创建一个Router对象表示web app的路由
const router = new Router();
app.use(router.routes());
app.use(bodyParser()); // 使用中间件解析请求体
app.use(router.allowedMethods()); // 使用路由

// 插件
app.use(userRouter.routes()); // 使用用户路由

module.exports = app; // 导出app