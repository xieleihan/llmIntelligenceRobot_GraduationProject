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
        const [superadmin] = await pool.query('SELECT * FROM adminuser WHERE adminusername = ?', [superadminname]);
        if (superadmin.length === 0) {
            ctx.status = 401;
            ctx.body = { code: 401, error: '用户不存在' };
            return;
        }

        // 2. 检查密码是否正确
        const match = await bcrypt.compare(superadminpassword, superadmin[0].superadminpassword);
        if (!match) {
            ctx.status = 401;
            ctx.body = { code: 401, error: '密码错误' };
            return;
        }

        // 3. 生成token
        const token = jwt.sign(
            {
                superadminname: superadmin[0].superadminname,
                superadminid: superadmin[0].superadminid,
            },
            process.env.SECRET_KEY,
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

module.exports = router;