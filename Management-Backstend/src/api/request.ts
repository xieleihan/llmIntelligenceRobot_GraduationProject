import { getOut, post,get } from './index';

export const getLog = function () {
    return get('/logs');
}

/**
 * 发送消息给Deepseek
 * @param data 
 * @returns 
 */
export const sendMsg = function (data: any) {
    return post('/protected/deepseek', data);
};

/**
 * 获取用户IP
 * @param {string} params
 * @returns res.ip
 */
export const getUserIp = function (params: any){
    return getOut('https://api.vore.top/api/IPdata', params);
}

/**
 * 超级管理员登录
 * @param {object} data
 * @returns res
 */
export const adminLogin = function (data: any) { 
    return post('/private/superadminlogin', data);
}

/**
 * 获取中国用户访问数据
 * @returns {object} res
 * @returns {object.province} res.province
 * @renturn {object.value} res.value
 */
export const chinaDataList = function () {
    return get('/private/get-china-datalist');
}

/**
 * 获取服务器状态
 * @returns {object} res
 */
export const getServerStatus = function () {
    return get('/private/get-server-state');
}

/**
 * 获取static文件下的不同类型的文件数量
 */
export const getCountFileType = function () {
    return get('/protected/file-stats');
}

/**
 * 返回文件名下的文件内容
 * @param {String} filename 
 * @returns {String} res.data
 */
export const getFileContent = function (filename:string) {
    return post('/protected/get-file-content', {filename});
}

/**
 * xml转html
 * @param {String} xml
 * @returns {String} res.result
 */
export const xmlToHtml = function (xml: string) {
    return post('/protected/xml-to-html', {xml});
}

/**
 * json转html
 * @param {String} jsonString
 * @returns {String} res.result
 */
export const jsonToHtml = function (jsonString: string) {
    return post('/protected/json-to-html', {jsonString});
}

/**
 * txt转html
 * @param {String} txt
 * @returns {String} res.result
 */
export const txtToHtml = function (txt: string) {
    return post('/protected/txt-to-html', {txt});
}

/**
 * markdown转html
 * @param {String} md
 * @returns {String} res.result
 */
export const markdownToHtml = function (md: string) {
    return post('/protected/md-to-html', {md});
}

/**
 * pdf转html
 * @param {String} pdfName 这个地方是文件名不是内容
 * @returns {String} res.result
 */
export const pdfToHtml = function (pdfName: string) { 
    return post('/protected/pdf-to-html', { pdfName });
}

/**
 * docx转html 暂时废弃,别调用
 * @param {String} docxName 这个地方是文件名不是内容
 * @returns {String} res.result
 */
export const docxToHtml = function (docxName: string) { 
    return post('/protected/docx-to-html', { docxName });
}