<template>
  <div class="music-time">
    <i
      class="iconfont icon-geciweidianji lyric"
      @click="$store.commit('musicplay/isShowLyric')"
    ></i>
    <span>{{ filtercurrentTime }} / {{ duration }}</span>
    <div @click="$store.commit('musicplay/isShowMusicList')">
      <i class="iconfont icon-yinleliebiao musicList"></i>
      <i class="songCount ellipsis"
        >{{
          $store.getters["musicplay/getMusicListLength"] != 0
            ? $store.getters["musicplay/getMusicListLength"]
            : null
        }}
      </i>
    </div>
    <musicList :show="show"></musicList>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import musicList from "@/components/player/components/music-list.vue";

import { useStore } from "vuex";
export default {
  name: "MusicTime",
  components: { musicList },
  props: {
    filtercurrentTime: {
      default: "00:00",
    },
    duration: {
      default: "00:00",
    },
    showMusicList: {
      default: true,
    },
  },
  setup(props) {
    const store = useStore();
    const show = computed(() => {
      return props.showMusicList ? store.state.musicplay.showMusicList : false;
    });
    const showLyric = ref(false);
    return {
      showLyric,
      show,
    };
  },
};
</script>

<style scoped lang="less">
.music-time {
  color: @primaryTextColor;
  height: 50px;
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: flex-end;

  .lyric {
    font-size: 22px;
    margin-right: 20px;
    &:hover {
      font-weight: 700;
    }
  }
  > div {
    display: flex;
    align-items: center;
    min-width: 62px;
    cursor: pointer;
    &:hover {
      font-weight: 700;
    }
    .musicList {
      margin-left: 15px;
      font-size: 25px;
      display: inline-block;
      width: 25px;
    }

    .songCount {
      font-size: 17px;
      display: inline-block;
      min-width: 15px;
      max-width: 50px;
    }
  }
}
</style>
