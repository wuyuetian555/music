<template>
  <teleport to="body">
    <transition>
      <div class="music-list" v-if="show">
        <div class="music-list-item">
          <div class="music-list-title">
            <div class="title">
              <h1>播放队列</h1>
              <span @click="$store.commit('musicplay/isShowMusicList')"
                >关闭</span
              >
            </div>
          </div>
          <div class="music-list-body" @click="handleClick">
            <div
              class="music-list-songs"
              v-for="item in musicList"
              :key="item.musicId"
              :class="{
                playing:
                  item.musicId === musicInfo.musicId &&
                  $store.state.musicplay.musicList.isPlay,
              }"
            >
              <div class="music-list-songs-item">
                <div class="music-list-musicName">
                  <span class="musicName ellipsis">{{ item.musicName }}</span>
                  <music-mvicon></music-mvicon>
                </div>
                <div class="music-list-musicSinger">
                  <span class="musicSinger">
                    {{ item.Singer }}
                  </span>
                </div>
              </div>
              <div class="music-list-songs-control">
                <div class="control">
                  <span
                    class="play-btn iconfont icon-yousanjiao"
                    :data-musicid="item.musicId"
                    v-show="
                      !(
                        item.musicId === musicInfo.musicId &&
                        $store.state.musicplay.musicList.isPlay
                      )
                    "
                  ></span>
                  <span
                    class="pause-btn"
                    v-show="
                      item.musicId == musicInfo.musicId &&
                      $store.state.musicplay.musicList.isPlay
                    "
                    data-pause="true"
                    >| |</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
import { computed, watch } from "vue";
import { useStore } from "vuex";
import useMusicControl from "@/hooks/useMusicControl";
export default {
  name: "musicList",
  props: {
    show: {
      default: false,
    },
  },
  setup() {
    const store = useStore();
    const musicList = computed(() => {
      return store.getters["musicplay/getMusicListData"].data;
    });
    const musicInfo = store.getters["musicplay/getPlayingMusic"];

    const { pauseMusic, playMusic } = useMusicControl();
    const handleClick = (e) => {
      const target = e.target.dataset;
      target.pause && pauseMusic();
      target.musicid && playMusic({ musicId: target.musicid });
    };
    watch(
      musicList,
      () => {
        localStorage.setItem("musicList", JSON.stringify(musicList.value));
      },
      {
        deep: true,
      }
    );
    return {
      musicList,
      musicInfo,
      handleClick,
    };
  },
};
</script>

<style scoped lang="less">
.v-enter-active,
.v-leave-active {
  transition: all 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  transform: translateX(240px);
}
.music-list {
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  width: 240px;
  background-color: @primaryColor;
  overflow: hidden;
  z-index: 1;
  .music-list-item {
    display: flex;
    flex-direction: column;

    .music-list-title {
      padding: 20px;
      color: @primaryTextColor;
      font-size: 10px;
      border-bottom: 2px solid @primaryColor;

      .title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        span {
          font-size: 17px;
          cursor: pointer;
        }
      }
    }

    .music-list-body {
      height: calc(100vh - 70px);
      overflow-y: auto;
      overflow-x: hidden;

      .music-list-songs {
        color: @primaryTextColor;
        display: flex;
        justify-content: space-between;
        padding: 15px 10px;

        &:hover {
          background-color: @highlightColor;
        }

        .music-list-songs-item {
          flex: 1;
          margin-right: 10px;
          height: 50px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;

          .music-list-musicName {
            margin-bottom: 5px;
            display: flex;
            align-items: center;

            .musicName {
              display: inline-block;
              max-width: 100px;
              font-size: 14px;
            }

            .icon-MV {
              font-weight: bold;
              font-size: 12px;
            }
          }

          .music-list-musicSinger {
            font-size: 12px;
            color: @primaryTextColor;
          }
        }

        .music-list-songs-control {
          display: flex;
          align-items: center;

          .control {
            display: flex;
            align-items: center;

            .pause-btn {
              margin-right: 10px;
              font-size: 20px;
              width: 34px;
              height: 32px;
              display: inline-block;
              text-align: center;
              cursor: pointer;
            }

            .play-btn {
              font-size: 34px;
              margin-right: 10px;
            }

            .like {
              font-size: 20px;
            }
          }
        }

        &.playing {
          background-color: @primaryColor;
        }
      }
    }
  }
}
</style>
