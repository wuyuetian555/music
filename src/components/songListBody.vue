<template>
  <div class="songlist">
    <div class="title">
      <span style="flex: 6">歌曲</span>
      <span style="flex: 2" v-if="hideSinger">歌手</span>
      <span style="flex: 3" v-if="hideAlbum">专辑</span>
      <span style="flex: 1">时长</span>
    </div>
    <div class="list" @click="handleClick" :style="{ height: height }">
      <div
        class="list-item"
        v-for="(item, index) in musicListData"
        :key="item.musicId"
        :class="{
          active: item.musicId == musicInfo.musicId,
          disabled: item.iscanPlay != null,
        }"
      >
        <div style="flex: 6" class="list-item-name ellipsis">
          <span class="index" v-if="!hideAlbum">{{
            index + 1 < 10 ? "0" + (index + 1) : index + 1
          }}</span>
          <islikesong :musicId="item.musicId" :song="item"></islikesong>
          <div class="name ellipsis">
            <span>{{ item.musicName }}</span>
          </div>
          <music-mvicon
            v-if="item.musicMv"
            :data-mvid="item.musicMv"
            :data="item.musicMv"
          ></music-mvicon>
          <div
            class="control"
            :class="{ active: item.musicId == musicInfo.musicId }"
            v-if="item.iscanPlay == null"
          >
            <i
              v-if="
                item.musicId == musicInfo.musicId &&
                $store.state.musicplay.musicList.isPlay
              "
              class="pause"
              >| |</i
            >
            <i
              class="play-btn iconfont icon-yousanjiao"
              v-else
              :data-musicid="item.musicId"
            ></i>
            <i
              class="iconfont icon-lajitong1"
              :data-delete="item.musicId"
              v-if="hideDeleteSong"
            ></i>
          </div>
          <div v-else class="noplay">
            <span>无版权，暂不可播放</span>
          </div>
        </div>
        <span
          class="ellipsis text"
          style="flex: 2"
          v-if="hideSinger"
          :data-singerid="item.SingerId"
          >{{ item.Singer }}</span
        >
        <span
          class="ellipsis text"
          style="flex: 3"
          v-if="hideAlbum"
          :data-albumid="item.zhuanjiId"
          >{{ item.zhuanji }}</span
        >
        <span class="ellipsis text" style="flex: 1">{{ item.duration }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import useMusicControl from "@/hooks/useMusicControl";
import islikesong from "@/components/isLikeSong.vue";
import { useRouter } from "vue-router";
import confirm from "@/components/UI/confirm";
export default {
  name: "SongListBody",
  emit: ["playMusic", "deleteSong"],
  props: {
    musicListData: Object,
    height: {
      default: "auto",
    },
    hideSinger: {
      default: true,
    },
    hideAlbum: {
      default: true,
    },
    hideDeleteSong: {
      default: false,
    },
  },
  components: {
    islikesong,
  },
  setup(props, { emit }) {
    const isPlayCurrentMusic = ref(true);
    const store = useStore();
    const router = useRouter();
    const musicInfo = store.getters["musicplay/getPlayingMusic"];
    const handleClick = (e) => {
      const target = e.target;
      if (target.dataset.musicid) {
        emit("playMusic", {
          musicListData: props.musicListData,
          musicId: target.dataset.musicid,
        });
      } else if (target.className == "pause") {
        pauseMusic();
      } else if (target.dataset.singerid) {
        router.push({
          name: "SingerDetail",
          params: {
            singerId: target.dataset.singerid,
          },
        });
      } else if (target.dataset.albumid && target.dataset.albumid != 0) {
        router.push({
          name: "Album",
          params: {
            albumId: target.dataset.albumid,
          },
        });
      } else if (target.dataset.mvid) {
        router.push({
          name: "Mv",
          params: {
            mvId: target.dataset.mvid,
          },
        });
      } else if (target.dataset.delete) {
        confirm().then((res) => {
          res && emit("deleteSong", { musicId: target.dataset.delete });
        });
      }
    };
    const { pauseMusic } = useMusicControl();
    return {
      handleClick,
      isPlayCurrentMusic,
      musicInfo,
    };
  },
};
</script>

<style scoped lang="less">
.songlist {
  display: flex;
  flex-direction: column;
  color: @primaryTextColor;
  width: 100%;
  .title {
    display: flex;
    color: @primaryTextColor;

    > span {
      height: 50px;
      font-size: 15px;
      line-height: 30px;
      flex-shrink: 0;
      padding: 10px;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    overflow: auto;

    .list-item {
      display: flex;
      cursor: pointer;

      &.active {
        background-color: @highlightColor;
      }

      &.disabled {
        background-color: #ccc !important;
      }

      &:hover {
        background-color: @highlightColor;
        border-radius: 4px;

        .list-item-name > .control {
          visibility: visible;
        }
      }

      .list-item-name {
        padding: 10px;
        font-size: 17px;
        height: 50px;
        display: flex;
        align-items: center;

        .index {
          margin-right: 15px;
        }

        .control {
          flex: 1;
          visibility: hidden;
          display: flex;
          align-items: center;
          height: 30px;
          justify-content: flex-end;
          padding-right: 50px;
          &.active {
            opacity: 1;
          }

          .play-btn {
            font-size: 34px;
          }
          .icon-lajitong1 {
            font-size: 32px;
          }
          .pause {
            font-size: 20px;
            width: 34px;
            height: 32px;
            display: inline-block;
            text-align: center;
          }

          .like {
            font-size: 24px;
          }
        }
        .noplay {
          margin-left: 100px;
        }

        span {
          padding: 0;
        }
      }

      .text {
        padding: 10px;
        font-size: 17px;
        height: 50px;
        line-height: 30px;
      }
    }
  }
}
</style>
