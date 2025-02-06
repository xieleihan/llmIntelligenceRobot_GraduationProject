import { getOut, post, postOut } from './index';

export const sendMsg = function (data: any) {
    return post('/protected/devdeepseek', data);
};

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.data.ip
 */
export const getUserIp = function (params:any) {
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 获取某个用户的仓库信息
 * @param {object} data
 */
export const getGithubRepos = function (data: any) {
    return post('/public/get-github-repos', data);
}

/**
 * 获取自己关注或者其他用户关注的仓库信息
 */
export const getGithubStarredRepos = function(data: any){
    return post('/public/get-github-starred-repos', data);
}