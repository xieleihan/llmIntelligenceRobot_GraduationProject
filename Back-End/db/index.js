const mysql = require('mysql2/promise');
const dbconfig = require('./database.js');

// 使用连接池
var pool = mysql.createPool(dbconfig.mysql);
console.log("开启连接池连接数据库:导出了pool(使用连接池),getConnection(获取连接),closePool(关闭连接)");

// 获取连接
async function getConnection() {
    try {
        const connection = await pool.getConnection();
        console.log('数据库连接成功');
        return connection;
    } catch (error) {
        console.error('获取数据库连接失败：', error);
        throw error;
    }
}

// 关闭连接池（通常在应用关闭时调用）
async function closePool() {
    try {
        await pool.end();
        console.log('数据库连接池已关闭');
    } catch (error) {
        console.error('关闭连接池失败：', error);
        throw error;
    }
}

// 导出模块
module.exports = {
    pool,
    getConnection,
    closePool,
};