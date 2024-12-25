const Router = require('@koa/router');
const router = new Router();
const captcha = require('../../utils/svgCaptcha');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../../db/index');
const schedule = require('node-schedule');

router.get('/createSvgCode', async (ctx) => {
    // 生成验证码
    const svg = captcha();
    // 打印验证码
    console.log("这是生成的验证码:", svg.text);
    // 写入数据库
    const sql = `INSERT INTO db_verifyImage_code (verifyImage_code, code_id) VALUES (?, ?)`;

    await pool.query(sql, [svg.text, uuidv4()]);
    ctx.body = svg;
});

router.get('/verifySvgCode', async (ctx) => {
    const { svgCode } = ctx.query;
    const sql = `SELECT verifyImage_code FROM db_verifyImage_code WHERE verifyImage_code = ?`;
    const [rows] = await pool.query(sql, [svgCode]);
    if (rows.length === 1) {
        // 删除验证码
        const sql = `DELETE FROM db_verifyImage_code WHERE verifyImage_code = ?`;
        await pool.query(sql, [svgCode]);
        ctx.body = { code: 200, msg: '验证码验证成功' };
    } else {
        ctx.body = { code: -1, msg: '验证码验证失败' };
    }
});

schedule.scheduleJob('*/3 * * * *', async () => {
    try {
        console.log('清空验证码表任务执行中...');
        const sqlDelete = `DELETE FROM db_verifyImage_code`;
        await pool.query(sqlDelete);
        console.log('验证码表已清空');
    } catch (err) {
        console.error('清空验证码表失败:', err);
    }
});

module.exports = router;