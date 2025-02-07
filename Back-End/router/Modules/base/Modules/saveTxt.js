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

module.exports = router;