const Router = require('@koa/router'); // 导入Koa路由
const { axiosInternetGet } = require('../../api/index');

const router = new Router(
    {
        prefix: '/public',
    }
); // 设置公共前缀

// GitHub 自己或其他用户仓库信息的获取函数
const getGithubRepos = async (username) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/users/${username}/repos`);
        // console.log("这是获取的仓库数据:", response.data);
        return response.data; // 返回仓库数据
    } catch (error) {
        throw new Error('GitHub API 请求失败');
    }
};

// Github获取自己关注或者其他用户关注的仓库信息
const getGithubStarredRepos = async (username) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/users/${username}/starred`);
        return response.data; // 返回关注的仓库数据
    } catch (error) {
        throw new Error('GitHub API 请求失败');
    }
};

// POST 接口：获取自己或其他用户仓库信息
router.post('/get-github-repos', async (ctx) => {
    const { username } = ctx.request.body; // 获取 POST 请求体中的 GitHub 用户名

    if (!username) {
        ctx.status = 400;
        ctx.body = { code: 400, error: 'GitHub 用户名是必需的' };
        return;
    }

    try {
        const repos = await getGithubRepos(username); // 获取仓库信息
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
        const repos = await getGithubStarredRepos(username); // 获取仓库信息
        ctx.body = { code:200,repos }; // 返回仓库信息
    }catch (error) {
        ctx.status = 500;
        ctx.body = { code: 500, error: '无法获取 GitHub 仓库信息' };
    }
});

module.exports = router; // 导出路由