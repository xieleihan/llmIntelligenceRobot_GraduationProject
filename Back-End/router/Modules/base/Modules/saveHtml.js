require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
const { marked } = require("marked"); // 导入marked模块

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const server_port = process.env.SERVER_PORT; // 定义POST

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

module.exports = router;