import {url} from '../api/index'

const baseURL = url;
/**
 * 封装一个基于 Promise 的 GET 请求函数
 * @param url 请求的 URL
 * @param data 请求的数据（可选）
 * @returns Promise 对象
 */
export function get(url: string, data?: any): Promise<any> {
  console.log("1111",baseURL+url,data)
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