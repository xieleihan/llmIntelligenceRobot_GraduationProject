create database llmrobotmysql;
use llmrobotmysql;

-- 管理员
drop table if exists `adminuser`;
create table adminuser(
	id int auto_increment primary key,
    adminusername varchar(50) Not null,
    adminuserpassword varchar(100) not null
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
    username VARCHAR(50) NOT NULL ,-- 用户名
    usergithub varchar(100), -- 用户的Github
    userip varchar(100), -- 用户的Ip信息
    registerTime datetime, -- 注册时间
    uuid text -- 唯一标识符
);
select * from userinfo;

drop table if exists `superadmin`;
create table superadmin(
	id int auto_increment primary key,
    username varchar(100) not null,
    email varchar(100) not null,
    password varchar(100) not null
);
select * from superadmin;

drop table if exists `db_email_code`;
create table db_email_code(
	id int auto_increment primary key,
    client_email varchar(50) not null,
    email_code varchar(50) ,
    code_id text
);
select * from db_email_code;

drop table if exists `db_verifyImage_code`;
create table db_verifyImage_code(
	id int auto_increment primary key,
    verifyImage_code varchar(50) not null,
    code_id text
);
select * from db_verifyImage_code;