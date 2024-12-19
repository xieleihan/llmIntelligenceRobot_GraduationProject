create database llmrobotmysql;
use llmrobotmysql;

-- 管理员
drop table if exists `adminuser`;
create table adminuser(
	id int auto_increment primary key,
    adminusername varchar(50) Not null,
    adminuserpassword varchar(100) not null,
    admintoken varchar(500)
);
select * from adminuser;

-- 用户表 
drop table if exists `user`;
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL, -- 用户名
    useremail VARCHAR(100) NOT NULL, -- 用户邮箱
    userpassword VARCHAR(100) NOT NULL -- 用户密码
);
select * from user;

-- 用户信息表
drop table if exists `userinfo`;
create table userinfo(
    id INT AUTO_INCREMENT PRIMARY KEY,
	useravater text, -- 用户头像
    userdesc varchar(200), -- 用户签名或者描述
    useraddress varchar(20), -- 用户地址
    username VARCHAR(50) NOT NULL -- 用户名
);
select * from userinfo;