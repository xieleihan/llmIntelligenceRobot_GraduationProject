require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const fs = require('fs'); // 导入fs模块
const path = require('path'); // 导入path模块

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const server_port = process.env.SERVER_PORT; // 定义POST

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
});

module.exports = router;