import axios from 'axios';
import store from '@/store';
import { ElMessage } from 'element-plus';

const instance = axios.create({
  baseURL: 'http://124.220.0.103:3000',
  timeout: 10000
});

instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default (url, method, submitData, responseType, withCredentials) => {
  return instance({
    url,
    method,
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData,
    responseType,
    withCredentials
  });
};

const instance2 = axios.create({
  baseURL: 'http://124.220.0.103:3001',
  timeout: 10000
});
instance2.interceptors.request.use(
  (config) => {
    const { token } = store.state.user.userinfo;

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance2.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
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
