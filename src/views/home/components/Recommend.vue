<template>
  <div class="recommend">
    <h1>今日推荐</h1>
    <div class="recommend-body">
      <!-- 推荐歌曲 -->
      <div class="recommend-songs" v-if="data.length">
        <div class="recommend-songs-img">
          <img :src="data[index].musicBg" alt="图片加载失败" />
          <div class="music-bofang-icon">
            <span
              class="music-bofang"
              v-show="!isPlay"
              @click="playPersonalMusic(data[index].musicId)"
            ></span>
            <span
              class="music-zanting"
              v-show="isPlay"
              @click="pauseMusic"
            ></span>
          </div>
        </div>
        <div class="recommend-songs-control">
          <span class="song-name ellipsis">{{ data[index].musicName }}</span>
          <span class="song-author">{{ data[index].Singer }}</span>
          <div class="song-action">
            <span class="bofang"></span>
          </div>
        </div>
      </div>
      <!-- 推荐歌单 -->
      <div class="recommend-songlist">
        <div class="recommend-songlist-item">
          <img src="@/assets/images/1.jpg" alt="" />
          <div class="music-bofang-icon">
            <span class="music-bofang"></span>
          </div>
        </div>
        <span>每日推荐</span>
      </div>
      <!-- 新歌推荐 -->
      <div class="recommend-songlist">
        <div class="recommend-songlist-item">
          <img src="images/4.jpg" alt="" />
          <div class="music-bofang-icon">
            <span class="music-bofang"></span>
          </div>
        </div>
        <span>新歌推荐</span>
      </div>
      <div class="recommend-songlist">
        <div class="recommend-songlist-item">
          <img src="images/2.png" alt="" />
          <div class="music-bofang-icon">
            <span class="music-bofang"></span>
          </div>
        </div>
        <span>百万收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { onMounted, reactive, toRefs, computed } from "vue";
import useMusicControl from "@/hooks/useMusicControl";
import isLikeSongVue from "@/components/isLikeSong.vue";
export default {
  name: "Recommend",
  components: {
    isLikeSongVue,
  },
  setup() {
    const store = useStore();
    const personalMusic = reactive({
      data: computed(() => {
        return store.state.musicplay.personalMusic.data;
      }),
      index: computed(() => {
        return store.state.musicplay.personalMusic.index || 0;
      }),
      isPlay: computed(() => {
        return store.state.musicplay.musicList.isPlay &&
          store.state.musicplay.musicList.data.name
          ? true
          : false;
      }),
    });

    onMounted(() => {
      store.dispatch("musicplay/getPersonalMusic");
    });

    const playPersonalMusic = (musicId) => {
      store.dispatch("musicplay/PersonalMusicAddToMusicList", musicId);
    };

    const { pauseMusic } = useMusicControl();
    return { ...toRefs(personalMusic), playPersonalMusic, pauseMusic };
  },
};
</script>

<style scoped lang="less">
.recommend {
  color: @primaryTextColor;
  display: flex;
  flex-direction: column;
  .recommend-body {
    display: flex;
    margin-top: 15px;
    align-items: flex-start;
    height: 250px;
    .recommend-songs {
      display: flex;
      padding: 20px;
      background-color: @primaryColor;
      border-radius: 5px;
      width: 370px;
      height: 190px;
      align-items: center;
      margin-right: 20px;
      box-shadow: 5px 5px 12px 2px @primaryTextColor;
      .hoverShadow ();
      &:hover {
        .music-bofang-icon {
          background-color: @highlightColor;
          .music-bofang,
          .music-zanting {
            opacity: 1;
          }
        }
      }
      .recommend-songs-img {
        position: relative;
        margin-right: 25px;
        flex-shrink: 0;
        img {
          width: 115px;
          height: 115px;
          object-fit: cover;
          border-radius: 8px;
        }
        .music-bofang-icon {
          transition: all 0.2s;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .music-bofang,
        .music-zanting {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.2s;
        }
      }

      .recommend-songs-control {
        flex: 1;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        .song-name {
          display: inline-block;
          height: 35px;
          font-size: 20px;
          line-height: 30px;
        }
        .song-author {
          color: @primaryTextColor;
          height: 35px;
          line-height: 30px;
        }
        .song-action {
          display: flex;
          align-items: center;

          .bofang {
            position: relative;
            display: inline-block;
            border: 9px solid transparent;
            border-left: 15px solid @primaryTextColor;
            border-right: 0px;
            left: 2px;
            margin-right: 15px;
            cursor: pointer;
            &::after {
              content: "";
              width: 2px;
              height: 17px;
              background-color: @primaryTextColor;
              display: inline-block;
              position: absolute;
              top: -8px;
              left: 1px;
            }
          }
          .icon-jushoucang {
            font-size: 20px;
            margin-left: 10px;
          }
          .icon-jushoucanggift {
            font-size: 20px;
            color: @primaryTextColor;
          }
        }
      }
    }
    .recommend-songlist {
      margin-right: 20px;
      .hoverShadow ();
      &:hover {
        .music-bofang-icon {
          background-color: @highlightColor;
          .music-bofang {
            opacity: 1;
          }
        }
      }
      .recommend-songlist-item {
        height: 190px;
        width: 190px;
        background-color: @primaryColor;
        border-radius: 5px;
        overflow: hidden;
        position: relative;

        img {
          width: 100%;
          object-fit: cover;
          height: 100%;
        }
        .music-bofang-icon {
          transition: all 0.2s;
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
        }
        .music-bofang {
          z-index: 99;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          transition: all 0.2s;
        }
      }
      > span {
        display: inline-block;
        margin-top: 8px;
        margin-left: 2px;
      }
    }
  }
}
</style>
