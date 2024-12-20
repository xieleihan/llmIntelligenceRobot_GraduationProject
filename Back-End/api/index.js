const service = require('../utils/request');

// 封装get请求
function axiosGet(url, params) {
    return service.get(url, { params })
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}


// 封装post请求
function axiosPost(url, params) {
    return service.post(url, params)
        .then(res => res)  // 返回整个响应对象
        .catch(err => Promise.reject(err));
}

module.exports = {
    axiosGet,
    axiosPost
}