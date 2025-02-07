# BackEnd服务

> **作者**: @SouthAki
> **开源协议**: GPL-3.0

## 运行

> 后端环境变量(必须配置)
>
> 在根目录下创建`.env`
>
> ```env
> SERVER_PORT=8082
> MYSQL_DATABASE=llmrobotmysql
> MYSQL_HOST=localhost
> MYSQL_PORT=3306
> MYSQL_USER=root
> MYSQL_PASSWORD=123456
> EMAIL_PASSWORD=
> EMAIL=
> BASE_URL=http://localhost:8082
> SECRET_KEY=
> DEEPSEEK_API_KEY=
> DEEPSEEK_API_BASE_URL=https://api.deepseek.com/v1
> GITHUB_TOKEN=
> GITHUB_BETA_TOKEN=
> ```
>
> *部分时候请执行`git rm --cached .env`清除Git的env跟踪*
>
> 然后,执行
>
> ```bash
> npm install
> ```
>
> 安装必须的包
>
> 运行命令:
>
> ```bash
> npm run dev
> ```
>
> Test命令:
>
> ```bash
> npm run test
> ```
>
> 

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

### 超级管理员登录

前缀:`/private`

> 接口:`/superadminlogin`
>
> 方法:`POST`,
>
> 参数:`superadminname`,`superadminpassword`
>
> 返回
>
> ```json
> {
>     "code": 200,
>     "message": "登录成功",
>     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbnVzZXJuYW1lIjoiYWRtaW4iLCJpYXQiOjE3MzcyMTQ1MTgsImV4cCI6MTczNzIxODExOH0.IRt6d4FrGY3dJVxGxqT5RNVGiXpudTP9AkI10sMSumo"
> }
> ```
>
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

### Github接口

前缀:`/public`

需要提前获取GitHub的Token,然后在请求头

```text
config.headers['Authorization'] = `token ${github_token}`;
```



