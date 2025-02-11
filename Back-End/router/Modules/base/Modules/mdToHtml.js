require('dotenv').config({ path: '../../../../.env' }); // 引入环境变量
const Router = require('@koa/router'); // 导入Koa路由
const {marked} = require("marked"); // 导入marked

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

router.post('/md-to-html', async (ctx) => {
    const { md } = ctx.request.body; // 获取请求体中的 md
    
    if (!md) {
        ctx.body = { error: "缺少 md 参数" };
        return;
    }

    try {
        const htmlContent = await marked(md); // Markdown 转 HTML
        ctx.body = { result: htmlContent, code: 200 };
    }catch (error) {
        ctx.body = { error: error.message };
    }
});

module.exports = router;