const Router = require('@koa/router'); // 导入Koa路由
const { github } = require('../../model/index'); // 导入GitHub仓库信息获取函数
const { axiosPost } = require('../../api/index'); // 导入axios请求函数

const router = new Router(
    {
        prefix: '/public',
    }
); // 设置公共前缀

// POST 接口：获取自己或其他用户仓库信息
router.post('/get-github-repos', async (ctx) => {
    const { username } = ctx.request.body; // 获取 POST 请求体中的 GitHub 用户名

    if (!username) {
        ctx.status = 400;
        ctx.body = { code: 400, error: 'GitHub 用户名是必需的' };
        return;
    }

    try {
        const repos = await github.getGithubRepos(username); // 获取仓库信息
        ctx.body = { code:200,repos }; // 返回仓库信息
    } catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '无法获取 GitHub 仓库信息' };
    }
});

// POST 接口：获取自己关注或者其他用户关注的仓库信息
router.post('/get-github-starred-repos', async (ctx) => {
    const { username } = ctx.request.body; // 获取 POST 请求体中的 GitHub 用户名

    if (!username) {
        ctx.status = 400;
        ctx.body = { code:400,error: 'GitHub 用户名是必需的' };
        return;
    }

    try { 
        const repos = await github.getGithubStarredRepos(username); // 获取仓库信息
        ctx.body = { code:200,repos }; // 返回仓库信息
    }catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '无法获取 GitHub 仓库信息' };
    }
});

// POST 接口：获取 某个Starred 仓库的提交、问题、拉取请求和事件集合
router.post('/get-github-repo-activity', async (ctx) => {
    const { username } = ctx.request.body; // 获取 POST 请求体中的仓库名

    if (!username) {
        ctx.status = 400;
        ctx.body = { code: 400, error: '用户名仓库名是必需的' };
        return;
    }

    try {
        // 尝试获取用户的Star仓库数据
        const starRepos = await axiosPost('/public/get-github-repos', { username });
        try {
            // 初始化返回数据
            const repoActivity = [];
            // console.log("这是获取的Star仓库数据:", starRepos.data.repos);
            // 遍历每个Star仓库,获取提交记录,问题和拉取请求
            for (let repo of starRepos.data.repos) {
                // console.log("这是每一个repo和repo.full_name:", repo, repo.full_name);
                // 获取提交记录
                const commits = await github.commitReponse(repo.full_name);
                // 获取问题
                const issues = await github.issuesReponse(repo.full_name);
                // 获取拉取请求
                const pulls = await github.pullRequestsReponse(repo.full_name);
                // 添加到返回数据
                repoActivity.push({ repoName: repo.full_name, commits, issues, pulls });
            }
            try {
                ctx.body = { code: 200, repoActivity };
                ctx.status = 200;
            }catch(error) {
                ctx.status = 500;
                ctx.body = { code: 500, error: '某些原因,已经获取数据但无法发送Github的数据' };
            }
        } catch(error) {
            ctx.status = 500;
            ctx.body = { code: 500, error: '无法获取 GitHub Star 仓库内部信息' };
        }
    }catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '尝试获取用户的Star仓库数据失败' };
    }


})

module.exports = router; // 导出路由