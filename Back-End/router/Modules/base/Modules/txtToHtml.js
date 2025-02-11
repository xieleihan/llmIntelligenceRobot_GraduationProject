require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

router.post('/txt-to-html', async (ctx) => {
    const { txt } = ctx.request.body; // 获取请求体中的 txt
    
    if (!txt) {
        ctx.body = { error: "缺少 txt 参数" };
        return;
    }

    try {
        const htmlContent = `
        <pre>${txt.replace(/\n/g, "<br>")}</pre>
        `
        ctx.body = { result: htmlContent, code: 200 };
    }catch (error) {
        ctx.body = { error: error.message };
    }
});

module.exports = router;