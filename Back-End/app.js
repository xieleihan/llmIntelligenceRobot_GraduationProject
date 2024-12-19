// 导入Koa框架
const Koa = require('koa');
// 导入Koa路由模块
const Router = require('@koa/router');

// 插件
const dotenv = require('dotenv');


// 创建一个Koa对象表示web app本身
const app = new Koa();
// 创建一个Router对象表示web app的路由
const router = new Router();

// 读取环境变量
dotenv.config();

// 检测是否安装成功Koa
// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

// 检查路由的正常
router.get('/', async (ctx) => {
    ctx.body = 'Hello World!';
});

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));

// 监听端口
app.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.SERVER_PORT}`);
});