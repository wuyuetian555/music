import usefIlterMusicData from "@/hooks/usefIlterMusicData";
import { findsearchSuggest } from "@/api/search";
import { searchSongs } from "@/api/search";
export default {
  namespaced: true,
  state() {
    return {
      searchList: [],
      searchValue: "",
      activeIndex: 0,
    };
  },
  getters: {
    GETACTIVEINDEX(state) {
      return state.activeIndex;
    },
  },
  actions: {
    async searchSongsRequest({ state }) {
      if (state.searchValue == "") return;
      const result = await searchSongs({ keywords: state.searchValue });
      state.searchList.splice(0);
      setTimeout(() => {
        state.searchList.push(...result.data);
      }, 10);
    },
    async searchWYYSongsSuggest({ state }) {
      const { result } = await findsearchSuggest({
        keywords: state.searchValue,
        limit: 10,
      });
      return result.songs;
    },
    async searchWYYSongs({ state, commit }, { keywords }) {
      if (state.searchValue == "") return;
      const { result } = await findsearchSuggest({
        keywords: keywords ? keywords : state.searchValue,
        limit: 50,
      });
      commit("editActiveIndex", { activeIndex: 0 });
      commit("getSearchList", { songList: result.songs });
    },
  },
  mutations: {
    getSearchList(state, { songList }) {
      state.searchList.splice(0);
      setTimeout(() => {
        state.searchList.push(...usefIlterMusicData(songList));
      }, 10);
    },
    getSearchValue(state, { searchValue }) {
      state.searchValue = searchValue;
    },
    editActiveIndex(state, { activeIndex }) {
      state.activeIndex = activeIndex;
    },
  },
};
