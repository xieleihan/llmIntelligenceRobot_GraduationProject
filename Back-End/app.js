// 导入Koa框架
const Koa = require('koa');
// 导入Koa路由模块
const Router = require('@koa/router');
// 导入跨域cors
const cors = require('@koa/cors');
// 导入解析请求体
const bodyParser = require('koa-bodyparser');
// 引入连接池关闭方法
const { closePool } = require('./db/index');

// 插件
// 获取环境变量插件
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

// 检查路由的正常(GET)
// router.get('/test/get', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 检查路由的正常(POST)
// router.post('/test/post', async (ctx) => {
//     ctx.body = 'Hello World!';
// });

// 导入功能路由模块
const { userRouter, createSvgCodeRouter, emailApiRouter, testGet } = require('./router/index');

// 使用路由
app.use(router.routes());
app.use(router.allowedMethods());
// 使用中间件解析请求体
app.use(bodyParser());

// 插件
app.use(userRouter.routes()); // 使用用户路由
app.use(createSvgCodeRouter.routes()); // 图片验证码路由
app.use(emailApiRouter.routes()); // 邮箱验证码路由
app.use(testGet.routes()); // 代理请求路由

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));

// 使用跨域
app.use(cors());

// 捕获全局异常
app.on('error', (err, ctx) => {
    console.error('后端项目有错误,已经抛出:', err, ctx);
});

// 关闭连接池
process.on('SIGINT', async () => {
    console.log('收到 SIGINT 信号，开始关闭数据库连接池');
    await closePool();
    process.exit(0);
});

// 监听端口
app.listen(process.env.SERVER_PORT, () => {
    console.log('---------------Start info---------------');
    console.log(`Server is running at http://localhost:${process.env.SERVER_PORT}`); // 运行提示
    console.log('----------------------------------------');
    console.log("发件邮箱信息:", process.env.EMAIL," 授权码:", process.env.EMAIL_PASSWORD); // 邮箱信息
});