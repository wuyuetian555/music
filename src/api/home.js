import request from '@/utils/request';
export const findDailyRecommendsongs = () => {
  return request('/recommend/songs', 'get');
};

export const findUserInfo = () => {
  return request('/user/account', 'get');
};
export const findPersonalMusic = () => {
  return request('/personal_fm', 'get', { time: Date.now() });
};

export const findRecommendSongList = () => {
  return request('/personalized', 'get');
};

export const findPartRecommendSongList = (id) => {
  return request('/playlist/detail', 'get', { id });
};
