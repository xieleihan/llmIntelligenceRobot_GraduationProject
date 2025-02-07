require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块
const puppeteer = require("puppeteer"); // 导入puppeteer模块
const { marked } = require("marked"); // 导入marked模块

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const server_port = process.env.SERVER_PORT; // 定义POST

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

module.exports = router;