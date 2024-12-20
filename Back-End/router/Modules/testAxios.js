const Router = require('@koa/router');
const { axiosGet } = require('../../api/index');

const testGet = new Router();

// 测试get请求
testGet.get('/testGet', async (ctx) => {
    try {
        const res = await axiosGet('https://jsonplaceholder.typicode.com/todos/1');
        ctx.body = res.data; // 访问 response.data
    } catch (error) {
        console.error('请求失败:', error);
        ctx.status = 500;  // 错误处理，设置HTTP状态码
        ctx.body = {
            code: -1,
            msg: '请求失败',
            error: error.message || error,
        };
    }
});

module.exports = testGet;
