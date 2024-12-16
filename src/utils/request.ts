import axios from 'axios'; // 导入axios

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.React_APP_BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
});

// request拦截器
instance.interceptors.request.use(function (response) {
    // 2xx范围内的状态码都会触发这个函数
    // 对响应数据做点什么
    return response.data;
}, function (error) {
    // 非2xx范围内的状态码都会触发这个函数
    // 对响应错误做点什么
    return Promise.reject(error);
}
);

// 暴露这个实例
export default instance;