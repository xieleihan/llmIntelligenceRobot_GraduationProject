const Router = require('@koa/router');
const { pool } = require('../../db/index'); // 引入连接池模块
require('dotenv').config({ path: '../../.env' }); // 引入环境变量
const { axiosInternetGet } = require('../../api/index');
// 导入uuid
const { v4: uuidv4 } = require('uuid');

const router = new Router(
    {
        prefix: '/protected',
    }
);

const hitokoto_api_url = process.env.HITOKOTO_API_BASE_URL; // 一言 API URL

const basicImgAvater = require('./basicImg');

// 初始化和查询接口,更新接口
router.post('/userinfo', async (ctx) => {
    let { username, useraddress, userip, usergithub, userdesc, isDelete } = ctx.request.body; // 获取请求携带的参数username

    if (isDelete !== 0 && isDelete !== 1) {
        ctx.status = 400;
        ctx.body = { code: 400, message: 'isDelete参数错误' };
        return
    }
    
    // 如果isDelete为0,就不是删除操作,而是更新或者插入
    if (isDelete === 0) {
        if (useraddress === undefined) {
            useraddress = '';
        } else {
            // 如果不是undefined,就代表着用户希望更新自己的信息,也就是这个已经处于注册后,表里有数据的

            // 更新用户的地理位置信息
            try {
                await pool.query('UPDATE userinfo SET useraddress = ? WHERE username = ?', [useraddress, username]);

                // 查询更新后的数据
                const [userinfo] = await pool.query('SELECT * FROM userinfo WHERE username = ?', [username]);

                ctx.body = { code: 200, message: '用户地理位置信息更新成功', data: userinfo };
                return;
            } catch (error) {
                ctx.status = 500;
                ctx.body = { code: 500, message: '用户地理位置信息更新失败' };
                return;
            }
        }
        if (userip === undefined) {
            userip = '0.0.0.0';
        } else {
            // 如果不是undefined,就代表着用户希望更新自己的信息,也就是这个已经处于注册后,表里有数据的
            try {
                await pool.query('UPDATE userinfo SET userip = ? WHERE username = ?', [userip, username]);

                // 查询更新后的数据
                const [userinfo] = await pool.query('SELECT * FROM userinfo WHERE username = ?', [username]);

                ctx.body = { code: 200, message: '用户Ip信息更新成功', data: userinfo };
                return;
            } catch (error) {
                ctx.status = 500;
                ctx.body = { code: 500, message: '用户Ip信息更新失败' };
                return;
            }
        }

        if (usergithub !== undefined) {
            // 如果不是undefined,就代表着用户希望更新自己的信息,也就是这个已经处于注册后,表里有数据的
            try {
                await pool.query('UPDATE userinfo SET usergithub = ? WHERE username = ?', [usergithub, username]);

                // 查询更新后的数据
                const [userinfo] = await pool.query('SELECT * FROM userinfo WHERE username = ?', [username]);

                ctx.body = { code: 200, message: '用户github信息更新成功', data: userinfo };
                return;
            } catch (error) {
                ctx.status = 500;
                ctx.body = { code: 500, message: '用户github信息更新失败' };
                return;
            }
        }

        if (userdesc !== undefined) {
            // 如果不是undefined,就代表着用户希望更新自己的信息,也就是这个已经处于注册后,表里有数据的
            try {
                await pool.query('UPDATE userinfo SET userdesc = ? WHERE username = ?', [userdesc, username]);

                // 查询更新后的数据
                const [userinfo] = await pool.query('SELECT * FROM userinfo WHERE username = ?', [username]);

                ctx.body = { code: 200, message: '用户描述信息更新成功', data: userinfo };
                return;
            } catch (error) {
                ctx.status = 500;
                ctx.body = { code: 500, message: '用户描述信息更新失败' };
                return;
            }
        }

        // 第一步,先在数据库中查找这username有无自己的一条记录,由于注册的时候只写入一个不重复的username,所以只有一条记录
        const [userinfo] = await pool.query('SELECT * FROM userinfo WHERE username = ?', [username]);

        // console.log(userinfo);// 查询的结果
        if (userinfo.length === 0) {
            // 就是当前用户是新注册的用户,所以只有username传递
            // 先插入只有username的一条记录
            // await pool.query('INSERT INTO userinfo (username) VALUES (?)', [username]);

            // 生成随机数范围在1-35之间
            const random = Math.floor(Math.random() * 35 + 1);
            // 获取basicImgAvater中的头像随机
            const imgUrl = basicImgAvater[random];

            // 前端会同时把一个地理地址信息发送过来useraddress,这里面不需处理

            // userdesc肯定是空
            const userdesc = await axiosInternetGet(hitokoto_api_url).then((res) => {
                return res.data.hitokoto;
            });

            // usergithub默认设置跟username一致
            const usergithub = username;

            // 用户Ip信息,前端看会不会传递过来,没有默认0.0.0.0

            // 注册时间就是目前的时间
            const registertime = new Date().getTime();

            // 生成一个uuid
            const uuid = uuidv4();

            // 写入数据库
            try {
                await pool.query('INSERT INTO userinfo (useravater,userdesc,username,usergithub,userip,registerTime,uuid) VALUES (?,?,?,?,?,?,?)', [imgUrl, userdesc, username, usergithub, userip, registertime, uuid]);
                ctx.body = { code: 200, message: '用户信息写入成功' };
            } catch (error) {
                console.error('用户信息写入失败:', error);
                ctx.status = 500;
                ctx.body = { code: 500, message: '用户信息写入失败' };
            }
        } else {
            // console.log('用户信息已存在', userinfo);
            // 如果存在,就是用户信息已经存在,只需要返回给前端用户信息即可
            ctx.body = { code: 200, message: '查询成功', data: userinfo };
        }
    } else {
        // 如果isDelete为1,就是删除操作
        try {
            await pool.query('DELETE FROM userinfo WHERE username = ?', [username]);
            ctx.body = { code: 200, message: '用户信息删除成功' };
        } catch (error) {
            console.error('用户信息删除失败:', error);
            ctx.status = 500;
            ctx.body = { code: 500, message: '用户信息删除失败' };
        }
    }
});

module.exports = router;