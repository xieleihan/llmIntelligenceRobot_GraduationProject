require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const mammoth = require("mammoth"); // 导入mammoth
const fs = require("fs"); // 导入fs
const path = require('path'); // 导入path
// const mammoth = require("mammoth"); // 导入mammoth
const wordToHtml = require('word-to-html');
const docx4js = require("docx4js");

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const staticDir = path.join(__dirname, "../../../../public/static");

async function docxToHtml(docxPath) {
    try {
        const doc = await docx4js.load(fs.readFileSync(docxPath));
        console.log(doc);
        const htmlResult = doc.toHtml();
        // const docxBuffer = await fs.readFileSync(docxPath); // 读取 DOCX 文件
        // const result = await mammoth.convertToHtml({ buffer: docxBuffer });
        // const htmlResult = await wordToHtml.convert(docxBuffer);
        console.log(htmlResult);
        return htmlResult.value; // 返回 HTML
    } catch (error) {
        throw new Error("DOCX 转换失败: " + error.message);
    }
}

router.post("/docx-to-html", async (ctx) => {
    try {
        const { docxFilename } = ctx.request.body; // 获取请求体中的 docxFilename
        if (!docxFilename) {
            ctx.body = { error: "缺少 docxFilename 参数" };
            return;
        }

        const filePath = path.join(staticDir, docxFilename);

        // 转换 DOCX 为 HTML
        const htmlResult = await docxToHtml(filePath);

        ctx.body = { result: htmlResult, code: 200 };
    } catch (error) {
        ctx.body = { error: error.message };
    }
});

module.exports = router;