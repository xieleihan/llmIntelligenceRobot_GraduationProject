const request = require('supertest'); // 导入Http请求测试库
const app = require('../utils/Koa'); // 导入Koa测试实例
const pool = require('./db'); // 引入数据库连接池
const bcrypt = require('bcrypt');
const axios = require('axios');

jest.mock('axios'); // Mock axios 模拟 API 调用

describe('POST /register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app.callback()).post('/register').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '用户名、邮箱和密码均为必填项' });
    });

    it('should return 409 if email is already registered', async () => {
        pool.query = jest.fn().mockResolvedValueOnce([[{ email: 'test@example.com' }]]); // 模拟邮箱已注册
        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'test@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(409);
        expect(res.body).toEqual({ code: 409, error: '该邮箱已被注册' });
    });

    it('should return 409 if username is already taken', async () => {
        pool.query = jest.fn()
            .mockResolvedValueOnce([[]]) // 邮箱未注册
            .mockResolvedValueOnce([[{ username: 'test' }]]); // 用户名已注册
        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(409);
        expect(res.body).toEqual({ code: 409, error: '该用户名已被注册' });
    });

    it('should return 400 if email verification code is incorrect', async () => {
        axios.get.mockResolvedValueOnce({ data: { code: 400 } }); // 模拟邮件验证码错误
        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
            email_code: 'wrong-code',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '邮件验证码错误' });
    });

    it('should return 400 if SVG code is incorrect', async () => {
        axios.get
            .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
            .mockResolvedValueOnce({ data: { code: 400 } }); // 模拟图形验证码错误
        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
            email_code: 'correct-code',
            svgCode: 'wrong-svg-code',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '图形验证码错误' });
    });

    it('should register user and return 200 on success', async () => {
        pool.query = jest.fn()
            .mockResolvedValueOnce([[]]) // 邮箱未注册
            .mockResolvedValueOnce([[]]) // 用户名未注册
            .mockResolvedValueOnce([{ insertId: 1 }]); // 模拟用户插入成功

        bcrypt.hash = jest.fn().mockResolvedValue('hashedPassword'); // 模拟密码加密
        axios.get
            .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
            .mockResolvedValueOnce({ data: { code: 200 } }); // 模拟图形验证码正确

        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
            email_code: 'correct-code',
            svgCode: 'correct-svg-code',
        });
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ code: 200, message: '注册成功', userId: 1 });
    });

    it('should return 500 if server encounters an error', async () => {
        pool.query = jest.fn().mockRejectedValueOnce(new Error('Database error')); // 模拟数据库错误
        const res = await request(app.callback()).post('/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: '服务器错误，请稍后再试', code: 500 });
    });
});