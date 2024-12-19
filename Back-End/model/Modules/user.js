// sql语句
const selectEmailRegistered = 'SELECT * FROM user WHERE useremail = ?';
const insertUser = 'INSERT INTO user (username, useremail, userpassword) VALUES (?, ?, ?)'

// 导出
module.exports = {
    selectEmailRegistered,
    insertUser
};