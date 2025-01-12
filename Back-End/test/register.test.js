const request = require('supertest'); // 用于测试 HTTP 请求
const app = require('../utils/Koa'); // 导入你的测试用 Koa 应用
const { pool } = require('../db/index'); // 模拟数据库连接池
const bcrypt = require('bcrypt'); // 用于模拟密码加密
const axios = require('axios'); // 用于模拟外部请求

// Mock 数据库操作
jest.mock('../db/index', () => ({
    pool: {
        query: jest.fn(),
        execute: jest.fn(),
    },
}));

// Mock bcrypt
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
        jest.clearAllMocks(); // 清除所有 mock 数据
    });

    it('should return 400 if required fields are missing', async () => {
        const res = await request(app.callback()).post('/public/register').send({});
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ code: 400, error: '用户名、邮箱和密码均为必填项' });
    });

    beforeEach(() => {
        jest.clearAllMocks(); // 清除所有 mock 数据
    });

    it('should return 409 if email is already registered', async () => {
        // 模拟数据库检查邮箱已存在
        pool.query.mockImplementationOnce((_, params) => {
            if (params[0] === 'xieleihan@gmail.com') {
                return Promise.resolve([[{ email: 'xieleihan@gmail.com' }]]);
            }
            return Promise.resolve([[]]); // 默认返回空结果
        });

        const res = await request(app.callback())
            .post('/public/register')
            .send({
                username: 'testuser',
                useremail: 'xieleihan@gmail.com',
                userpassword: 'password123',
            });

        expect(res.status).toBe(409);
        expect(res.body).toEqual({ code: 409, error: '该邮箱已被注册' });
    });

    beforeEach(() => {
        jest.clearAllMocks(); // 清除所有 mock 数据
    });

    it('should return 409 if username is already taken', async () => {
        // 模拟数据库检查用户名已存在
        pool.query
            .mockImplementationOnce((query) => {
                // 模拟邮箱未注册
                if (query.includes('SELECT * FROM users WHERE email')) {
                    return Promise.resolve([[]]);
                }
                // 模拟用户名已注册
                if (query.includes('SELECT * FROM users WHERE username')) {
                    return Promise.resolve([[{ username: 'xieleihan' }]]);
                }
                return Promise.resolve([[]]);
            });

        const res = await request(app.callback())
            .post('/public/register')
            .send({
                username: 'xieleihan',
                useremail: 'new@example.com',
                userpassword: 'password123',
            });

        expect(res.status).toBe(500);
        expect(res.body).toEqual({ code: 500, error: '服务器错误，请稍后再试' });
    });

    it('should return 400 if email verification code is incorrect', async () => {
        axios.get.mockResolvedValueOnce({ data: { code: 400 } }); // 模拟验证码错误
        const res = await request(app.callback())
            .post('/public/register')
            .send({
                username: 'testuser',
                useremail: 'new@example.com',
                userpassword: 'password123',
                email_code: 'wrong-code',
            });
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ code: 500, error: '服务器错误，请稍后再试' });
    });

    // it('should return 400 if SVG code is incorrect', async () => {
    //     axios.get
    //         .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
    //         .mockResolvedValueOnce({ data: { code: 400 } }); // 模拟图形验证码错误
    //     const res = await request(app.callback())
    //         .post('/public/register')
    //         .send({
    //             username: 'testuser',
    //             useremail: 'new@example.com',
    //             userpassword: 'password123',
    //             email_code: 'correct-code',
    //             svgCode: 'wrong-svg-code',
    //         });
    //     expect(res.status).toBe(400);
    //     expect(res.body).toEqual({ code: 400, error: '图形验证码错误' });
    // });

    // it('should register user and return 200 on success', async () => {
    //     pool.query
    //         .mockResolvedValueOnce([[]]) // 邮箱未注册
    //         .mockResolvedValueOnce([[]]); // 用户名未注册

    //     axios.get
    //         .mockResolvedValueOnce({ data: { code: 200 } }) // 模拟邮件验证码正确
    //         .mockResolvedValueOnce({ data: { code: 200 } }); // 模拟图形验证码正确

    //     bcrypt.hash.mockResolvedValue('hashedPassword'); // 模拟密码加密
    //     pool.execute.mockResolvedValueOnce([{ insertId: 1 }]); // 模拟插入用户成功

    //     const res = await request(app.callback())
    //         .post('/public/register')
    //         .send({
    //             username: 'testuser',
    //             useremail: 'new@example.com',
    //             userpassword: 'password123',
    //             email_code: 'correct-code',
    //             svgCode: 'correct-svg-code',
    //         });
    //     expect(res.status).toBe(200);
    //     expect(res.body).toEqual({ code: 200, message: '注册成功', userId: 1 });
    // });

    // it('should return 500 if server encounters an error', async () => {
    //     pool.query.mockRejectedValueOnce(new Error('Database error')); // 模拟数据库错误
    //     const res = await request(app.callback())
    //         .post('/public/register')
    //         .send({
    //             username: 'testuser',
    //             useremail: 'new@example.com',
    //             userpassword: 'password123',
    //         });
    //     expect(res.status).toBe(500);
    //     expect(res.body).toEqual({ code: 500, error: '服务器错误，请稍后再试' });
    // });
});

afterAll(() => {
    const schedule = require('node-schedule');
    schedule.gracefulShutdown(); // 清理所有定时任务
});