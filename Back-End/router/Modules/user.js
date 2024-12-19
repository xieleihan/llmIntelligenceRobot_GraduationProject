const Router = require('@koa/router');
const bcrypt = require('bcrypt'); // 引入密码加密模块
const { pool } = require('../../db/index'); // 引入连接池模块

// 引入用户的sql语句
const user = require('../../model/index').user;

const router = new Router(
    {
        prefix: '/public',
    }
);
const saltRounds = 10; // 定义密码加密的 salt 轮数

// 注册接口
router.post('/register', async (ctx) => {
    const { username, useremail, userpassword } = ctx.request.body;

    // 参数校验
    if (!username || !useremail || !userpassword) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '用户名、邮箱和密码均为必填项' };
        return;
    }

    try {
        // 1. 检查邮箱是否已被注册
        const [existingUser] = await pool.query(user.selectEmailRegistered, [useremail]);
        if (existingUser.length > 0) {
            ctx.status = 409;
            ctx.body = { code: 409, error: '该邮箱已被注册' };
            return;
        }

        // 2. 加密用户密码
        const hashedPassword = await bcrypt.hash(userpassword, saltRounds);

        // 3. 插入新用户到数据库
        const sql = user.insertUser;
        const [result] = await pool.execute(sql, [username, useremail, hashedPassword]);

        // 返回结果
        ctx.status = 200;
        ctx.body = { code: 200, message: '注册成功', userId: result.insertId };
    } catch (error) {
        console.error('注册失败：', error);
        ctx.status = 500;
        ctx.body = { error: '服务器错误，请稍后再试', code: 500 };
    }
});

module.exports = router;
