import { themes } from "@/theme/model";
import { changeStyle } from "@/theme/theme";
import { login } from "@/api/user";
import { ElMessage } from "element-plus";
export default {
  namespaced: true,
  state() {
    return {
      playedMusic: localStorage.getItem("playedMusic")
        ? JSON.parse(localStorage.getItem("playedMusic"))
        : [],
      mylike: localStorage.getItem("mylikesong")
        ? JSON.parse(localStorage.getItem("mylikesong"))
        : [],
      showAside: localStorage.getItem("showAside")
        ? JSON.parse(localStorage.getItem("showAside"))
        : true,
      theme: localStorage.getItem("theme")
        ? localStorage.getItem("theme")
        : "default",
      myThemeDetail: localStorage.getItem("myThemeDetail")
        ? JSON.parse(localStorage.getItem("myThemeDetail"))
        : [],
      listDom: {
        dom: "",
        scroll: {},
        isShowTopNav: "",
      },
      userinfo: {
        email: localStorage.getItem("userinfo")
          ? JSON.parse(localStorage.getItem("userinfo")).email
          : null,
        token: localStorage.getItem("userinfo")
          ? JSON.parse(localStorage.getItem("userinfo")).token
          : null,
      },
    };
  },
  getters: {
    GETMYLIKE(state) {
      return state.mylike;
    },
    GETSCROLLTOP(state) {
      return state.listDom;
    },
    GETISSHOWTOPNAV(state) {
      return state.listDom.isShowTopNav;
    },
  },
  actions: {
    getPlayedMusic({ commit, rootState }) {
      const musicList = rootState.musicplay.musicList.data;
      const song = musicList.data[musicList.index];
      commit("savePlayedMusic", { song });
    },
    async requestLogin({ state }, { email, password }) {
      const { status, token } = await login({ email, password });
      if (status == 200) {
        state.userinfo.email = email;
        state.userinfo.token = token;
        localStorage.setItem("userinfo", JSON.stringify(state.userinfo));
        ElMessage({
          message: `Hi,欢迎回来${email}用户`,
          type: "success",
        });
      } else {
        ElMessage({
          message: `邮箱或密码错误`,
          type: "error",
        });
      }
    },
  },
  mutations: {
    addMyLike(state, { song }) {
      state.mylike.push(song);
      localStorage.setItem("mylikesong", JSON.stringify(state.mylike));
    },
    subMyLike(state, { song }) {
      const index = state.mylike.findIndex((item) => {
        return item.musicId == song.musicId;
      });
      state.mylike.splice(index, 1);
      localStorage.setItem("mylikesong", JSON.stringify(state.mylike));
    },
    savePlayedMusic(state, { song }) {
      state.playedMusic = state.playedMusic.filter((item) => {
        return item.musicId != song.musicId;
      });
      state.playedMusic.unshift(song);
      localStorage.setItem("playedMusic", JSON.stringify(state.playedMusic));
    },
    deleteAllPlayedMusic(state, { songList }) {
      state.playedMusic = [];
      state.playedMusic.push(...songList);
      localStorage.setItem("playedMusic", JSON.stringify(songList));
    },
    deleteOneSong(state, { musicId }) {
      const index = state.playedMusic.findIndex(
        (item) => item.musicId == musicId
      );
      state.playedMusic.splice(index, 1);
      localStorage.setItem("playedMusic", JSON.stringify(state.playedMusic));
    },
    deleteAllMyLike(state, { songList }) {
      state.mylike.splice(0);
      state.mylike.push(...songList);
      localStorage.setItem("mylikesong", JSON.stringify(songList));
    },
    isShowAside(state) {
      state.showAside = !state.showAside;
      localStorage.setItem("showAside", JSON.stringify(state.showAside));
    },
    setTheme(state, theme) {
      localStorage.setItem("theme", theme);
      const themeConfig = themes[theme];
      themeConfig ? changeStyle(themeConfig) : changeStyle(state.myThemeDetail);
      state.theme = theme;
    },
    initTheme(state, theme) {
      const themeConfig = themes[theme];
      themeConfig ? changeStyle(themeConfig) : changeStyle(state.myThemeDetail);
    },
    setMyTheme(state, color) {
      changeStyle(color);
      state.theme = "myTheme";
      localStorage.setItem("theme", "myTheme");
      state.myThemeDetail = color;
      localStorage.setItem("myThemeDetail", JSON.stringify(color));
    },
    getScrollTop(state, { name, scrollTop }) {
      state.listDom.scroll = Object.assign(state.listDom.scroll, {
        [name]: scrollTop,
      });
    },
    getScrollTopDom(state, dom) {
      state.listDom.dom = dom;
    },
    listenListScroll(state, scrollTop) {
      state.listDom.isShowTopNav = scrollTop;
    },
    signOut(state) {
      state.userinfo.email = null;
      state.userinfo.token = null;
      localStorage.removeItem("userinfo");
    },
  },
};
