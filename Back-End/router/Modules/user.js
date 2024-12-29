const Router = require('@koa/router');
const bcrypt = require('bcrypt'); // 引入密码加密模块
const { pool } = require('../../db/index'); // 引入连接池模块
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模块
require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const { axiosGet } = require('../../api/index');

// 引入用户的sql语句
const user = require('../../model/index').user;

const router = new Router(
    {
        prefix: '/public',
    }
);
const saltRounds = 10; // 定义密码加密的 salt 轮数
const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

// 注册接口
router.post('/register', async (ctx) => {
    const { username, useremail, userpassword, email_code, svgCode } = ctx.request.body;

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

        // 检查用户名是否已被注册
        const [existingUsername] = await pool.query(user.selectUsernameRegistered, [username]);
        if (existingUsername.length > 0) {
            ctx.status = 409;
            ctx.body = { code: 409, error: '该用户名已被注册' };
            return;
        }

        // 发起请求检测验证码是否正确api:/api/email/verify
        const res = await axiosGet('/api/email/verify', {
            params: {
                client_email: useremail,
                email_code:email_code,
            },
        });
        if (res.data.code !== 200) {
            ctx.status = 400;
            ctx.body = { code: 400, error: '邮件验证码错误' };
            return;
        }

        // 检查图形验证码是否正确/verifySvgCode
        const resSvg = await axiosGet('/verifySvgCode', {
            params: {
                svgCode,
            },
        });
        if (resSvg.data.code !== 200) {
            ctx.status = 400;
            ctx.body = { code: 400, error: '图形验证码错误' };
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

router.post('/login', async (ctx) => {
    const { useremail, userpassword, verifySvgCode } = ctx.request.body;

    // 参数校验
    if (!useremail || !userpassword) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '邮箱和密码均为必填项' };
        return;
    }

    if (!verifySvgCode) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '验证码不能为空' };
        return;
    } else {
        // 检查图形验证码是否正确/verifySvgCode
        const resSvg = await axiosGet('/verifySvgCode', {
            params: {
                svgCode: verifySvgCode,
            },
        });
        if (resSvg.data.code !== 200) {
            ctx.status = 400;
            ctx.body = { code: 400, error: '图形验证码错误' };
            return;
        }
    }

    try {
        // 1. 查询用户
        const [users] = await pool.query(user.selectUserByEmail, [useremail]);
        if (users.length === 0) {
            ctx.status = 404;
            ctx.body = { code: 404, error: '用户不存在' };
            return;
        }

        // 2. 检查密码是否正确
        const hashedPassword = users[0].userpassword;
        const isPasswordCorrect = await bcrypt.compare(userpassword, hashedPassword);
        if (!isPasswordCorrect) {
            ctx.status = 401;
            ctx.body = { code: 401, error: '密码错误' };
            return;
        }

        const token = jwt.sign({
            username: users[0].username,
            useremail: users[0].useremail,
        }, SECRET_KEY,{ expiresIn: '1h' });

        // 3. 返回用户信息
        ctx.status = 200;
        ctx.body = { code: 200, message: '登录成功', user: users[0].username,token:token };
    } catch (error) {
        console.error('登录失败：', error);
        ctx.status = 500;
        ctx.body = { error: '服务器错误，请稍后再试', code: 500 };
    }
});

module.exports = router;
