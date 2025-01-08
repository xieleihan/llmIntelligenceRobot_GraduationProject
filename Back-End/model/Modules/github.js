const { axiosInternetGet } = require('../../api/index');

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

module.exports = {
    getGithubRepos,
    getGithubStarredRepos
}