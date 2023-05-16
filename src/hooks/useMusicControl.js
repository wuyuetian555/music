import { useStore } from 'vuex';
import Dialog from '@/components/UI/Dialog.js';
export default () => {
  const store = useStore();
  const pauseMusic = () => {
    store.commit('musicplay/pauseMusic');
  };
  const playMusic = ({ musicId }) => {
    const currentMusicId = store.getters['musicplay/getPlayingMusic'].musicId;
    const src = store.state.musicplay.audio.src;
    if (!musicId && currentMusicId) {
      src
        ? store.commit('musicplay/playMusic')
        : store.dispatch('musicplay/playMusic', currentMusicId);
    } else if (musicId) {
      musicId == currentMusicId && src
        ? store.commit('musicplay/playMusic')
        : store.dispatch('musicplay/playMusic', musicId);
    }
  };

  const nextMusic = () => {
    if (store.getters['musicplay/getMusicListData'].name) {
      store.getters['musicplay/getMusicListData'].data &&
        store.dispatch('musicplay/nextPersonalMusic');
    } else {
      store.getters['musicplay/getMusicListData'].data &&
        store.dispatch('musicplay/nextMusic');
    }
  };
  const lastMusic = () => {
    if (store.getters['musicplay/getMusicListData'].name) {
      store.getters['musicplay/getMusicListData'].data &&
        store.dispatch('musicplay/lastPersonalMusic');
    } else {
      store.getters['musicplay/getMusicListData'].data &&
        store.dispatch('musicplay/lastMusic');
    }
  };
  const playMusicList = ({ musicListData, musicId }) => {
    const currentMusicId = store.getters['musicplay/getPlayingMusic'].musicId;
    const src = store.state.musicplay.audio.src;
    if (currentMusicId == musicId && src) {
      store.commit('musicplay/playMusic');
    } else {
      const song = musicListData.filter((item) => {
        return item.musicId == musicId;
      });
      !song[0].iscanPlay
        ? store.dispatch('musicplay/songlistAddtoMusicList', {
            musicListData,
            musicId
          })
        : Dialog({
            show: true,
            hidebtn: true,
            text: '该歌曲暂时无法播放',
            title: '提示'
          });
    }
  };
  return {
    pauseMusic,
    playMusic,
    nextMusic,
    lastMusic,
    playMusicList
  };
};
