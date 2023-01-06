import usefIlterMusicData from "@/hooks/usefIlterMusicData";
export default {
  namespaced: true,
  state() {
    return {
      searchList: [],
    };
  },
  getters: {},
  actions: {},
  mutations: {
    getSearchList(state, { songList }) {
      state.searchList.splice(0, state.searchList.length);
      setTimeout(() => {
        state.searchList.push(...usefIlterMusicData(songList));
      }, 10);
    },
  },
};
