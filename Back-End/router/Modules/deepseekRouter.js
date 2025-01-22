require('dotenv').config({ path: '../../.env' }); // 引入环境变量
// const { pool } = require('../../db/index'); // 引入连接池模块
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模块
const Router = require('@koa/router'); // 导入Koa路由
const OpenAI = require("openai"); // 导入 OpenAI 模块
const { initializeAgent } = require("../../utils/Tools/index"); // 导入初始化代理函数
const { prompt, thinkPrompt } = require('../../utils/Tools/prompt'); // 导入prompt
// const { PromptTemplate } = require("@langchain/core/prompts");
const { githubTool } = require("../../utils/Tools/Modules/githubTool"); // 导入Github工具
const { axiosPost } = require('../../api/index'); // 导入axiosGet函数

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; // 定义深度求索API密钥
const DEEPSEEK_API_BASE_URL = process.env.DEEPSEEK_API_BASE_URL; // 定义深度求索API基础URL

const deepseek = new OpenAI(
    {
        apiKey: DEEPSEEK_API_KEY,
        baseURL: DEEPSEEK_API_BASE_URL,
        tempurature: 0,
        maxTokens: 2000,
    }
); // 创建深度求索API实例

// 定义异步函数(deepseek官方)
const sendMessage = async function ({ question, tool }) {
    console.log("我进来这个函数了,这是提问的问题:", question, tool);
    const str = question + JSON.stringify(tool);
    const completion = await deepseek.chat.completions.create({
        messages: [
            { role: "system", content: thinkPrompt },
            { role: "system", content: prompt },
            { role: "user", content: str }
        ],
        model: "deepseek-chat",
    });
    // console.log("API Response:", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

// 初始化prompt
// const pt = PromptTemplate.fromTemplate(prompt);

router.post('/deepseek', async (ctx) => {
    // 获取body中的question
    const { question } = ctx.request.body;
    const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    if (!authHeader) {
        ctx.status = 401;
        ctx.body = { message: '未授权的访问',code:401 };
        return;
    }

    const token = authHeader;
    // console.log("token", token, "anquanma",SECRET_KEY);

    try {
        let message = '';

        const decoded = jwt.verify(token, SECRET_KEY); // 验证 JWT
        try {
            message = await sendMessage({ question }); // 调用sendMessage函数
            // message = await langchainSeedMessage({ question }); // 调用langchainSendMessage函数

            // 对message进行处理,分割最后一个\n的内容
            
        } catch {
            ctx.status = 500;
            ctx.body = { message: '无法发送消息', code: 500 };
            return;
        } // 调用sendMessage函数
        ctx.body = {
            code: 200,
            msg: message,
            user: {
                username: decoded.username,
                // email: decoded.email,
            },
            type: 'system'
        };
        
    } catch (err) {
        ctx.status = 403;
        ctx.body = { message: '无效的 Token',code:403 };
    }
});
router.post('/devdeepseek', async (ctx) => {
    // 获取body中的question
    const { question } = ctx.request.body;
    // const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    // if (!authHeader) {
    //     ctx.status = 401;
    //     ctx.body = { message: '未授权的访问', code: 401 };
    //     return;
    // }

    // const token = authHeader;
    // console.log("token", token, "anquanma",SECRET_KEY);

    // 检查question中是否含有'GitHub'的关键字
    if (question.includes('GitHub')) {
        console.log("有关键字")
        try {
            let message = '';
            let tool = '';
            const response = await axiosPost('/public/get-github-repo-activity', { username: 'AtomicGlimpses' });
            tool = response.data.repoActivity;
            try {
                message = await sendMessage({ question, tool });
            } catch {
                ctx.status = 500;
                ctx.body = { message: '无法发送消息', code: 500 };
                return;
            } // 调用githubTool.callbacks函数
            ctx.body = {
                code: 200,
                msg: message,
                type: 'system'
            };
        } catch (err) {
            ctx.status = 403;
            ctx.body = { message: '无效的 Token', code: 403 };
        }
    }
    else{
        try {
            let message = '';
            let tool = ''
            try {
                message = await sendMessage({ question,tool }); // 调用sendMessage函数
                // message = await langchainSeedMessage({ question }); // 调用langchainSendMessage函数
                console.log("message:", message);
                
            } catch {
                ctx.status = 500;
                ctx.body = { message: '无法发送消息', code: 500 };
                return;
            } // 调用sendMessage函数
            ctx.body = {
                code: 200,
                msg: message,
                type: 'system'
            };
    
        } catch (err) {
            ctx.status = 403;
            ctx.body = { message: '无效的 Token', code: 403 };
        }
    }

    // try {
    //     let message = '';

    //     // const decoded = jwt.verify(token, SECRET_KEY); // 验证 JWT
    //     try {
    //         message = await sendMessage({ question }); // 调用sendMessage函数
    //         // message = await langchainSeedMessage({ question }); // 调用langchainSendMessage函数
    //         console.log("message:", message);
            
    //     } catch {
    //         ctx.status = 500;
    //         ctx.body = { message: '无法发送消息', code: 500 };
    //         return;
    //     } // 调用sendMessage函数
    //     ctx.body = {
    //         code: 200,
    //         msg: message,
    //         // user: {
    //         //     username: decoded.username,
    //         //     // email: decoded.email,
    //         // },
    //         type: 'system'
    //     };

    // } catch (err) {
    //     ctx.status = 403;
    //     ctx.body = { message: '无效的 Token', code: 403 };
    // }
});

/* langchain */
router.post('/langchain', async (ctx) => {
    const tools = [githubTool.lc_kwargs]; // 初始化工具链
    const langchainAgent = await initializeAgent(); // 初始化代理
    const { question } = ctx.request.body;
    try {
        let message = '';
        try {
            // 使用 LangChain 工具链代理处理问题
            const response = await langchainAgent.call({
                input: question,
                // agent_scratchpad: "", // 初始化为空
                // tool_descriptions: tools.map((tool) => `${tool.name}: ${tool.description}`).join("\n"), // 动态注入工具描述
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
/* langchain */

module.exports = router; // 导出路由