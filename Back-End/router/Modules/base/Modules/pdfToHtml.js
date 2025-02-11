require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require("fs");
const path = require('path'); // 导入path
const pdfParse = require("pdf-parse");
const { encode } = require("html-entities"); // 处理 HTML 特殊字符

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const staticDir = path.join(__dirname, "../../../../public/static");

async function pdfToHtml(filePath) {
    const dataBuffer = fs.readFileSync(filePath);
    const pdfData = await pdfParse(dataBuffer);

    const text = pdfData.text.trim(); // 获取文本内容
    const escapedText = encode(text); // 转义 HTML 特殊字符
    const html = `<p>${escapedText.replace(/\n/g, "</p><p>")}</p>`; // 用 <p> 包裹换行

    return html;
}

router.post('/pdf-to-html', async (ctx) => {
    const { pdfName } = ctx.request.body; // 获取请求体中的 pdf
    
    if (!pdfName) {
        ctx.body = { error: "缺少 pdfName 参数" };
        return;
    }

    const filePath = path.join(staticDir, pdfName);

    const htmlContent = await pdfToHtml(filePath);

    ctx.body = { result: htmlContent, code: 200 };
});

module.exports = router;