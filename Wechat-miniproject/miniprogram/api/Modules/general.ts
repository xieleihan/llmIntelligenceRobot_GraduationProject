import { get,post,internetGet } from '../../api/request';

/**
 * 生成图片验证码
 */
export const createSvgCode = function(){
  return get('/createSvgCode');
}

/**
 * 发送邮件验证码
 * @param data 
 */
export const sendEmailVerifyCode = function(data:any){
  return get('/api/email/send',data)
}

/**
 * 注册
 * @param data 
 */
export const register = function(data:any){
  return post('/public/register',data,'');
}

/**
 * 登录
 */
export const login = function(data:any){
  return post('/public/login',data,'')
}

/**
 * 获取用户登录的IP信息
 */
export const getUserIp = function () {
  return internetGet('https://api.vore.top/api/IPdata');
}