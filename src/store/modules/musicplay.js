import { findPersonalMusic } from '@/api/home.js';
import {
  findMusicUrl,
  findMusicDetail,
  getWYYMusicFileBlob
} from '@/api/music';
import { filterTime } from '@/utils/usefilter';
import Dialog from '@/components/UI/Dialog.js';
import Message from '@/components/UI/message.js';
import {
  getMyUploadMusicUrl,
  getMusicDetail,
  getMusicFileBlob
} from '@/api/user.js';
import { h } from 'vue';
import { ElNotification } from 'element-plus';
export default {
  namespaced: true,
  state() {
    return {
      audio: new Audio(),
      musicList: {
        playingMusic: localStorage.getItem('playingMusic')
          ? JSON.parse(localStorage.getItem('playingMusic'))
          : {
              musicName: '听我想听',
              musicId: '',
              musicMv: '', //正在播放的歌曲信息
              zhuanji: '',
              zhuanjiId: '',
              SingerId: '',
              musicBg: '',
              Singer: ''
            },
        data: {
          data: localStorage.getItem('musicList')
            ? JSON.parse(localStorage.getItem('musicList'))
            : [],
          index: '',
          name: false
        }, //播放队列中的所有歌曲
        isPlay: false //是否播放
      },
      personalMusic: {
        data: [],
        index: 0,
        name: true
      }, //个性电台
      showLyric: false,
      showMusicList: false
    };
  },
  getters: {
    getPlayingMusic(state) {
      return state.musicList.playingMusic;
    },
    getMusicListData(state) {
      return state.musicList.data;
    },
    getMusicListLength(state) {
      return state.musicList.data.data.length;
    }
  },
  mutations: {
    playMusic(state, src) {
      if (!src && state.audio.src) {
        state.audio.play();
        state.musicList.isPlay = true;
      } else if (src) {
        try {
          state.audio.src = src;
          setTimeout(() => {
            state.audio.play();
            state.musicList.isPlay = true;
          }, 200);
        } catch (error) {}
      }
    },
    getPlayMusic(state, musicId) {
      let musicData = state.musicList;
      const index = musicData.data.data.findIndex((item) => {
        return item.musicId == musicId;
      });
      musicData.data.index = index;

      for (var key in musicData.playingMusic) {
        musicData.playingMusic[key] = musicData.data.data[index][key];
      }
      localStorage.setItem(
        'playingMusic',
        JSON.stringify(musicData.playingMusic)
      );
    },
    editPersonalMusicIndex(state, index) {
      state.personalMusic.index = index;
    },

    pauseMusic(state) {
      state.audio.pause();
      state.musicList.isPlay = false;
    },
    isShowLyric(state) {
      state.showLyric = !state.showLyric;
    },
    isShowMusicList(state) {
      state.showMusicList = !state.showMusicList;
    },
    closeLyric(state) {
      state.showLyric = false;
    }
  },
  actions: {
    async getPersonalMusic({ state }) {
      const personalMusic = await findPersonalMusic();
      personalMusic.data = personalMusic.data.map((item) => {
        return {
          musicName: item.name,
          musicId: item.id,
          musicMv: item.mvid,
          zhuanji: item.album.name,
          musicBg: item.album.blurPicUrl,
          Singer: item.artists[0].name,
          SingerId: item.artists[0].id,
          duration: filterTime(item.duration / 1000),
          iscanPlay: item.noCopyrightRcmd,
          zhuanjiId: item.album.id
        };
      });

      state.personalMusic.data.push(...personalMusic.data);
      return personalMusic.data;
    },

    async getMusicUrl(state, id) {
      if (id.toString().includes('th')) {
        const musicUrl = await getMyUploadMusicUrl({ id });
        return musicUrl.data[0].url;
      } else {
        const musicUrl = await findMusicUrl(id);
        return musicUrl.data[0].url;
      }
    },

    async PersonalMusicAddToMusicList({ state, dispatch, commit }, musicId) {
      if (state.musicList.data.name) {
        commit('playMusic');
        return;
      }
      const result = await dispatch('getMusicUrl', musicId);
      state.musicList.data = JSON.parse(JSON.stringify(state.personalMusic));

      commit('playMusic', result);
      commit('getPlayMusic', musicId);
      await dispatch('user/getPlayedMusic', {}, { root: true });
    },
    async nextMusic({ state, dispatch }) {
      let musicData = state.musicList.data;
      if (musicData.index + 1 == musicData.data.length) {
        musicData.index = -1;
      }
      const nextMusicId = musicData.data[musicData.index + 1].musicId;
      const result = await dispatch('playMusic', nextMusicId);
      if (!result) {
        musicData.data.splice(musicData.index + 1, 1);
        await dispatch('nextMusic');
      }
    },
    async nextPersonalMusic({ state, dispatch, commit }) {
      let musicData = state.musicList.data;
      if (musicData.data.length - 1 === musicData.index) {
        const musicDate = await dispatch('getPersonalMusic');
        musicData.data.push(...musicDate);
      }
      const nextMusicId = musicData.data[musicData.index + 1].musicId;
      await dispatch('playMusic', nextMusicId);
    },

    async lastMusic({ state, dispatch }) {
      let musicData = state.musicList.data;
      if (musicData.index == 0) return;
      const lastMusicId = musicData.data[musicData.index - 1].musicId;
      const result = await dispatch('playMusic', lastMusicId);
      if (!result) {
        musicData.data.splice(musicData.index - 1, 1);
      }
    },
    async lastPersonalMusic({ state, dispatch }) {
      let musicData = state.musicList.data;
      if (musicData.index === 0) {
        return;
      }
      const lastMusicId = musicData.data[musicData.index - 1].musicId;
      await dispatch('playMusic', lastMusicId);
    },
    async songlistAddtoMusicList(
      { state, dispatch, commit },
      { musicId, musicListData }
    ) {
      const url = await dispatch('musicisPlay', musicId);
      if (!url) {
        Dialog({
          show: true,
          hidebtn: true,
          text: '该歌曲暂时无法播放',
          title: '提示'
        });
        return;
      }
      let musicData = state.musicList.data;
      musicData.data = musicListData.filter((item) => {
        return !item.iscanPlay;
      });
      musicData.name = false;
      commit('playMusic', url);
      commit('getPlayMusic', musicId);
      await dispatch('user/getPlayedMusic', {}, { root: true });
    },

    async baseonSearchGetSongAddtoMusicList(
      { state, dispatch, commit },
      { song, musicId }
    ) {
      const url = await dispatch('getMusicUrl', musicId);
      if (!url) {
        Dialog({
          show: true,
          hidebtn: true,
          text: '该歌曲暂时无法播放',
          title: '提示'
        });
        return;
      }
      let musicData = state.musicList.data;
      if (!musicData.name) {
        const index = musicData.index || 0;
        musicData.data.splice(index + 1, 0, song[0]);
        commit('playMusic', url);
        commit('getPlayMusic', musicId);
        await dispatch('user/getPlayedMusic', {}, { root: true });
      } else {
        musicData.data = song;
        musicData.name = false;
        commit('playMusic', url);
        commit('getPlayMusic', musicId);
        await dispatch('user/getPlayedMusic', {}, { root: true });
      }
    },
    async playMusic({ dispatch, commit, getters }, musicId) {
      const url = await dispatch('getMusicUrl', musicId);
      if (!url) {
        ElNotification({
          title: '提示',
          message: '一首歌曲无法播放，已自动播放下一首',
          type: 'error',
          position: 'top-left'
        });
        return false;
      } else {
        commit('playMusic', url);
        commit('getPlayMusic', musicId);
        await dispatch('user/getPlayedMusic', {}, { root: true });
        getters['getMusicListData'].name &&
          commit('editPersonalMusicIndex', getters['getMusicListData'].index);
        return true;
      }
    },
    async musicisPlay({ dispatch }, musicId) {
      const url = await dispatch('getMusicUrl', musicId);
      return url ? url : false;
    },
    async downloadMusic({ dispatch }, { musicId }) {
      let musicName, singer, url, response;

      if (musicId.toString().includes('th')) {
        const res = await Promise.all([
          getMusicDetail({ id: musicId }),
          getMyUploadMusicUrl({ id: musicId })
        ]);
        musicName = res[0].data.musicName;
        singer = res[0].data.Singer;
        url = res[1].data[0].url;
        ElNotification({
          title: '提示',
          message: '开始下载  ' + musicName + ' - ' + singer,
          type: 'success',
          position: 'top-left'
        });
        response = await getMusicFileBlob({ url });
      } else {
        const res = await Promise.all([
          findMusicDetail(musicId),
          findMusicUrl(musicId)
        ]);
        singer = res[0].songs[0].ar[0].name;
        musicName = res[0].songs[0].name;
        url = res[1].data[0].url;
        ElNotification({
          title: '提示',
          message: '开始下载  ' + musicName + ' - ' + singer,
          type: 'success',
          position: 'top-left'
        });
        response = await getWYYMusicFileBlob({ url });
      }

      let blob = new Blob([response]);
      let blobUrl = window.URL.createObjectURL(blob);
      let a = document.createElement('a');
      a.href = blobUrl;
      a.download = `${musicName}-${singer}.mp4`;
      a.click();
      window.URL.revokeObjectURL(blobUrl);
    }
  }
};
