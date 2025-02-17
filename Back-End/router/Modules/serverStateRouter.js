require('dotenv').config({ path: '../../.env' }); // 引入环境变量

const Router = require('@koa/router');
const WebSocket = require('ws'); // 导入WebSocket模块
// 创建 WebSocket 服务器
const wss = new WebSocket.Server({ noServer: true });
const jwt = require('jsonwebtoken'); // 导入 jsonwebtoken 模块
const { serverState } = require('../../model/index'); // 导入服务端状态获取函数
const { exec } = require('child_process');//使用 Node.js 的 child_process 模块 来执行命令行 ping 命令。
const util = require('util');

// 将 exec 封装为返回 Promise 的函数
const execPromise = util.promisify(exec);

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

const router = new Router(
    {
        prefix: '/private',
    }
);

// 定义用于ping Telegram服务器的Get接口
router.get('/ping-telegram', async (ctx) => {
    const telegramServer = 'telegram.org'; // 定义Telegram的服务器地址
    const command = `ping ${telegramServer}`; // Windows 系统的 ping 命令

    try {
        // 使用 execPromise 执行 ping 命令
        const { stdout, stderr } = await execPromise(command);

        // 输出 ping 命令的结果
        if (stdout.includes('time=')) {
            ctx.status = 200;
            ctx.body = {
                message: 'Telegram 服务器正常',
                code: 200,
            };
        } else {
            ctx.status = 500;
            ctx.body = {
                message: 'Telegram 服务器不可用',
                code: 500,
            };
        }
    } catch (error) {
        // 处理错误
        console.error(error);
        ctx.status = 500;
        ctx.body = {
            message: '服务器错误',
            code: 500,
        };
    }
});

router.get('/get-server-state', async (ctx) => {
    const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    if (!authHeader) {
        ctx.status = 401;
        ctx.body = { message: '未授权的访问', code: 401 };
        return;
    }

    const token = authHeader;
    if (!jwt.verify(token, SECRET_KEY)) {
        return ctx.body = { message: 'token过期或者无效', code: 400 };
    }

    const req = ctx.req;
    const res = ctx.res;

    // 升级为 WebSocket 连接
    if (req.headers['upgrade'] === 'websocket') {
        wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (ws) => {
            wss.emit('connection', ws, req);
        });
        ctx.status = 101;
    } else {
        // ctx.body = { error: 'Not a WebSocket request' };
        // 建立失败的
        const response = await serverState.getServerState();
        ctx.body = response;
    }
});

// WebSocket 连接处理
wss.on('connection', (ws) => {
    console.log('Client connected');

    // 定时发送系统信息
    const interval = setInterval(async () => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(await serverState.getServerState()));
        }
    }, 2000);

    // 处理客户端断开连接
    ws.on('close', () => {
        console.log('Client disconnected');
        clearInterval(interval);
    });
});

module.exports = router;