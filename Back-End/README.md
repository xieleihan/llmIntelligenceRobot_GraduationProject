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

### Deepseek聊天接口

前缀:`/protected`

> #### 聊天
>
> 接口:`/deepseek`
>
> 方法:`POST`
>
> 参数:`question`
>
> 返回的格式是这样的
>
> ```json
> {
>     "code": 200,
>     "msg": "```thinking\nHmm... 这是一个关于自我介绍的问题。让我想想该怎么回答比较好...\n\n首先我需要说明我的身份和功能。我是由南秋SouthAki开发的GitHub开源情报机器人。我的主要任务是帮助用户跟踪他们在GitHub上关注的仓库的最新动态和信息。\n\n不过直接说\"我是机器人\"可能不太合适...我应该表现得更加自然一些。也许可以这样开场:\n\n\"你好,我是由南秋SouthAki开发的GitHub助手...\"\n\n然后我需要解释我的具体功能:\n\n- 可以返回用户关注的GitHub仓库的最新动态\n- 提供关于这些仓库的最近信息\n- 对这些信息进行总结和分析\n\n另外,我还可以调用一些工具来增强我的能力,比如thinkPrompt等。\n\n不过第一次对话,可能不需要一下子说太多细节,先做个简单的介绍,等用户有具体需求时再详细说明功能会更好。\n\n让我组织一下语言...\n```\n\n你好,我是由南秋SouthAki开发的GitHub助手。我的主要功能是帮助用户跟踪他们在GitHub上关注的仓库的最新动态和信息。我可以为你提供你关注的仓库的最近更新,并对这些信息进行总结和分析。如果你有任何关于GitHub仓库的具体需求,我都很乐意帮忙。",
>     "user": {
>         "username": "xieleihan"
>     }
> }
> ```
>
> **需要注意,该接口是保护接口,请在前端传递的时候给headers上附上`authorization`**
>
> value是`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InhpZWxlaWhhbiIsInVzZXJlbWFpbCI6InhpZWxlaWhhbkBnbWFpbC5jb20iLCJpYXQiOjE3MzYwODkzODksImV4cCI6MTczNjA5Mjk4OX0.ICoiAjZ_xcqYPrrtlWXD3t9NeTp0WF-U0iahvZd57Ao`