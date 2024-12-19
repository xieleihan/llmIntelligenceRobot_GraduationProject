const Router = require('@koa/router');
// 导入处理邮箱的模块
const emailApi = require('../../utils/Modules/emailApi');

// 创建 Koa 路由实例
const router = new Router({
    prefix: '/api/email', // 添加统一的路由前缀
});

// 发送 QQ 邮箱验证码的接口
// URL: /api/email/send
router.get('/send', async (ctx) => {
    const { email } = ctx.query;
    console.log("准备向这个邮箱发送验证码:",email);

    try {
        await emailApi.getEmailCode(ctx);
        // ctx.body = data; // 返回响应数据
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '准备向这个邮箱发送验证码,发送验证码失败。',
            error,
        };
    }
});

// 发送邮件的接口
// URL: /api/email/sendemail
router.get('/sendemail', async (ctx) => {
    const { email, uuid, date, from, to, type, randomNumber, base64 } = ctx.query;
    console.log(email, base64);

    try {
        await emailApi.sendeqqmail(ctx);
        // ctx.body = data; // 返回响应数据
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: '发送失败。',
            error,
        };
    }
});

// 验证 QQ 邮箱和验证码的接口
// URL: /api/email/verify
router.get('/verify', async (ctx) => {
    const { email, email_code } = ctx.query;

    try {
        await emailApi.verifyEmailCode(ctx);
        // ctx.body = data;

        // 如果验证成功，则删除验证码
        // if (ctx.body.data.code === 200) {
        //     await emailApi.removeEmailCode(ctx);
        // }
    } catch (error) {
        ctx.body = {
            code: -1,
            msg: 'verify接口外层,邮箱验证失败。',
            error,
        };
    }
});

// 暴露路由
module.exports = router;
