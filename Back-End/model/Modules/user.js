// sql语句
const selectEmailRegistered = 'SELECT * FROM user WHERE useremail = ?';
const insertUser = 'INSERT INTO user (username, useremail, userpassword) VALUES (?, ?, ?)'
const selectUsernameRegistered = 'SELECT * FROM user WHERE username = ?';

// 导出
module.exports = {
    selectEmailRegistered,
    insertUser,
    selectUsernameRegistered
};