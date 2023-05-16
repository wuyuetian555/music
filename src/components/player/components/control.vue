<template>
  <div class="control">
    <div class="control-item">
      <i class="iconfont icon-shangyishou" @click="lastMusic"></i>
      <i class="iconfont icon-zanting1" v-show="isPlay" @click="pauseMusic"></i>
      <i class="iconfont icon-bofang1" v-show="!isPlay" @click="playMusic"></i>
      <i class="iconfont icon-xiayishou" @click="nextMusic"></i>
    </div>
    <div class="volume" @mouseleave="mouseLeave" @mouseenter="mouseEnter">
      <i
        class="iconfont"
        :class="{
          'icon-shengyin_shiti': volume != 0,
          'icon-24gf-volumeCross': volume == 0
        }"
      ></i>
      <VolumeProgress
        v-model:currentTime="volume"
        @clickProgress="getProgressValue"
        showTitle="true"
        v-show="showProgress"
      ></VolumeProgress>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import useMusicControl from '@/hooks/useMusicControl';
import VolumeProgress from '@/components/progress.vue';
export default {
  name: 'control',
  components: { VolumeProgress },
  setup() {
    const store = useStore();
    const showProgress = ref(false);
    const isPlay = computed(() => {
      return store.state.musicplay.musicList.isPlay;
    });
    const volume = ref(null);
    const { pauseMusic, playMusic, nextMusic, lastMusic } = useMusicControl();
    const getProgressValue = () => {
      if (volume.value == 'Infinity') volume.value = 1;
      store.state.musicplay.audio.volume = volume.value > 1 ? 1 : volume.value;
      localStorage.setItem('volume', volume.value);
    };
    const mouseEnter = () => {
      showProgress.value = true;
    };
    const mouseLeave = () => {
      showProgress.value = false;
    };
    onBeforeMount(() => {
      const localVolume = localStorage.getItem('volume');
      if (localVolume) {
        store.state.musicplay.audio.volume = localVolume;
      }
      volume.value = store.state.musicplay.audio.volume;
    });

    return {
      isPlay,
      pauseMusic,
      playMusic,
      nextMusic,
      lastMusic,
      volume,
      getProgressValue,
      mouseEnter,
      showProgress,
      mouseLeave
    };
  }
};
</script>

<style scoped lang="less">
.control {
  display: flex;
  align-items: center;
  height: 50px;
  .control-item {
    display: flex;
    width: 120px;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    i {
      font-size: 30px;
      cursor: pointer;
      color: @primaryTextColor;

      &:hover {
        font-weight: 700;
      }
    }
  }
  .volume {
    padding: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    position: relative;
    i {
      font-size: 22px;
      color: @primaryTextColor;
      &:hover {
        font-weight: 700;
      }
    }
    .music-progress {
      margin-left: 10px;
      background-color: transparent;
      position: absolute;
      left: 27px;
      padding-right: 200px;
    }
  }
}
</style>
