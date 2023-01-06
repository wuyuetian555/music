import request from "@/utils/request";
//获取某歌单全部歌曲
export const findDetailedRecommendSongList = (id) => {
    return request("/playlist/track/all", "get", { id });
  };