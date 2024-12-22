const Router = require('@koa/router');
const router = new Router();
const captcha = require('../../utils/svgCaptcha');

router.get('/createSvgCode', async (ctx) => {
    // 生成验证码
    const svg = captcha();
    // 打印验证码
    console.log("这是生成的验证码:", svg.text);
    ctx.body = svg;
});

module.exports = router;