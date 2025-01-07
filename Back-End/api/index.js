const service = require('../utils/request');
const dotenv = require('dotenv');
dotenv.config();

const base_url = process.env.BASE_URL;

// 封装get请求
function axiosGet(url, params) {
    return service.get(`${base_url}`+url, params )
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}


// 封装post请求
function axiosPost(url, params) {
    return service.post(`${base_url}` + url, params)
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

// 封装远程Get请求
function axiosInternetGet(url, params) {
    return service.get(url, params)
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

module.exports = {
    axiosGet,
    axiosPost,
    axiosInternetGet
}