> #### 获取某个用户的仓库信息
>
> 接口:`/get-github-repos`
>
> 方法:`POST`
>
> 参数:`username`
>
> 返回的数据
>
> ```json
> {
>     "code":200,
>     "repos":[
>         {
>             "id": 784660837,
>             "node_id": "R_kgDOLsT5ZQ",
>             "name": "1x-web-certificate-gkd",
>             "full_name": "xieleihan/1x-web-certificate-gkd",
>             "private": false,
>             "owner": {
>                 "login": "xieleihan",
>                 "id": 57227318,
>                 "node_id": "MDQ6VXNlcjU3MjI3MzE4",
>                 "avatar_url": "https://avatars.githubusercontent.com/u/57227318?v=4",
>                 "gravatar_id": "",
>                 "url": "https://api.github.com/users/xieleihan",
>                 "html_url": "https://github.com/xieleihan",
>                 "followers_url": "https://api.github.com/users/xieleihan/followers",
>                 "following_url": "https://api.github.com/users/xieleihan/following{/other_user}",
>                 "gists_url": "https://api.github.com/users/xieleihan/gists{/gist_id}",
>                 "starred_url": "https://api.github.com/users/xieleihan/starred{/owner}{/repo}",
>                 "subscriptions_url": "https://api.github.com/users/xieleihan/subscriptions",
>                 "organizations_url": "https://api.github.com/users/xieleihan/orgs",
>                 "repos_url": "https://api.github.com/users/xieleihan/repos",
>                 "events_url": "https://api.github.com/users/xieleihan/events{/privacy}",
>                 "received_events_url": "https://api.github.com/users/xieleihan/received_events",
>                 "type": "User",
>                 "user_view_type": "public",
>                 "site_admin": false
>             },
>             "html_url": "https://github.com/xieleihan/1x-web-certificate-gkd",
>             "description": null,
>             "fork": true,
>             "url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd",
>             "forks_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/forks",
>             "keys_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/keys{/key_id}",
>             "collaborators_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/collaborators{/collaborator}",
>             "teams_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/teams",
>             "hooks_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/hooks",
>             "issue_events_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/issues/events{/number}",
>             "events_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/events",
>             "assignees_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/assignees{/user}",
>             "branches_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/branches{/branch}",
>             "tags_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/tags",
>             "blobs_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/git/blobs{/sha}",
>             "git_tags_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/git/tags{/sha}",
>             "git_refs_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/git/refs{/sha}",
>             "trees_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/git/trees{/sha}",
>             "statuses_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/statuses/{sha}",
>             "languages_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/languages",
>             "stargazers_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/stargazers",
>             "contributors_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/contributors",
>             "subscribers_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/subscribers",
>             "subscription_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/subscription",
>             "commits_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/commits{/sha}",
>             "git_commits_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/git/commits{/sha}",
>             "comments_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/comments{/number}",
>             "issue_comment_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/issues/comments{/number}",
>             "contents_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/contents/{+path}",
>             "compare_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/compare/{base}...{head}",
>             "merges_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/merges",
>             "archive_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/{archive_format}{/ref}",
>             "downloads_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/downloads",
>             "issues_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/issues{/number}",
>             "pulls_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/pulls{/number}",
>             "milestones_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/milestones{/number}",
>             "notifications_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/notifications{?since,all,participating}",
>             "labels_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/labels{/name}",
>             "releases_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/releases{/id}",
>             "deployments_url": "https://api.github.com/repos/xieleihan/1x-web-certificate-gkd/deployments",
>             "created_at": "2024-04-10T09:46:53Z",
>             "updated_at": "2024-10-28T13:39:08Z",
>             "pushed_at": "2024-04-16T17:28:10Z",
>             "git_url": "git://github.com/xieleihan/1x-web-certificate-gkd.git",
>             "ssh_url": "git@github.com:xieleihan/1x-web-certificate-gkd.git",
>             "clone_url": "https://github.com/xieleihan/1x-web-certificate-gkd.git",
>             "svn_url": "https://github.com/xieleihan/1x-web-certificate-gkd",
>             "homepage": null,
>             "size": 79386,
>             "stargazers_count": 1,
>             "watchers_count": 1,
>             "language": "Ruby",
>             "has_issues": false,
>             "has_projects": true,
>             "has_downloads": true,
>             "has_wiki": true,
>             "has_pages": false,
>             "has_discussions": false,
>             "forks_count": 0,
>             "mirror_url": null,
>             "archived": false,
>             "disabled": false,
>             "open_issues_count": 0,
>             "license": {
>                 "key": "mit",
>                 "name": "MIT License",
>                 "spdx_id": "MIT",
>                 "url": "https://api.github.com/licenses/mit",
>                 "node_id": "MDc6TGljZW5zZTEz"
>             },
>             "allow_forking": true,
>             "is_template": false,
>             "web_commit_signoff_required": false,
>             "topics": [],
>             "visibility": "public",
>             "forks": 0,
>             "open_issues": 0,
>             "watchers": 1,
>             "default_branch": "main",
>             "permissions": {
>                 "admin": true,
>                 "maintain": true,
>                 "push": true,
>                 "triage": true,
>                 "pull": true
>             }
>         },
>     ]
> }
> ```
>
> #### 获取自己关注或者其他用户关注的仓库信息
>
> 接口:`/get-github-starred-repos`
>
> 方法:`POST`
>
> 参数:`username`
>
> 返回数据
>
> ```json
> {
>     "code":200,
>     "repos":[
>         {
>             "id": 164815412,
>             "node_id": "MDEwOlJlcG9zaXRvcnkxNjQ4MTU0MTI=",
>             "name": "Studying",
>             "full_name": "XNoteW/Studying",
>             "private": false,
>             "owner": {
>                 "login": "XNoteW",
>                 "id": 43038022,
>                 "node_id": "MDEyOk9yZ2FuaXphdGlvbjQzMDM4MDIy",
>                 "avatar_url": "https://avatars.githubusercontent.com/u/43038022?v=4",
>                 "gravatar_id": "",
>                 "url": "https://api.github.com/users/XNoteW",
>                 "html_url": "https://github.com/XNoteW",
>                 "followers_url": "https://api.github.com/users/XNoteW/followers",
>                 "following_url": "https://api.github.com/users/XNoteW/following{/other_user}",
>                 "gists_url": "https://api.github.com/users/XNoteW/gists{/gist_id}",
>                 "starred_url": "https://api.github.com/users/XNoteW/starred{/owner}{/repo}",
>                 "subscriptions_url": "https://api.github.com/users/XNoteW/subscriptions",
>                 "organizations_url": "https://api.github.com/users/XNoteW/orgs",
>                 "repos_url": "https://api.github.com/users/XNoteW/repos",
>                 "events_url": "https://api.github.com/users/XNoteW/events{/privacy}",
>                 "received_events_url": "https://api.github.com/users/XNoteW/received_events",
>                 "type": "Organization",
>                 "user_view_type": "public",
>                 "site_admin": false
>             },
>             "html_url": "https://github.com/XNoteW/Studying",
>             "description": "阅读 & 写作 & 学习",
>             "fork": false,
>             "url": "https://api.github.com/repos/XNoteW/Studying",
>             "forks_url": "https://api.github.com/repos/XNoteW/Studying/forks",
>             "keys_url": "https://api.github.com/repos/XNoteW/Studying/keys{/key_id}",
>             "collaborators_url": "https://api.github.com/repos/XNoteW/Studying/collaborators{/collaborator}",
>             "teams_url": "https://api.github.com/repos/XNoteW/Studying/teams",
>             "hooks_url": "https://api.github.com/repos/XNoteW/Studying/hooks",
>             "issue_events_url": "https://api.github.com/repos/XNoteW/Studying/issues/events{/number}",
>             "events_url": "https://api.github.com/repos/XNoteW/Studying/events",
>             "assignees_url": "https://api.github.com/repos/XNoteW/Studying/assignees{/user}",
>             "branches_url": "https://api.github.com/repos/XNoteW/Studying/branches{/branch}",
>             "tags_url": "https://api.github.com/repos/XNoteW/Studying/tags",
>             "blobs_url": "https://api.github.com/repos/XNoteW/Studying/git/blobs{/sha}",
>             "git_tags_url": "https://api.github.com/repos/XNoteW/Studying/git/tags{/sha}",
>             "git_refs_url": "https://api.github.com/repos/XNoteW/Studying/git/refs{/sha}",
>             "trees_url": "https://api.github.com/repos/XNoteW/Studying/git/trees{/sha}",
>             "statuses_url": "https://api.github.com/repos/XNoteW/Studying/statuses/{sha}",
>             "languages_url": "https://api.github.com/repos/XNoteW/Studying/languages",
>             "stargazers_url": "https://api.github.com/repos/XNoteW/Studying/stargazers",
>             "contributors_url": "https://api.github.com/repos/XNoteW/Studying/contributors",
>             "subscribers_url": "https://api.github.com/repos/XNoteW/Studying/subscribers",
>             "subscription_url": "https://api.github.com/repos/XNoteW/Studying/subscription",
>             "commits_url": "https://api.github.com/repos/XNoteW/Studying/commits{/sha}",
>             "git_commits_url": "https://api.github.com/repos/XNoteW/Studying/git/commits{/sha}",
>             "comments_url": "https://api.github.com/repos/XNoteW/Studying/comments{/number}",
>             "issue_comment_url": "https://api.github.com/repos/XNoteW/Studying/issues/comments{/number}",
>             "contents_url": "https://api.github.com/repos/XNoteW/Studying/contents/{+path}",
>             "compare_url": "https://api.github.com/repos/XNoteW/Studying/compare/{base}...{head}",
>             "merges_url": "https://api.github.com/repos/XNoteW/Studying/merges",
>             "archive_url": "https://api.github.com/repos/XNoteW/Studying/{archive_format}{/ref}",
>             "downloads_url": "https://api.github.com/repos/XNoteW/Studying/downloads",
>             "issues_url": "https://api.github.com/repos/XNoteW/Studying/issues{/number}",
>             "pulls_url": "https://api.github.com/repos/XNoteW/Studying/pulls{/number}",
>             "milestones_url": "https://api.github.com/repos/XNoteW/Studying/milestones{/number}",
>             "notifications_url": "https://api.github.com/repos/XNoteW/Studying/notifications{?since,all,participating}",
>             "labels_url": "https://api.github.com/repos/XNoteW/Studying/labels{/name}",
>             "releases_url": "https://api.github.com/repos/XNoteW/Studying/releases{/id}",
>             "deployments_url": "https://api.github.com/repos/XNoteW/Studying/deployments",
>             "created_at": "2019-01-09T07:52:57Z",
>             "updated_at": "2025-01-06T05:30:41Z",
>             "pushed_at": "2019-03-07T13:20:33Z",
>             "git_url": "git://github.com/XNoteW/Studying.git",
>             "ssh_url": "git@github.com:XNoteW/Studying.git",
>             "clone_url": "https://github.com/XNoteW/Studying.git",
>             "svn_url": "https://github.com/XNoteW/Studying",
>             "homepage": "https://xnotew.github.io/Studying/",
>             "size": 42678,
>             "stargazers_count": 91,
>             "watchers_count": 91,
>             "language": "Jupyter Notebook",
>             "has_issues": true,
>             "has_projects": true,
>             "has_downloads": true,
>             "has_wiki": true,
>             "has_pages": true,
>             "has_discussions": false,
>             "forks_count": 28,
>             "mirror_url": null,
>             "archived": false,
>             "disabled": false,
>             "open_issues_count": 0,
>             "license": {
>                 "key": "mit",
>                 "name": "MIT License",
>                 "spdx_id": "MIT",
>                 "url": "https://api.github.com/licenses/mit",
>                 "node_id": "MDc6TGljZW5zZTEz"
>             },
>             "allow_forking": true,
>             "is_template": false,
>             "web_commit_signoff_required": false,
>             "topics": [],
>             "visibility": "public",
>             "forks": 28,
>             "open_issues": 0,
>             "watchers": 91,
>             "default_branch": "master",
>             "permissions": {
>                 "admin": false,
>                 "maintain": false,
>                 "push": false,
>                 "triage": false,
>                 "pull": true
>             }
>         },
>     ]
> }
> ```
>
> 

