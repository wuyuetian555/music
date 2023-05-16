import request from '@/utils/request';

export const findDetailedRecommendSongList = (id) => {
  return request('/playlist/track/all', 'get', { id });
};
