# BackEnd服务

> **作者**: @SouthAki
> **开源协议**: GPL-3.0

## 运行

> 后端环境变量
>
> ```env
> SERVER_PORT=8082
> MYSQL_DATABASE=llmrobotmysql
> MYSQL_HOST=localhost
> MYSQL_PORT=3306
> MYSQL_USER=root
> MYSQL_PASSWORD=123456
> EMAIL_PASSWORD=授权码
> EMAIL=邮箱
> ```
>
> *部分时候请执行`git rm --cached .env`清除Git的env跟踪*

## 接口文档

### 图片验证码

> **生成图片验证码**
>
> 接口:`/createSvgCode`
>
> 方法:`GET`
>
> **验证图片验证码**
>
> 接口:`/verifySvgCode`
>
> 方法:`GET`
>
> 参数:`svgCode`
>
> 示例:`/verifySvgCode?svgCode=GKMx`

### 邮箱验证码

前缀:`/api/email`

> **生成邮箱验证码**
>
> 接口:`/send`
>
> 方法:`GET`
>
> 参数:`email`:string
>
> 示例:`/api/email/send?email=xxx@gmail.com`
>
> 返回:`往邮箱查看`
>
> **验证验证码**
>
> 接口:`/verify`
>
> 方法:`GET`
>
> 参数:`client_email`,`email_code`
>
> 示例:`/api/email/verify?client_email=xxx@gmail.com&email_code=xxxxx`
>
> 返回:200

### 用户注册登录

前缀:`/public`

> **注册**
>
> 接口:`/register`
>
> 方法:`POST`
>
> 参数:`username`,`useremail`,`userpassword`,`email_code`,`svgCode`
>
> **登录**
>
> 接口:`/login`
>
> 方法:`POST`
>
> 参数:`useremail`,`userpassword`,`verifySvgCode`
>
> 返回有一个`token`,请存进`cookie`或者`sessionStrong`,有效期是1h,没有做token无感刷新
>
> 示例
>
> ```json
> {
>     "code": 200,
>     "message": "登录成功",
>     "user": {
>         "username": "xieleihan",
>     },
>     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhpZWxlaWhhbiIsInVzZXJlbWFpbCI6InhpZWxlaWhhbkBnbWFpbC5jb20iLCJpYXQiOjE3MzU0Nzg2NTUsImV4cCI6MTczNTQ4MjI1NX0.cKqGqOUr1pods4Gkb4BxY2-l9g8MaCFFOtxjgvddig8"
> }
> ```
>
> 