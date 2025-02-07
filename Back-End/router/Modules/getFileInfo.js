const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken 模块
const Router = require('@koa/router'); // 导入Koa路由
const { pool } = require('../../db/index'); // 引入连接池模块
require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const { v4: uuidv4 } = require('uuid'); // 引入UUID

const SECRET_KEY = process.env.SECRET_KEY; // 定义密钥

const router = new Router(
    {
        prefix: '/protected',
    }
); // 设置公共前缀

// 获取所有以相同用户名情报文件信息
router.post('/getFileInfo', async (ctx) => {
    // 获取请求头中cookies中的AUTO_TOKEN
    const token = ctx.headers['authorization'];;

    // 解析token
    const decoded = jwt.verify(token, SECRET_KEY);

    // 获取用户名
    const username = decoded.username;
    if (username === '' || username === undefined) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '用户名不为空或者需要重新登录' };
        return;
    }
    
    // 数据库查询
    const sql = `SELECT * FROM db_fileinfo WHERE username = ?`;

    // 查询
    try {
        const [result] = await pool.query(sql, [username]);
        ctx.state = 200;
        ctx.body = { code: 200, data: result };
    }catch(e) {
        console.log(e);
        ctx.state = 500;
        ctx.body = { code: 500, error: '服务器错误' };
    }
});

// 插入数据
router.post('/insertFileInfo', async (ctx) => {
    // 获取请求头中cookies中的AUTO_TOKEN
    const token = ctx.headers['authorization'];

    // 解析token
    const decoded = jwt.verify(token, SECRET_KEY);

    // uuid
    const uuid = uuidv4();

    // 获取用户名
    const username = decoded.username;
    if (username === '' || username === undefined) {
        ctx.status = 400;
        ctx.body = { code: 400, message: '用户名不为空或者需要重新登录' };
        return;
    }

    // const username = 'xieleihan';

    let { filename, content } = ctx.request.body;

    filename = filename+ "-" + uuid;

    // console.log('filename:', filename, 'content:', content, 'username:', username);

    // 数据库查询
    const sql = `INSERT INTO db_fileinfo (username, filename, content) VALUES (?,?,?)`;

    // 查询
    try {
        await pool.query(sql, [username, filename, content]);
        ctx.state = 200;
        ctx.body = { code: 200, message: '插入成功' };
    }catch(e) {
        console.log(e);
        ctx.state = 500;
        ctx.body = { code: 500, message: '服务器错误' };
    }
});

module.exports = router; // 导出路由