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

/**
 * 获取用户下面的文件信息
 * @param data 
 * @returns 
 */
export const getFileinfo = function (data: any) {
    return post('/protected/getFileInfo', data);
}

/**
 * 插入文件信息
 * @param data 
 * @returns 
 */
export const setFileInfo = function (data: any) {
    return post('/protected/insertFileInfo', data);
}

/**
 * 获取文件下载地址
 * @param {String} fileType 文件的类型(允许的类型有: md, pdf, docx, xml, html, txt,json)
 * @param {obejct} data 传入的数据
 * @param {String} data.content 文件的内容
 * @param {String} data.filename 文件的名称
 * @returns {object} res 返回文件的信息
 * @returns {String} res.url 返回文件的下载地址
 * @returns {String} res.message 返回信息
 */
export const getFileUrl = function (fileType: string,data:any) {
    return post(`/protected/save-${fileType}`, data);
}