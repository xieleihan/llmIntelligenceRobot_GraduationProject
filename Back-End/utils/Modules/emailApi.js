const sendEmail = require('./sendEmail');
const { v4: uuidv4 } = require('uuid');
const { pool } = require('../../db/index');
const qq = require('./qq');

const PROJECT_NAME = qq.name;
const FROM_EMAIL = qq.email;

class Email {
    static delay = null;

    // 发送邮件验证码
    static async getEmailCode(ctx) {
        const { email: client_email } = ctx.query; // 从请求中获取邮箱参数

        if (!client_email) {
            ctx.status = 400;
            ctx.body = { code: -1, msg: '缺少邮箱地址' };
            return;
        }

        // 生成验证码
        const email_code = Math.random().toString().slice(-6);
        const code_id = uuidv4();

        const email = {
            title: `${PROJECT_NAME}---邮箱验证码`,
            body: `
<div style="width: 400px;height: 50px;display: flex;flex-direction: row ;align-items: center;">
<img style="width:50px;height:50px;margin-right: 10px;" src="https://github.com/xieleihan/QingluanSearch-AndroidDev/raw/main/peacock_flat.png" alt="" />
<span style="font-weight: bold;font-family: kaiti;">南秋SouthAki<span style="font-family: kaiti;letter-spacing: 15px;color: #ccc;display: block;margin-left: 10px;font-size: 12px;">邮箱验证平台</span></span>
</div>
<h1>您好：</h1>
<p style="font-size: 18px;color:#000;">
您的验证码为：
<span style="font-size: 16px;color:#f00;"><b>${email_code}</b>,</span>
<p>您当前正在使用${PROJECT_NAME}的邮箱验证服务，验证码告知他人将会导致数据信息被盗，请勿泄露!
</p >
<p>他人之招,谨防上当受骗.</p >
</p >
<p style="font-size: 1.5rem;color:#999;">3分钟内有效</p >
`
        };

        const emailContent = {
            from: FROM_EMAIL,
            to: client_email,
            subject: email.title,
            html: email.body,
        };

        try {
            // 判断是否已发送验证码
            const sqlCheck = `SELECT client_email FROM db_email_code WHERE client_email = ?`;
            const [rows] = await pool.query(sqlCheck, [client_email]);

            if (rows.length >= 1) {
                ctx.body = { code: 1, msg: '已发送验证码，请勿重复发送。60秒后可重新发送。' };
                return;
            }

            // 发送邮件
            await sendEmail.send(emailContent);

            // 存储验证码
            const sqlInsert = `INSERT INTO db_email_code (client_email, email_code, code_id) VALUES (?, ?, ?)`;
            await pool.query(sqlInsert, [client_email, email_code, code_id]);

            // 设置验证码有效期
            if (Email.delay !== null) {
                clearTimeout(Email.delay);
            }

            Email.delay = setTimeout(async () => {
                await Email.removeEmailCode(client_email);
                Email.delay = null;
            }, 3 * 60 * 1000);

            ctx.body = { code: 200, msg: '验证码发送成功' };
        } catch (err) {
            console.error('发送邮件失败:', err);
            ctx.status = 500;
            ctx.body = { code: -1, msg: '服务器异常，请稍后重试。' };
        }
    }

    // 删除验证码
    static async removeEmailCode(client_email) {
        try {
            const sql = `DELETE FROM db_email_code WHERE client_email = ?`;
            await pool.query(sql, [client_email]);
        } catch (err) {
            console.error('删除验证码失败:', err);
        }
    }

    // 验证邮箱验证码
    static async verifyEmailCode(ctx) {
        const { client_email, email_code } = ctx.query; // 从请求中获取邮箱和验证码
        
        console.log('client_email:', client_email, 'email_code:', email_code);

        if (!client_email || !email_code) {
            ctx.status = 400;
            ctx.body = { code: -1, msg: '缺少邮箱或验证码参数' };
            return;
        }

        try {
            const sql = `SELECT client_email FROM db_email_code WHERE client_email = ? AND email_code = ?`;
            // console.log("sql:", sql);
            const [rows] = await pool.query(sql, [client_email, email_code]);
            // console.log("rows:", rows);

            if (rows.length === 1) {
                ctx.body = { code: 200, msg: '邮箱验证成功' };
                // 调用删除验证码方法
                await Email.removeEmailCode(client_email);
            } else {
                ctx.body = { code: -1, msg: '邮箱验证失败' };
            }
        } catch (err) {
            console.error('验证邮箱失败:', err);
            ctx.status = 500;
            ctx.body = { code: -1, msg: '服务器异常，请稍后重试。' };
        }
    }
}

module.exports = Email;
