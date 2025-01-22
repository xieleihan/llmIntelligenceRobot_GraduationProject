// 导入Koa框架
const Koa = require('koa');
// 导入Koa路由模块
const Router = require('@koa/router');
// 导入跨域cors
const cors = require('@koa/cors');
// 导入解析请求体
const bodyParser = require('koa-bodyparser');
// 引入连接池关闭方法
// const { closePool } = require('./db/index');
// 引入WebSocket模块
const WebSocket = require('ws');

const { initializeAgentExecutorWithOptions } = require("langchain/agents");
const { ChatOpenAI } = require("@langchain/openai");
const { Tool } = require("langchain/tools");
const OpenAI = require("openai"); // 导入 OpenAI 模块
const { ZeroShotAgent } = require("langchain/agents");

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

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥
const DEEPSEEK_API_KEY = process.env.DASHSCOPE_API_KEY; // 定义深度求索API密钥
const DEEPSEEK_API_BASE_URL = process.env.DASHSCOPE_BASE_URL; // 定义深度求索API基础URL

const githubTool = new Tool({
    name: "GithubRepoUpdates", // 工具名称
    description: "获取用户在 GitHub 上的最新动态信息。例如 '获取 GitHub 用户 SouthAki 的最新动态'",
    func: async (query) => { // 使用 `func` 或 `execute` 而不是 `call`
        const username = query.trim();
        // 模拟返回数据
        return `这是 GitHub 用户 ${username} 的最新动态 (模拟数据)。`;
    },
});
console.log(githubTool)

const llm = new ChatOpenAI({
    apiKey: DEEPSEEK_API_KEY,
    temperature: 0.7,
    maxTokens: 2000,
    model: "qwen-max",
    baseURL: DEEPSEEK_API_BASE_URL
});

console.log(llm)

// 初始化工具链
const tools = [githubTool];

// 创建代理执行器
async function initializeAgent() {
    console.log(tools[0])
    console.log("工具链初始化中:", tools.map((tool) => ({
        name: tool.name,
        description: tool.description,
    })));
    llm.baseURL = DEEPSEEK_API_BASE_URL;
    llm.apiKey = DEEPSEEK_API_KEY;
    llm.clientConfig.baseURL = DEEPSEEK_API_BASE_URL;
    const agent = ZeroShotAgent.fromLLMAndTools(llm,
        tools, {
        outputParser: new CustomOutputParser(),
    });
    const agentExecutor = await initializeAgentExecutorWithOptions([githubTool.lc_kwargs], llm, {
        agentType: "chat-zero-shot-react-description", // 零次调用反应式描述
        verbose: true, // 打印日志
        agent
    });

    console.log("工具链代理已初始化");
    return agentExecutor;
}

// 使用bodyParser解析请求体
app.use(bodyParser());

router.post('/langchain', async (ctx) => {
    const langchainAgent = await initializeAgent(); // 初始化代理
    const { question } = ctx.request.body;
    try {

        let message = '';
        try {
            // 使用 LangChain 工具链代理处理问题
            const response = await langchainAgent.call({
                input: question,
            });

            message = response.output; // 生成的答案
        } catch (err) {
            console.error("调用工具链出错:", err);
            ctx.status = 500;
            ctx.body = { message: '工具调用失败', code: 500 };
            return;
        }

        ctx.body = {
            code: 200,
            msg: message,
            type: 'system',
        };
    } catch (err) {
        ctx.status = 403;
        ctx.body = { message: '无效的 Token', code: 403 };
    }
});

// 静态资源分发
app.use(require('koa-static')(__dirname + '/public'));

// 捕获全局异常
// app.on('error', (err, ctx) => {
//     console.error('后端项目有错误,已经抛出:', err, ctx);
// });

// 关闭连接池
// process.on('SIGINT', async () => {
//     console.log('收到 SIGINT 信号，开始关闭数据库连接池');
//     await closePool();
//     process.exit(0);
// });

app.use(router.routes());
app.use(router.allowedMethods());

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