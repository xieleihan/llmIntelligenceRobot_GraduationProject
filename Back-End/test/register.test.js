const request = require('supertest'); // 导入Supertest进行HTTP测试
const app = require('../utils/Koa'); // 引入Koa应用实例
const { pool } = require('../db/index'); // 引入数据库连接池
const bcrypt = require('bcrypt');
const axios = require('axios');

// Mock 必要模块
jest.mock('../db/index', () => ({
    pool: {
        query: jest.fn().mockResolvedValueOnce([[]]),
        execute: jest.fn(),
    },
}));
jest.mock('bcrypt', () => ({
    hash: jest.fn(),
}));
// Mock axios
jest.mock('axios', () => {
    const mockAxios = {
        create: jest.fn(() => mockAxios),
        interceptors: {
            request: { use: jest.fn() },
            response: { use: jest.fn() },
        },
        get: jest.fn(),
        post: jest.fn(),
    };
    return mockAxios;
});


describe('POST /public/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app.callback()).post('/public/register').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '用户名、邮箱和密码均为必填项' });
    });

    it('should return 409 if email is already registered', async () => {
        pool.query.mockResolvedValueOnce([[{ email: 'test@example.com' }]]); // 模拟邮箱已存在
        const res = await request(app.callback()).post('/public/register').send({
            username: 'test',
            useremail: 'test@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(409);
        expect(res.body).toEqual({ code: 409, error: '该邮箱已被注册' });
    });

    it('should return 409 if username is already taken', async () => {
        pool.query
            .mockResolvedValueOnce([[]]) // 邮箱未注册
            .mockResolvedValueOnce([[{ username: 'test' }]]); // 用户名已存在
        const res = await request(app.callback()).post('/public/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(409);
        expect(res.body).toEqual({ code: 409, error: '该用户名已被注册' });
    });

    it('should return 400 if email verification code is incorrect', async () => {
        pool.query.mockResolvedValueOnce([[]]); // 模拟邮箱未注册
        axios.get.mockResolvedValueOnce({ data: { code: 400 } }); // 模拟邮件验证码错误
        const res = await request(app.callback()).post('/public/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
            email_code: 'wrong-code',
        });
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '邮件验证码错误' });
    });

    it('should return 400 if SVG code is incorrect', async () => {
        pool.query.mockResolvedValueOnce([[]]); // 模拟邮箱未注册
        axios.get
            .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
            .mockResolvedValueOnce({ data: { code: 400 } }); // 模拟图形验证码错误
        const res = await request(app.callback()).post('/public/register').send({
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
        pool.query.mockResolvedValueOnce([[]]); // 邮箱未注册
        pool.query.mockResolvedValueOnce([[]]); // 用户名未注册
        bcrypt.hash.mockResolvedValue('hashedPassword'); // 模拟加密
        pool.execute.mockResolvedValueOnce([{ insertId: 1 }]); // 模拟插入成功
        axios.get
            .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
            .mockResolvedValueOnce({ data: { code: 200 } }); // 模拟图形验证码正确
        const res = await request(app.callback()).post('/public/register').send({
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
        pool.query.mockRejectedValueOnce(new Error('Database error')); // 模拟数据库错误
        const res = await request(app.callback()).post('/public/register').send({
            username: 'test',
            useremail: 'new@example.com',
            userpassword: 'password123',
        });
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: '服务器错误，请稍后再试', code: 500 });
    });
});

// 停止所有的定时任务
afterAll(() => {
    const schedule = require('node-schedule');
    if (schedule.gracefulShutdown) {
        schedule.gracefulShutdown(); // 停止所有定时任务
    }
});
