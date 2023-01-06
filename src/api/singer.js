import request from "@/utils/request";

export const findArtistList = ({
  type = -1,
  area = -1,
  initial = -1,
  limit = 20,
  offset = 0,
}) => {
  return request("/artist/list", "get", { type, area, initial, limit, offset });
};

export const findSingerDesc = (id = 6452) => {
  return request("/artist/detail", "get", { id });
};

export const findSingerHotSongs = (id) => {
  return request("/artist/top/song", "get", { id });
};

export const findSingerAllSongs = ({ singerId, limit, offset, order }) => {
  return request("/artist/songs", "get", {
    id: singerId,
    limit,
    offset,
    order,
  });
};

export const findSingerAlbum = ({ id = 6452, offset = 0, limit = 30 }) => {
  return request("/artist/album", "get", { id, offset, limit });
};

export const findSingerDetailAlbum = (id) => {
  return request("/album", "get", { id });
};
