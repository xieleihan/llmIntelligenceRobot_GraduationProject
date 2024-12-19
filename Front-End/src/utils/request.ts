import axios from 'axios'; // 导入axios

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.React_APP_BASE_API, // api的base_url
  timeout: 5000 // 请求超时时间
});

// 添加请求拦截器
instance.interceptors.request.use((config) => {
  // console.log("config:", config);
  return config;
},
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // console.log("response:", response);
  const { code, status, data, meta } = response.data;
  if (code === 200) return data;
  if (status === 200) return meta;
  else {
    return Promise.reject(response.data);
  }
},
  (error) => {
    // 对响应错误做点什么
    console.log("error-response:", error.response);
    console.log("error-config:", error.config);
    console.log("error-request:", error.request);
    return Promise.reject(error);
  }
);

// 暴露这个实例
export default instance;