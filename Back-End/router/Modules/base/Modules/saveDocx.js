require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
const { marked } = require("marked"); // 导入marked模块
const { asBlob } = require("html-docx-js-typescript"); // 导入html-docx-js-typescript模块(2021)

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const server_port = process.env.SERVER_PORT; // 定义POST

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

module.exports = router;