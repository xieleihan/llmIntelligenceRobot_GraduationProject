// 超级管理员路由
const Router = require('@koa/router');
const { pool } = require('../../db/index'); // 引入连接池模块
const bcrypt = require('bcrypt'); // 引入密码加密模块
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模块
require('dotenv').config({ path: '../../.env' }); // 引入环境变量

const router = new Router(
    {
        prefix: '/private',
    }
);

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

// 登录
router.post('/superadminlogin', async (ctx) => {
    const { superadminname, superadminpassword } = ctx.request.body;

    // 参数校验
    if (!superadminname || !superadminpassword) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '用户名和密码均为必填项' };
        return;
    }

    try {
        // 1. 查询用户是否存在
        const [adminuser] = await pool.query('SELECT * FROM adminuser WHERE adminusername = ?', [superadminname]);

        if (adminuser.length === 0) {
            ctx.status = 401;
            ctx.body = { code: 401, error: '用户不存在' };
            return;
        }

        // 2. 检查密码是否正确
        const match = await bcrypt.compare(superadminpassword, adminuser[0].adminuserpassword);
        if (!match) {
            ctx.status = 401;
            ctx.body = { code: 401, error: '密码错误' };
            return;
        }

        // 3. 生成token
        const token = jwt.sign(
            {
                adminusername: adminuser[0].adminusername,
            },
            SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );

        ctx.status = 200;
        ctx.body = { code: 200, message: '登录成功', token };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '服务器错误' };
    }
});

// 返回china地图的数据
router.get('/get-china-datalist', async (ctx) => {
    const authHeader = ctx.headers['authorization']; // 获取请求头中的authorization

    if (!authHeader) {
        ctx.status = 401;
        ctx.body = { message: '未授权的访问', code: 401 };
        return;
    }

    const token = authHeader;
    if (!jwt.verify(token, SECRET_KEY)) {
        return ctx.body = { message: 'token过期或者无效', code: 400 };
    }

    try {
        const [chinaDataList] = await pool.query('SELECT * FROM chinaaccess');
        ctx.status = 200;
        ctx.body = { code: 200, chinaDataList };
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '服务器错误' };
    }
})

module.exports = router;