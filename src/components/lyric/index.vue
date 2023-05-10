<template>
  <div class="lyric">
    <div
      class="bg"
      :style="{
        backgroundImage: `url(${
          musicInfo.musicBg
            ? musicInfo.musicBg
            : '/images/-2300cdf2406380eb.jpg'
        })`,
      }"
    ></div>
    <div class="layout">
      <div class="lyric-btn">
        <i class="iconfont icon-guanbi" @click="hide"></i>
      </div>
      <div class="lyric-main">
        <div class="img">
          <img
            :src="
              musicInfo.musicBg
                ? musicInfo.musicBg
                : '/images/-2300cdf2406380eb.jpg'
            "
          />
        </div>
        <div class="lyric-list">
          <div class="song-name">
            <h2>{{ musicInfo.musicName }}</h2>
          </div>
          <div
            class="lyric-list-item"
            ref="scrollList"
            @mouseover="mouseover"
            @mouseleave="mouseLeave"
            @click="musicToCurrentIndex"
            v-if="songLyric.length"
          >
            <div
              v-for="(item, index) in songLyric"
              :key="index"
              class="lyric-wrap"
              :class="{
                active: lyricindex == index,
                'tlyric-wrap': startIndex == 8,
              }"
            >
              <i
                class="iconfont icon-yousanjiao"
                v-show="showLyricTime == index"
                :data-lyricIndex="index"
                :data-time="item.initTime"
              ></i>
              <div
                class="lyric-warp-item"
                :data-lyricIndex="index"
                :data-time="item.initTime"
              >
                <span :data-lyricIndex="index" :data-time="item.initTime">
                  {{ item.lyric }}</span
                >
                <span
                  v-if="songTlyric"
                  :data-lyricIndex="index"
                  :data-time="item.initTime"
                >
                  {{ songTlyric[item.time] }}</span
                >
              </div>
              <span
                v-show="showLyricTime == index"
                :data-lyricIndex="index"
                :data-time="item.initTime"
                >{{ item.time.split(".")[0] }}</span
              >
            </div>
          </div>
          <div v-else class="nohaveLyric"><span>抱歉，暂无歌词</span></div>
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
import { getMyUploadMusicLyric } from "@/api/user";
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
      songTlyric: "",
      scrollList: "",
      lyricindex: 0,
      currentTime: 0,
      startIndex: 8,
      scrollHeight: 32,
      showLyricTime: -1,
      isScroll: true,
    });

    const hide = () => {
      store.commit("musicplay/isShowLyric");
    };
    watch(
      () => store.getters["musicplay/getPlayingMusic"].musicId,
      async (newVal) => {
        if (!newVal) return;
        if (newVal.toString().includes("th")) {
          const { lrc, tlyric } = await getMyUploadMusicLyric({ id: newVal });
          const { result, tResult } = useSongLyric({
            lyric: lrc.lyric,
            tlyric: tlyric ? tlyric.lyric : "",
          });
          data.songTlyric = tResult;
          data.songLyric = result;
          data.startIndex = 8;
          data.scrollHeight = 32;
        } else {
          const { lrc, tlyric } = await findMusicLyric(newVal);

          const { result, tResult } = useSongLyric({
            lyric: lrc.lyric,
            tlyric: tlyric ? tlyric.lyric : "",
          });
          data.songTlyric = tResult;
          data.songLyric = result;
          if (tResult) {
            data.startIndex = 4;
            data.scrollHeight = 64;
          } else {
            data.startIndex = 8;
            data.scrollHeight = 32;
          }
        }
      },
      { immediate: true }
    );

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
              if (songLyric[length - 1].initTime < curTime) {
                data.lyricindex = length - 1;
                break;
              } else if (
                songLyric[i].initTime < curTime &&
                songLyric[i + 1].initTime > curTime
              ) {
                data.lyricindex = i;
                if (data.scrollList && data.isScroll) {
                  data.scrollList.scrollTop =
                    data.lyricindex >= data.startIndex
                      ? (data.lyricindex - data.startIndex + 1) *
                        data.scrollHeight
                      : 0;
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
    const mouseover = (e) => {
      data.isScroll = false;
      data.showLyricTime = e.target.dataset.lyricindex;
    };
    const mouseLeave = () => {
      data.isScroll = true;
      data.showLyricTime = -1;
    };
    const musicToCurrentIndex = (e) => {
      audio.currentTime = e.target.dataset.time;
    };
    return {
      hide,
      ...toRefs(data),
      audio,
      mouseover,
      mouseLeave,
      musicToCurrentIndex,
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
  z-index: 12;
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
    background-color: #00f7ff;
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
        margin-right: 200px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .lyric-list {
        overflow: auto;
        width: 600px;
        text-align: center;
        .song-name {
          margin-bottom: 20px;
        }

        .lyric-list-item {
          height: 480px;
          overflow: auto;
          transition: 0.5s;

          .lyric-wrap {
            height: 64px;
            line-height: 32px;
            display: flex;
            align-items: center;
            padding: 0 10px;
            i {
              font-size: 25px;
            }
            .lyric-warp-item {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: center;
            }
            span {
              cursor: pointer;
            }
            &.active {
              color: hsl(184, 100%, 50%);
              font-size: 19px;
            }
          }
          .tlyric-wrap {
            height: 32px !important;
          }
        }
        .nohaveLyric {
          height: 480px;
          line-height: 200px;
          span {
            font-size: 20px;
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
