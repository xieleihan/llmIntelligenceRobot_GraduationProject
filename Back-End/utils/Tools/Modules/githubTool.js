const { Tool } = require("langchain/tools");
const { axiosPost } = require('../../../api/index'); // 导入axiosGet函数

const githubTool = new Tool({
    name: "GithubRepoUpdates",
    description: "用于获取用户在 GitHub 上的最新动态信息。例如 '获取 GitHub 用户 SouthAki 的最新动态'",
    func: async  (query)=> {
        const username = query.trim();
        return await axiosPost('/public/get-github-repo-activity', { username });
    }
})

githubTool.name = "GithubRepoUpdates";
githubTool.description = "用于获取用户在 GitHub 上的最新动态信息。例如 '获取 GitHub 用户 SouthAki 的最新动态'";
githubTool.callbacks = async (query) => {
    const username = query.trim();
    return await axiosPost('/public/get-github-repo-activity', { username });
}

module.exports = { githubTool };