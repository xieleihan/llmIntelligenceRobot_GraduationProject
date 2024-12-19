// 导入dotenv
const dotenv = require('dotenv');

// 读取环境变量
dotenv.config();

module.exports = {
    // 从环境变量读取
    mysql: {
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT
    }
}