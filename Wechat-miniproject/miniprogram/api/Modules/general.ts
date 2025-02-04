import { get,post } from '../../api/request';

/**
 * 生成图片验证码
 */
export const createSvgCode = function(){
  return get('/createSvgCode');
}

/**
 * 注册
 * @param data 
 */
export const register = function(data:any){
  return post('/public/register',data,'');
}