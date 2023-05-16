import request from '@/utils/request';
export const findMusicUrl = (id) => {
  return request('/song/url', 'get', { id });
};

export const findMusicLyric = (id) => {
  return request('/lyric', 'get', { id });
};

export const findMusicDetail = (ids) => {
  return request('/song/detail', 'get', { ids });
};
export const findMusicMv = (id) => {
  return request('/mv/url', 'get', { id });
};

export const getWYYMusicFileBlob = ({ url }) => {
  return request(url, 'get', '', 'blob', false);
};