### 服务器状态

前缀:`/private`(私有接口,C端不暴露)

> #### 获取系统CPU和内存占用情况
>
> 接口:`/get-server-state`
>
> 方法:`GET`或者`WS`(会尝试升级成WebSocket,失败切成Http请求)
>
> 参数:无
>
> 请求头:**需要注意,该接口是保护接口,请在前端传递的时候给headers上附上`authorization`**
>
> 返回:
>
> ```json
> {
>     "memory": {
>         "total": "13.86 GB",
>         "used": "11.47 GB",
>         "free": "2.39 GB"
>     },
>     "cpu": {
>         "cpuUsage": [
>             {
>                 "core": 0,
>                 "usage": "3.55"
>             },
>             ...
>         ],
>         "total": "35.68%"
>     }
> }
> ```
>

### 中国(包含港澳台)用户访问信息

前缀:`/private`

> 接口:`/get-china-datalist`
>
> 方法:`GET`
>
> 返回:
>
> ```json
> {
>     "code": 200,
>     "chinaDataList": [
>         {
>             "id": 1,
>             "province": "香港",
>             "accessvalue": "0"
>         },
>         ...
>     ]
> }
> ```
>
> 海外用户因为数据保护法案,暂不收集返回,港澳台的可在后续的更新中,给予选择权限.
>
> 大陆用户不会弹出提示,但是会对数据进行脱敏.

