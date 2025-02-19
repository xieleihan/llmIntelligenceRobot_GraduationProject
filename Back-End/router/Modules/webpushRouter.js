const Router = require('@koa/router'); // 导入Koa路由
require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const webPush = require('web-push'); // 引入web-push
const { pool } = require('../../db/index');

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

const public_key = process.env.PUBLIC_KEY; // 获取公钥
const private_key = process.env.PRIVATE_KEY; // 获取私钥
const base_url = process.env.BASE_URL; // 获取基础URL

// 使用 VAPID 密钥
const vapidKeys = {
    publicKey: public_key,
    privateKey: private_key
};

// 设置 VAPID 的密钥
webPush.setVapidDetails(
    'mailto:rc_network@foxmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

// 用于存储推送信息的路由
router.post('/subscribe', async (ctx) => {
    const subscription = ctx.request.body; // 获取请求体

    // 数据库插入
    const sql = `INSERT INTO db_pushinfo (subscription) VALUES (?)`;
    try {
        await pool.query(sql, [JSON.stringify(subscription)]);
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = { code: 500, error: '服务器错误' };
        return;
    }

    ctx.status = 200; // 设置状态码
    ctx.body = {
        code: 200,
        msg: '订阅成功'
    }
})

// 路由,用于发送推送信息
router.post('/sendPush', async (ctx) => {
    const payload = JSON.stringify({
        title: '推送消息',
        body: '这是一条推送消息',
        icon: `${base_url}/peacock_flat.ico`
    })

    // 数据库查询
    const sql = `SELECT * FROM db_pushinfo`;
    let [result] = await pool.query(sql);

    // 遍历推送信息
    result.forEach(async (item) => {
        const subscription = JSON.parse(item.subscription);
        try {
            await webPush.sendNotification(subscription, payload);
            ctx.body = {
                code: 200,
                msg: '推送成功'
            }
        } catch (e) {
            console.log(e);
            ctx.status = 500;
            ctx.body = { code: 500, error: '服务器错误' };
        }
    })
})

module.exports = router; // 导出路由