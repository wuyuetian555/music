<template>
  <div class="recommendlist">
    <h1>宝藏歌单</h1>
    <div
      class="recommendlist-body"
      v-if="recommendSongList"
      @click="jumpToSongList"
    >
      <div
        class="recommend-songlist"
        v-for="item in recommendSongList"
        :key="item.id"
        :data-musiclistid="item.id"
      >
        <div class="recommend-songlist-item" :data-musiclistid="item.id">
          <img
            :src="item.picUrl + '?param=150y150'"
            :data-musiclistid="item.id"
          />
          <div class="music-bofang-icon" :data-musiclistid="item.id">
            <span class="music-bofang" :data-musiclistid="item.id"></span>
          </div>
        </div>
        <span :data-musiclistid="item.id">{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { findRecommendSongList } from "@/api/home";
import { ref, watch, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  nam: "RecommendList",
  setup() {
    const recommendSongList = ref(null);
    const router = useRouter();
    const store = useStore();

    let isShowAside = computed(() => {
      return store.state.user.showAside;
    });
    const gridColums = ref("repeat(6, 1fr)");
    findRecommendSongList().then((res) => {
      recommendSongList.value = res.result.splice(0, 15);
    });
    const jumpToSongList = (e) => {
      const id = e.target.dataset.musiclistid;
      if (id) {
        router.push({
          name: "SongList",
          params: {
            musiclistid: id,
          },
        });
      }
    };
    watch(
      isShowAside,
      (newVal) => {
        gridColums.value = !newVal ? "repeat(6, 1fr)" : "repeat(5, 1fr)";
      },
      { immediate: true }
    );
    return {
      recommendSongList,
      jumpToSongList,
      gridColums,
    };
  },
};
</script>

<style scoped lang="less">
.recommendlist {
  .recommendlist-body {
    margin-top: 15px;
    display: grid;
    grid-template-columns: v-bind(gridColums);
    grid-gap: 20px;
    overflow: hidden;

    .recommend-songlist {
      margin-bottom: 15px;
      justify-self: center;
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
        width: 190px;
        margin-top: 8px;
        margin-left: 2px;
        word-break: break-all;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
    }
  }
}
</style>
