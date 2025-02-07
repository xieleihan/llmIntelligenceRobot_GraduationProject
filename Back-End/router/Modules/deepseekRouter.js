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
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
const puppeteer = require("puppeteer"); // 导入puppeteer模块
const { marked } = require("marked"); // 导入marked模块
const { JSDOM } = require("jsdom"); // 导入jsdom模块
const { create } = require('xmlbuilder2'); // 导入xmlbuilder2模块
const {htmlDocx} = require("html-docx-js"); // 导入html-docx-js模块(已弃用,2016)
const { asBlob } = require("html-docx-js-typescript"); // 导入html-docx-js-typescript模块(2021)
const setFileInfo = require('../../model/Modules/setFileInfo'); // 导入setFileInfo函数

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY; // 定义深度求索API密钥
const DEEPSEEK_API_BASE_URL = process.env.DEEPSEEK_API_BASE_URL; // 定义深度求索API基础URL
const MOONSHOT_API_KEY = process.env.MOONSHOT_API_KEY; // 定义Moonshot API密钥
const MOONSHOT_API_BASE_URL = process.env.MOONSHOT_API_BASE_URL; // 定义Moonshot API基础URL
const server_port = process.env.SERVER_PORT; // 定义POST

const deepseek = new OpenAI(
    {
        apiKey: DEEPSEEK_API_KEY,
        baseURL: DEEPSEEK_API_BASE_URL,
        tempurature: 0,
        maxTokens: 2000,
    }
); // 创建深度求索API实例

const moonshot = new OpenAI(
    {
        apiKey: MOONSHOT_API_KEY,
        baseURL: MOONSHOT_API_BASE_URL,
    }
);

// 定义异步函数(deepseek官方)
const sendMessage = async function ({ question, tool }) {
    console.log("我进来这个函数了,这是提问的问题:", question, tool);
    const str = question + JSON.stringify(tool);
    const completion = await deepseek.chat.completions.create({
        messages: [
            // { role: "system", content: thinkPrompt },
            { role: "system", content: prompt },
            { role: "user", content: str }
        ],
        model: "deepseek-chat",
    });
    console.log("API Response:", completion.choices[0].message.content);
    return completion.choices[0].message.content;
}

// 定义异步函数(MOONSHOT)
const moonshotFunc = async function ({question}) {
    const completion = await moonshot.chat.completions.create({
        model: "moonshot-v1-8k",
        messages: [
            {
                role: "system",
                content:"你是 LLM机器人，由 南秋SouthAki 开发的人工智能助手，你更擅长关于GitHub上的各种开源项目的最新动态信息回答。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。南秋SouthAki 为专有名词，不可翻译成其他语言。"
            },
            {
                role: "user",
                content: question
            }
        ],
        tempurature: 1,
    });

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
    const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    if (!authHeader) {
        ctx.status = 401;
        ctx.body = { message: '未授权的访问', code: 401 };
        return;
    }

    const token = authHeader;
    // console.log("token", token, "anquanma",SECRET_KEY);

    // 检查question中是否含有'GitHub'的关键字(这是查找别人的信息,需要使用[])
    if (question.includes('GitHub') || question.includes('github') || question.includes('Git') || question.includes('git') || question.includes('gitHub') || question.includes('GITHUB') || question.includes('GITHUB') || question.includes('Github')) {
        try {
            let message = '';
            let tool = '';

            // 使用正则把question中[ ] 的内容提取出来
            const reg = /\[(.+?)\]/g;
            const res = reg.exec(question);
            const username = res[0];

            const decoded = jwt.verify(token, SECRET_KEY);
            const response = await axiosPost('/public/get-github-repo-activity', { username: username });
            tool = response.data.repoActivity;
            try {
                message = await sendMessage({ question, tool });

                // 把内容存入数据库
                setFileInfo(decoded.username, question, message);
            } catch {
                ctx.status = 500;
                ctx.body = { message: '无法发送消息', code: 500 };
                return;
            } // 调用githubTool.callbacks函数
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
            ctx.body = { message: '无效的 Token', code: 403 };
        }
    } else if (question.includes('关注')) {
        try {
            let message = '';
            let tool = '';
            const decoded = jwt.verify(token, SECRET_KEY);
            const response = await axiosPost('/public/get-github-starred-repos', { username: decoded.username });
            console.log(response)
            tool = response.data.repos;
            try {
                message = await sendMessage({ question, tool });
                ctx.body = {
                    code: 200,
                    msg: message,
                    user: {
                        username: decoded.username,
                        // email: decoded.email,
                    },
                    type: 'system'
                };
            } catch {
                ctx.status = 500;
                ctx.body = { message: '无法发送消息', code: 500 };
                return;
            } // 调用githubTool.callbacks函数
        } catch (err) {
            ctx.status = 403;
            ctx.body = { message: '无效的 Token', code: 403 };
        }

    } else if (question.includes('自己')) {
        try {
            let message = '';
            let tool = '';
            const decoded = jwt.verify(token, SECRET_KEY);
            const response = await axiosPost('/public/get-github-repos', { username: decoded.username });
            console.log(response)
            tool = response.data.repos;
            try {
                message = await sendMessage({ question, tool });
                ctx.body = {
                    code: 200,
                    msg: message,
                    user: {
                        username: decoded.username,
                        // email: decoded.email,
                    },
                    type: 'system'
                };
            } catch {
                ctx.status = 500;
                ctx.body = { message: '无法发送消息', code: 500 };
                return;
            } // 调用githubTool.callbacks函数
        } catch (err) {
            ctx.status = 403;
            ctx.body = { message: '无效的 Token', code: 403 };
        }
    }
    else{
        try {
            let message = '';
            let tool = ''
            const decoded = jwt.verify(token, SECRET_KEY);
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
                user: {
                    username: decoded.username,
                    // email: decoded.email,
                },
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

// 给Telegram使用的模型调用方法
router.post('/telebot', async (ctx) => {
    const { question } = ctx.request.body;
    
    try {
        let message = '';
        try {
            // message = await moonshotFunc({ question });
            message = await sendMessage({ question });// 深度求索
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
})

module.exports = router; // 导出路由