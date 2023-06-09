import { request } from '@/utils/request';

export const register = ({ password, email, captcha }) => {
  return request('/users/register', 'post', { password, email, captcha });
};
export const checkUser = ({ user }) => {
  return request('/users/checkUser', 'get', { user });
};
export const checkEmail = ({ email }) => {
  return request('/users/checkEmail', 'get', { email });
};
export const sendEmail = ({ email }) => {
  return request('/users/sendEmail', 'get', { email });
};
export const login = ({ email, password }) => {
  return request('/users/login', 'get', { email, password });
};

export const uploadMusicRequest = ({ formData, headers }) => {
  return request('/users/upload', 'post', formData, headers);
};

export const getMyUploadMusicUrl = ({ id }) => {
  return request('/musicUrl', 'get', { id });
};
export const getMyUploadMusicLyric = ({ id }) => {
  return request('/musicLyric', 'get', { id });
};

export const getMusicDetail = ({ id }) => {
  return request('/getMusicDetail', 'get', { id });
};

export const getMusicFileBlob = ({ url }) => {
  return request(url, 'get', '', '', 'blob', false);
};

export const getUserUploadMusicRequest = () => {
  return request('/users/getUserUploadMusic', 'get');
};

export const musicListUploadRequest = ({ user, musicList }) => {
  return request('/musicListUpload', 'post', { user, musicList });
};

export const getMusicListRequest = ({ user }) => {
  return request('/getMusicList', 'get', { user });
};
