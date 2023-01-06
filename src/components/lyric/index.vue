<template>
  <div class="lyric">
    <div
      class="bg"
      :style="{ backgroundImage: `url(${musicInfo.musicBg})` }"
    ></div>
    <div class="layout">
      <div class="lyric-btn">
        <i class="iconfont icon-guanbi" @click="hide"></i>
      </div>
      <div class="lyric-main">
        <div class="img">
          <img :src="musicInfo.musicBg" alt="" />
        </div>
        <div class="lyric-list">
          <div class="song-name">
            <h2>{{ musicInfo.musicName }}</h2>
          </div>
          <div class="lyric-list-item" ref="scrollList">
            <div
              v-for="(item, index) in songLyric"
              :key="item.index"
              class="lyric-wrap"
              :class="{ active: lyricindex == index }"
            >
              {{ item.lyric }}
            </div>
          </div>
        </div>
      </div>
      <div class="music-player">
        <Player :showMusicList="false"></Player>
      </div>
    </div>
  </div>
</template>

<script>
import { watch, reactive, toRefs, onDeactivated, onActivated } from "vue";
import { useStore } from "vuex";
import { findMusicLyric } from "@/api/music";
import useSongLyric from "@/utils/useSongLyric";
import Player from "@/components/player/index.vue";
export default {
  name: "Lyric",
  components: {
    Player,
  },
  setup() {
    const store = useStore();
    const audio = store.state.musicplay.audio;
    const data = reactive({
      musicInfo: store.getters["musicplay/getPlayingMusic"],
      songLyric: "",
      scrollList: "",
      lyricindex: 0,
      currentTime: 0,
    });

    const hide = () => {
      store.commit("musicplay/isShowLyric");
    };
    watch(
      () => store.getters["musicplay/getPlayingMusic"].musicId,
      (newVal) => {
        if (!newVal) return;
        findMusicLyric(newVal).then((res) => {
          let lyric = res.lrc.lyric;
          data.songLyric = useSongLyric(lyric);
        });
      },
      { immediate: true }
    );

    ///////
    function timeupdate() {
      let timer;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            timer = null;
            let songLyric = data.songLyric;
            let length = data.songLyric.length;
            let curTime = audio.currentTime;
            data.currentTime = audio.currentTime;
            for (var i = 0; i < length; i++) {
              if (songLyric[length - 1].time < curTime) {
                data.lyricindex = length - 1;
                break;
              } else if (
                songLyric[i].time < curTime &&
                songLyric[i + 1].time > curTime
              ) {
                data.lyricindex = i;
                if (data.scrollList) {
                  data.scrollList.scrollTop =
                    data.lyricindex >= 8 ? (data.lyricindex - 7) * 32 : 0;
                }
                break;
              }
            }
          }, 500);
        }
      };
    }
    const listenLyric = timeupdate();
    audio.addEventListener("timeupdate", listenLyric);
    onDeactivated(() => {
      audio.removeEventListener("timeupdate", listenLyric);
    });
    onActivated(() => {
      audio.addEventListener("timeupdate", listenLyric);
    });
    return {
      hide,
      ...toRefs(data),
      audio,
    };
  },
};
</script>

<style scoped lang="less">
.lyric {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
  height: 100vh;
  width: 1440px;
  overflow: auto;
  .bg {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    filter: brightness(50%);
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
    background-color: #00ffb3;
  }

  .layout {
    padding: 10px 20px;
    padding-bottom: 0px;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 1440px;
    color: #fff;

    .lyric-btn {
      text-align: right;

      i {
        font-size: 20px;
        transition: all 0.2s;
        &:hover {
          font-weight: 700;
        }
      }
    }

    .lyric-main {
      flex: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      font-size: 14px;
      .img {
        width: 415px;
        height: 415px;
        overflow: hidden;
        border: 5px;
        margin-left: 200px;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .lyric-list {
        height: 600px;
        overflow: auto;
        line-height: 32px;
        width: 600px;
        margin: 0 auto;
        text-align: center;

        .song-name {
          margin-bottom: 20px;
        }

        .lyric-list-item {
          height: 480px;
          overflow: hidden;
          transition: 0.5s;

          .lyric-wrap {
            &.active {
              color: hsl(184, 100%, 50%);
              font-size: 19px;
            }
          }
        }
      }
    }
    .music-player {
      height: auto;
      .player {
        background-color: @primaryColor;
      }
    }
  }
}
</style>
