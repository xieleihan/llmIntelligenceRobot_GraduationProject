const { axiosInternetGet } = require('../../api/index');

/**
 * GitHub 自己或其他用户仓库信息的获取函数
 * @param { String } username 
 * @returns response.data
 */
const getGithubRepos = async (username) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/users/${username}/repos`);
        // console.log("这是获取的仓库数据:", response.data);
        return response.data; // 返回仓库数据
    } catch (error) {
        throw new Error('GitHub API 自己或其他用户仓库信息的获取函数请求失败');
    }
};

/**
 * Github获取自己关注或者其他用户关注的仓库信息
 * @param {String} username 
 * @returns response.data
 */
const getGithubStarredRepos = async (username) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/users/${username}/starred`);
        return response.data; // 返回关注的仓库数据
    } catch (error) {
        throw new Error('GitHub API 获取自己关注或者其他用户关注的仓库信息请求失败');
    }
};

// GitHub API 获取 Starred 仓库的提交、问题、拉取请求和事件
/**
 * 获取仓库的提交记录
 * @param {String} repoName 
 * @returns response.data
 */
const commitReponse = async (repoName) => {
    try {
        // console.log("这是请求的链接:", `https://api.github.com/repos/${repoName}/commits`);
        const response = await axiosInternetGet(`https://api.github.com/repos/${repoName}/commits`);
        return response.data;
    } catch (error) {
        throw new Error('GitHub API 获取仓库的提交记录请求失败');
    }
}

/**
 * 获取仓库的问题
 * @param {String} repoName 
 * @returns response.data
 */
const issuesReponse = async (repoName) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/repos/${repoName}/issues`);
        return response.data;
    } catch (error) {
        throw new Error('GitHub API 获取仓库的问题请求失败');
    }
}

/**
 * 获取仓库的拉取请求
 * @param {String} repoName 
 * @returns response.data
 */
const pullRequestsReponse = async (repoName) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/repos/${repoName}/pulls`);
        return response.data;
    } catch (error) {
        throw new Error('GitHub API 获取仓库的拉取请求请求失败');
    }
}

/**
 * 获取仓库的事件
 * @param {String} repoName 
 * @returns response.data
 */
const eventsReponse = async (repoName) => {
    try {
        const response = await axiosInternetGet(`https://api.github.com/repos/${repoName}/events`);
        return response.data;
    } catch (error) {
        throw new Error('GitHub API 获取仓库的事件请求失败');
    }
}

module.exports = {
    getGithubRepos,
    getGithubStarredRepos,
    commitReponse,
    issuesReponse,
    pullRequestsReponse,
    eventsReponse
}