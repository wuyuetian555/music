<template>
  <img
    :src="src + '?param=250y250'"
    alt="图片无法加载"
    v-show="src"
    crossorigin
    class="img"
  />
  <img src="@/assets/images/musicBg.png" v-show="!src" />
</template>

<script>
import { findMusicDetail } from '@/api/music';
import { watch } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'MusicImage',
  props: {
    src: { default: '' }
  },
  setup() {
    const store = useStore();
    const musicInfo = store.getters['musicplay/getPlayingMusic'];
    watch(
      [() => musicInfo.musicId, () => musicInfo.musicBg],
      (newVal) => {
        if (musicInfo.musicBg || !musicInfo.musicId) {
          return;
        }
        if (newVal[0].toString().includes('th')) {
          musicInfo.musicBg = null;
        } else {
          findMusicDetail(newVal[0]).then((res) => {
            musicInfo.musicBg = res.songs[0].al.picUrl;
          });
        }
      },
      {
        immediate: true
      }
    );
  }
};
</script>

<style scoped lang="less">
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
