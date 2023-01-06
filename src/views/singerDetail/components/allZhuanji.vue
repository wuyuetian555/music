<template>
  <div class="all-album" ref="root">
    <div class="recommendlist-body" v-if="albumData" @click="goAlbumDetail">
      <div
        class="recommend-songlist"
        v-for="item in albumData"
        :key="item.albumId"
        :data-albumid="item.albumId"
      >
        <div class="recommend-songlist-item" :data-albumid="item.albumId">
          <img
            :src="item.albumBg + '?param=200y200'"
            :data-albumid="item.albumId"
          />
          <div class="music-bofang-icon" :data-albumid="item.albumId">
            <span class="music-bofang" :data-albumid="item.albumId"></span>
          </div>
        </div>
        <span :data-albumid="item.albumId" class="album-name">{{
          item.albumName
        }}</span>
        <span class="publishTime">{{ item.publishTime }}</span>
      </div>
    </div>
    <music-infinite-loading
      :root="root"
      :loading="loading"
      :finished="finished"
      @infinite="getMoreData"
    ></music-infinite-loading>
  </div>
</template>

<script>
import { computed, ref, watch, toRefs, reactive, onActivated } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
export default {
  nam: "RecommendList",
  setup() {
    const store = useStore();
    const route = useRoute();
    let singerId = route.params.singerId;
    const router = useRouter();
    const data = reactive({
      request: {
        limit: 15,
        offset: 0,
        id: route.params.singerId,
      },
      loading: false,
      finished: false,
      root: null,
      albumData: [],
    });

    let isShowAside = computed(() => {
      return store.state.user.showAside;
    });
    const gridColums = ref("repeat(6, 1fr)");

    const getMoreData = async () => {
      data.loading = true;
      const result = await store.dispatch("singer/getSingerAlbum", {
        ...data.request,
      });
      data.albumData.push(...result.data);
      data.request.offset += data.request.limit;
      if (!result.more) data.finished = true;
      data.loading = false;
    };
    const goAlbumDetail = (e) => {
      const id = e.target.dataset.albumid;
      if (id) {
        router.push({
          name: "Album",
          params: {
            albumId: id,
          },
        });
      }
    };
    onActivated(() => {
      if (route.params.singerId != singerId) {
        singerId = route.params.singerId;
        data.request = {
          limit: 15,
          offset: 0,
          id: route.params.singerId,
        };
        data.finished = false;
        data.albumData = [];
      }
    });
    watch(
      isShowAside,
      (newVal) => {
        gridColums.value = !newVal ? "repeat(6, 1fr)" : "repeat(5, 1fr)";
      },
      { immediate: true }
    );
    return {
      gridColums,
      ...toRefs(data),
      getMoreData,
      goAlbumDetail,
    };
  },
};
</script>

<style scoped lang="less">
.all-album {
  margin-top: 20px;
  .recommendlist-body {
    margin-top: 15px;
    display: grid;
    grid-template-columns: v-bind(gridColums);
    grid-gap: 20px;
    .recommend-songlist {
      margin-bottom: 15px;
      justify-self: center;
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
        .hoverShadow ();
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

      .album-name {
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
      .publishTime {
        margin-left: 2px;
      }
    }
  }
}
</style>
