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
// 引入WebSocket模块
const WebSocket = require('ws');

// 插件
// 获取环境变量插件
const dotenv = require('dotenv');

// 创建一个Koa对象表示web app本身
const app = new Koa();
// 创建一个Router对象表示web app的路由
const router = new Router();
// 创建一个WebSocket服务器
const wss = new WebSocket.Server({ noServer: true });

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

// 设置超时时间
app.timeout = 1000 * 60 * 10; // 10分钟

// 使用跨域
app.use(cors({
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // 允许所有域名访问
    origin: function (ctx) {
        return ctx.header.origin;
    }
}));

// 导入功能路由模块
const { userRouter, createSvgCodeRouter, emailApiRouter, testGet, deepseekRouter, githubRouter, getServerStateRouter, superAdminRouter, TelegramRouter, getFileInfoRouter } = require('./router/index');
const utilsIndex = require('./router/Modules/base/index');

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
app.use(deepseekRouter.routes()); // 深度求索路由
app.use(githubRouter.routes()); // github路由
app.use(getServerStateRouter.routes()); // 服务器状态路由
app.use(superAdminRouter.routes()); // 超级管理员路由
app.use(getFileInfoRouter.routes()); // 文件信息路由
app.use(utilsIndex.saveMd.routes()); // 保存Markdown路由
app.use(utilsIndex.saveJson.routes()); // 保存JSON路由
app.use(utilsIndex.saveTxt.routes()); // 保存TXT路由
app.use(utilsIndex.saveHtml.routes()); // 保存HTML路由
app.use(utilsIndex.savePdf.routes()); // 保存PDF路由
app.use(utilsIndex.saveXml.routes()); // 保存XML路由
app.use(utilsIndex.saveDocx.routes()); // 保存DOCX路由
app.use(utilsIndex.getSaveNumber.routes()); // 统计文件数量路由

// Telegram导出的bot,运行
TelegramRouter.launch().then(() => {
    console.log('Telegram bot is running');
});

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));

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

// 将http服务器与WebSocket服务器绑定
// 捕获升级请求
app.on('upgrade', (request, socket, head) => {
    // 处理升级为 WebSocket
    try {
        wss.handleUpgrade(request, socket, head, (ws) => {
            // 成功升级后，调用回调函数，将 WebSocket 对象传递给 wss.emit('connection', ...)。
            wss.emit('connection', ws, request);
        });
    } catch (error) {
        // 处理错误,销毁socket
        socket.destroy();
        console.error('WebSocket服务器升级失败:', error);
    }
});