### 文件格式生成

> 此处是用`markdown`格式的字符串转成对应的格式文件
>
> 前缀:`/protected`
>
> 方法均为`POST`
>
> 传入:
>
> ```json
> {
>   "filename": "example",
>   "content": "# Hello Markdown\n\nThis is a **test** file."
> }
> ```
>
> 
>
> 返回的都是json
>
> ```json
> {
>  "code": 200,
>  "message": "PDF 生成成功",
>  "url": "http://localhost:10089/static/example.pdf"
> }
> ```
>
> 

1. 保存为`Markdown`文件

   > 接口:`/save-md`

2. 保存为`PDF`文件

   > 接口:`/save-pdf`

3. 保存为`XML`文件

   > 接口:`/save-xml`

4. 保存为`HTML`文件

   > 接口: `/save-html`

5. 保存为`Word`文件

   > 接口: `/save-docx`

6. 保存为`JSON`文件

   > 接口:`/save-json`

7. 保存为`TXT`文件

   > 接口:`/save-txt`

### 文件信息

> 前缀:`/protected`
>
> #### 获取文件信息
>
> 接口:`/getFileInfo`
>
> 方法:`POST`
>
> 传入:只要前端登录就行,在cookies的auto_token获取username
>
> 返回
>
> ```json
> {
>     code: 200,
>     data: result
> }
> ```
>
> #### 插入文件信息
>
> 接口:`/insertFileInfo`
>
> 方法:`POST`
>
> 传入三个参数,其中一个是自动传入
>
> 只需传入`filename`,`content`就行
>
> 返回
>
> ```json
> {
>     code: 200,
>     message: ""
> }
> ```
>
> 