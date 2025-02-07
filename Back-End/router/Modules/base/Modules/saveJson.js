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
        const { mdToJson } = require('../../../../utils/Tools/Modules/mdToJson'); // 导入mdToJson函数
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

module.exports = router;