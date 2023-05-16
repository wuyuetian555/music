<template>
  <div class="player">
    <musicProgress
      :currentTime="currentTime"
      :duration="audio.duration"
      @clickProgress="audio.currentTime = $event"
    ></musicProgress>
    <div class="music-player">
      <div class="music-item">
        <div
          class="music-item-img"
          @click="$store.commit('musicplay/isShowLyric')"
        >
          <music-image :src="musicInfo.musicBg"></music-image>
        </div>
        <div class="music-item-music">
          <div class="music-name-item">
            <span class="ellipsis music-name">{{ musicInfo.musicName }}</span>
            <music-mvicon
              v-if="musicInfo.musicMv"
              :data-mvid="musicInfo.musicMv"
              :data="musicInfo.musicMv"
              @click="goMv(musicInfo.musicMv)"
            ></music-mvicon>
          </div>
          <span
            class="music-singer"
            @click="goSingerDetail(musicInfo.SingerId)"
            >{{ musicInfo.Singer }}</span
          >
        </div>
      </div>
      <control></control>
      <musicTime
        :filtercurrentTime="filtercurrentTime"
        :duration="duration"
        :showMusicList="showMusicList"
      ></musicTime>
    </div>
  </div>
</template>

<script>
import musicTime from '@/components/player/components/musicTime.vue';
import control from '@/components/player/components/control.vue';

import musicProgress from '@/components/player/components/music-progress.vue';
import { useStore } from 'vuex';
import {
  reactive,
  toRefs,
  onDeactivated,
  onActivated,
  onBeforeUnmount
} from 'vue';
import { filterTime } from '@/utils/usefilter';
import { useRouter } from 'vue-router';

export default {
  name: 'Player',
  components: {
    control,
    musicProgress,
    musicTime
  },
  props: {
    showMusicList: {
      default: true
    }
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const audio = store.state.musicplay.audio;
    audio.crossOrigin = 'anonymous';
    const data = reactive({
      show: '0px',
      showLyric: false,
      musicInfo: store.getters['musicplay/getPlayingMusic'],
      duration: '00:00',
      filtercurrentTime: '00:00',
      currentTime: 0
    });

    function timeupdate() {
      let timer;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            data.filtercurrentTime = filterTime(audio.currentTime);
            data.currentTime = audio.currentTime;
            data.duration = filterTime(audio.duration);
          }, 1000);
        }
      };
    }
    const getCurrentTime = timeupdate();
    const getDuration = () => {
      data.duration = filterTime(audio.duration);
    };
    audio.addEventListener('timeupdate', getCurrentTime);
    audio.addEventListener('canplay', getDuration);

    onDeactivated(() => {
      audio.removeEventListener('timeupdate', getCurrentTime);
      audio.removeEventListener('canplay', getDuration);
    });
    onActivated(() => {
      audio.addEventListener('timeupdate', getCurrentTime);
      audio.addEventListener('canplay', getDuration);
    });
    onBeforeUnmount(() => {
      audio.removeEventListener('timeupdate', getCurrentTime);
      audio.removeEventListener('canplay', getDuration);
    });
    const goSingerDetail = (singerId) => {
      if (singerId && !singerId.toString().includes('th')) {
        store.commit('musicplay/closeLyric');
        router.push({
          name: 'SingerDetail',
          params: {
            singerId: singerId
          }
        });
      }
    };
    const goMv = (id) => {
      store.commit('musicplay/closeLyric');
      router.push({
        name: 'Mv',
        params: {
          mvId: id
        }
      });
    };
    return {
      audio,
      ...toRefs(data),
      goSingerDetail,
      goMv
    };
  }
};
</script>

<style scoped lang="less">
.player {
  height: 80px;
  display: flex;
  flex-direction: column;
  min-width: 900px;

  .music-player {
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px 50px 0px 50px;

    .music-item {
      display: flex;
      flex: 1;

      .music-item-img {
        width: 50px;
        height: 50px;
        border-radius: 6px;
        overflow: hidden;
        cursor: pointer;
      }

      .music-item-music {
        margin-left: 8px;
        .music-name-item {
          display: flex;
          align-items: center;
          .music-name {
            max-width: 300px;
            display: inline-block;
          }
        }

        .music-singer {
          display: inline-block;
          margin-top: 3px;
          margin-left: 1px;
          font-size: 12px;
          cursor: pointer;
        }
        span {
          color: @primaryTextColor;
        }
      }
    }
  }
}
</style>
