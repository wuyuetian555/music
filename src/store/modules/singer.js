import {
  findSingerHotSongs,
  findSingerAllSongs,
  findSingerAlbum,
} from "@/api/singer";
import usefilterMusicData from "@/hooks/usefIlterMusicData";
import usefilterAlbum from "@/hooks/usefilterAlbum";
export default {
  namespaced: true,
  state() {
    return {
      hotSongs: [],
    };
  },
  getters: {
    hotSongs(state) {
      return state.hotSongs;
    },
  },
  actions: {
    async getSingerHotSongs({ commit }, { singerId }) {
      let res = await findSingerHotSongs(singerId);
      res = usefilterMusicData(res.songs);
      commit("GETHOTSONGS", res);
      return res;
    },
    async getSingerAllSongs({ commit }, { singerId, limit, offset, order }) {
      let res = await findSingerAllSongs({ singerId, limit, offset, order });
      res.songs = usefilterMusicData(res.songs);
      return res;
    },
    async getSingerAlbum({ state }, { id, offset, limit }) {
      let res = await findSingerAlbum({ id, offset, limit });
      res = usefilterAlbum(res);
      return res;
    },
  },
  mutations: {
    GETHOTSONGS(state, data) {
      state.hotSongs = [];
      state.hotSongs.push(...data);
    },
  },
};
