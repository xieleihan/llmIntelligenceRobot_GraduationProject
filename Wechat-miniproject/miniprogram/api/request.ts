import {url} from '../api/index'

const baseURL = url;
/**
 * 封装一个基于 Promise 的 GET 请求函数
 * @param url 请求的 URL
 * @param data 请求的数据（可选）
 * @returns Promise 对象
 */
export function get(url: string, data?: any): Promise<any> {
  console.log("发起一个GET请求:请求的url是:"+url+"数据是:"+data)
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL+url,
      method: 'GET',
      data: data,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 封装一个基于 Promise 的 POST 请求函数
 * @param url 请求的 URL
 * @param data 请求的数据
 * @returns Promise 对象
 */
export function post(url: string, data: any,type:string): Promise<any> {
  if(type === ''){
    type = 'application/json'
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL+url,
      method: 'POST',
      data: data,
      header: {
        'content-type': type // 默认值
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 封装一个基于 Promise 的 internet GET 请求函数
 * @param url 请求的 URL
 * @param data 请求的数据（可选）
 * @returns Promise 对象
 */
export const internetGet = function(url: string, data?: any): Promise<any> {
  console.log("发起一个internet GET请求:请求的url是:"+url+"数据是:"+data)
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'GET',
      data: data,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}

/**
 * 封装一个基于 Promise 的 internet POST 请求函数
 * @param url 请求的 URL
 * @param data 请求的数据
 * @returns Promise 对象
 */
export function internetPost(url: string, data: any,type:string): Promise<any> {
  if(type === ''){
    type = 'application/json'
  }
  
  return new Promise((resolve, reject) => {
    wx.request({
      url: url,
      method: 'POST',
      data: data,
      header: {
        'content-type': type // 默认值
      },
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data);
        } else {
          reject(new Error(`Request failed with status code ${res.statusCode}`));
        }
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
}