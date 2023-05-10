import axios from 'axios';
import store from '@/store';
import { ElMessage } from 'element-plus';
const instance = axios.create({
  baseURL: 'http://124.220.0.103:3000',
  timeout: 10000
});
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default (url, method, submitData, responseType, withCredentials) => {
  // 负责发请求：请求地址，请求方式，提交的数据
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
    responseType,
    withCredentials
  });
};

const instance2 = axios.create({
  baseURL: 'http://127.0.0.1:3001',
  timeout: 10000
});
instance2.interceptors.request.use(
  function (config) {
    const { token } = store.state.user.userinfo;
    // 2. 判断是否有token
    if (token) {
      // 3. 设置token
      config.headers.Authorization = token;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么

    return Promise.reject(error);
  }
);

// 添加响应拦截器
instance2.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    ElMessage({
      message: error.response ? error.response.data.message : error.message,
      type: 'error'
    });
    return Promise.reject(error);
  }
);

export const request = (
  url,
  method,
  submitData,
  headers,
  responseType,
  withCredentials
) => {
  return instance2({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
    headers,
    responseType,
    withCredentials
  });
};
