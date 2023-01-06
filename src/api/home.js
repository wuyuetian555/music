import request from "@/utils/request";
export const findDailyRecommendsongs = () => {
  return request("/recommend/songs", "get");
};

export const findUserInfo = () => {
  return request("/user/account", "get");
};
export const findPersonalMusic = () => {
  return request("/personal_fm", "get", { time: Date.now() });
};

//获取歌单信息
export const findRecommendSongList = () => {
  return request("/personalized", "get");
};


//获取某歌单部分歌曲以及信息
export const findPartRecommendSongList = (id) => {
  return request("/playlist/detail", "get", { id });
};
