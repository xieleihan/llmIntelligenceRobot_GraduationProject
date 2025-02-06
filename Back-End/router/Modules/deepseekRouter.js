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
const {asBlob} = require("html-docx-js-typescript"); // 导入html-docx-js-typescript模块(2021)

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

    // 检查question中是否含有'GitHub'的关键字
    if (question.includes('GitHub')) {
        try {
            let message = '';
            let tool = '';
            const response = await axiosPost('/public/get-github-repo-activity', { username: 'AtomicGlimpses' });
            tool = response.data.repoActivity;
            const decoded = jwt.verify(token, SECRET_KEY);
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
            const response = await axiosPost('/public/get-github-starred-repos', { username: 'AtomicGlimpses' });
            console.log(response)
            tool = response.data.repos;
            const decoded = jwt.verify(token, SECRET_KEY);
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
            const response = await axiosPost('/public/get-github-repos', { username: 'AtomicGlimpses' });
            console.log(response)
            tool = response.data.repos;
            const decoded = jwt.verify(token, SECRET_KEY);
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
            message = await moonshotFunc({ question });
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

// 接收Markdown内容并保存在文件中
router.post('/save-md', async (ctx) => {
    // console.log("触发")
    const { filename, content } = ctx.request.body;

    // 检查参数是否为空
    if (!filename || !content) {
        ctx.body = { code: 400, message: '参数错误,文件名和内容不能重复' };
        return;
    }
    // 生成 .md 文件路径
    const staticDir = path.join(__dirname, '../../public/static');
    const filePath = path.join(staticDir, `${filename}.md`);

    try {
        // 使用 `fs.promises.writeFile` 进行异步写入
        await fs.promises.writeFile(filePath, content, "utf8");

        ctx.body = {
            code: 200,
            message: "保存成功",
            url: `http://localhost:${server_port}/static/${filename}.md`,
        };
    } catch (error) {
        console.error("写入文件失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "保存失败" };
    }
})

// 接收Markdown内容转换成PDF并保存
router.post('/save-pdf', async (ctx) => {
    const { filename, content } = ctx.request.body;

    // 校验参数
    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }
    const staticDir = path.join(__dirname, '../../public/static');
    const pdfPath = path.join(staticDir, `${filename}.pdf`);

    try {
        // 📝 1. 把 Markdown 转换为 HTML
        const htmlContent = `
        <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1, h2, h3 { color: #333; }
                    pre { background: #f4f4f4; padding: 10px; }
                </style>
            </head>
            <body>
                 ${await marked.parse(content)}
            </body>
        </html>`;

        // 🖥️ 2. 启动 Puppeteer，生成 PDF
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent, { waitUntil: "load" });
        await page.pdf({ path: pdfPath, format: "A4" });

        await browser.close();

        ctx.body = {
            code: 200,
            message: "PDF 生成成功",
            url: `http://localhost:${server_port}/static/${filename}.pdf`,
        };
    } catch (error) {
        console.error("生成 PDF 失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "PDF 生成失败" };
    }
})

// 接收Markdown内容转换成XML并保存
router.post('/save-xml', async (ctx) => {
    const { filename, content } = ctx.request.body;

    // 校验参数
    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        // Markdown 转 HTML
        const htmlContent = await marked.parse(content);

        // HTML 转 XML
        const dom = new JSDOM(htmlContent);
        const document = dom.window.document;

        const xmlObj = { document: {} };
        const convertElement = (node) => {
            if (node.nodeType === 3) {
                return node.textContent.trim() ? node.textContent : null;
            }
            if (node.nodeType !== 1) return null;

            const obj = { [node.tagName.toLowerCase()]: {} };
            if (node.attributes.length) {
                obj[node.tagName.toLowerCase()].$ = {};
                for (let attr of node.attributes) {
                    obj[node.tagName.toLowerCase()].$[attr.name] = attr.value;
                }
            }

            let children = [];
            for (let child of node.childNodes) {
                let converted = convertElement(child);
                if (converted) children.push(converted);
            }
            if (children.length) {
                obj[node.tagName.toLowerCase()]._ = children;
            }
            return obj;
        };

        xmlObj.document = convertElement(document.body) || {};

        // 生成 XML 字符串
        const xmlString = create(xmlObj).end({ prettyPrint: true });

        // 保存到 static 目录
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        const xmlPath = path.join(staticDir, `${filename}.xml`);
        fs.writeFileSync(xmlPath, xmlString);

        ctx.body = {
            code: 200,
            message: "XML 生成成功",
            url: `http://localhost:${server_port}/static/${filename}.xml`,
        };
    } catch (error) {
        console.error("XML 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "XML 生成失败" };
    }
})

// 接收Markdown内容转换成HTML并保存
router.post('/save-html', async (ctx) => {
    const { filename, content } = ctx.request.body;

    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        // Markdown 转 HTML
        const htmlContent = `
        <html>
            <head>
                <meta charset="UTF-8">
                <title>${filename}</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1, h2, h3 { color: #333; }
                    pre { background: #f4f4f4; padding: 10px; }
                </style>
            </head>
            <body>
                ${marked(content)}
            </body>
        </html>`;

        // 保存到 static 目录
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        const htmlPath = path.join(staticDir, `${filename}.html`);
        fs.writeFileSync(htmlPath, htmlContent);

        ctx.body = {
            code: 200,
            message: "HTML 生成成功",
            url: `http://localhost:${server_port}/static/${filename}.html`,
        };
    } catch (error) {
        console.error("HTML 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "HTML 生成失败" };
    }
})

// 将Markdown转为DOCX并保存
router.post('/save-docx', async (ctx) => { 
    const { filename, content } = ctx.request.body;

    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        // Markdown 转 HTML
        const htmlContent = `
        <html>
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    h1, h2, h3 { color: #333; }
                    pre { background: #f4f4f4; padding: 10px; }
                </style>
            </head>
            <body>
                ${marked(content)}
            </body>
        </html>`;

        // HTML 转 DOCX
        const docxBuffer = await asBlob(htmlContent);

        // 保存到 static 目录
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        const wordPath = path.join(staticDir, `${filename}.docx`);
        fs.writeFileSync(wordPath, docxBuffer);

        ctx.body = {
            code: 200,
            message: "Word 文件生成成功",
            url: `http://localhost:${server_port}/static/${filename}.docx`,
        };
    } catch (error) {
        console.error("Word 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "Word 生成失败" };
    }
});

// 将Markdown转为JSON并保存
router.post('/save-json', async (ctx) => {
    const { filename, content } = ctx.request.body;

    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        const htmlContent = marked.parse(content); // Markdown 转 HTML
        const { mdToJson } = require('../../utils/Tools/Modules/mdToJson'); // 导入mdToJson函数
        const jsonContent = mdToJson(htmlContent); // HTML 转 JSON

        // 保存到 static 目录
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        const jsonPath = path.join(staticDir, `${filename}.json`);
        fs.writeFileSync(jsonPath, JSON.stringify(jsonContent, null, 2));

        ctx.body = {
            code: 200,
            message: "JSON 文件生成成功",
            url: `http://localhost:${server_port}/static/${filename}.json`,
        };
    } catch (error) {
        console.error("JSON 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "JSON 生成失败" };
    }
})

// 将Markdown转为TXT并保存
router.post('/save-txt', async (ctx) => {
    const { filename, content } = ctx.request.body;

    if (!filename || !content) {
        ctx.status = 400;
        ctx.body = { code: 400, message: "参数错误, 文件名和内容不能为空" };
        return;
    }

    try {
        // 1. Markdown 转 纯文本
        const plainText = marked(content)
            .replace(/<\/?[^>]+(>|$)/g, "") // 移除 HTML 标签
            .replace(/&nbsp;/g, " ") // 替换空格符
            .replace(/\n\s*\n/g, "\n") // 去掉多余的空行
            .trim();

        // 2. 确保 static 目录存在
        const staticDir = path.join(__dirname, "../../public/static");
        if (!fs.existsSync(staticDir)) fs.mkdirSync(staticDir, { recursive: true });

        // 3. 生成 TXT 文件
        const txtPath = path.join(staticDir, `${filename}.txt`);
        fs.writeFileSync(txtPath, plainText, "utf-8");

        // ✅ 4. 返回成功响应
        ctx.body = {
            code: 200,
            message: "TXT 文件生成成功",
            url: `http://localhost:${server_port}/static/${filename}.txt`,
        };
    } catch (error) {
        console.error("TXT 生成失败:", error);
        ctx.status = 500;
        ctx.body = { code: 500, message: "TXT 生成失败" };
    }
})

module.exports = router; // 导出路由