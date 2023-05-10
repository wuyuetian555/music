<template>
  <div class="artist">
    <div class="artist-tabs" :class="{ showTopNav: showTopNav >= 200 }">
      <music-tabs
        :data="musicArtistType"
        :bottomPosition="45"
        :paddingWidth="10"
        width="auto"
        v-model:activeIndex="activeIndex1"
        @change="changeType"
      ></music-tabs>
      <music-tabs
        :data="musicArtistArea"
        :bottomPosition="45"
        :paddingWidth="10"
        width="auto"
        v-model:activeIndex="activeIndex2"
        @change="changeArea"
      ></music-tabs>
      <music-tabs
        :data="musicArtistInitial"
        :bottomPosition="45"
        :paddingWidth="10"
        width="auto"
        class="tabs"
        v-model:activeIndex="activeIndex3"
        @change="changeInitial"
      ></music-tabs>
    </div>
    <div class="artist-main">
      <div class="artist-list" ref="root">
        <div class="artist-list-grid" @click="goSingerDetail">
          <div
            class="artist-item"
            v-for="item in musicArtistData"
            :key="item.singerId"
            :data-singerid="item.singerId"
          >
            <img
              :src="item.singerBg + '?param=200y200'"
              :data-singerid="item.singerId"
            />
            <div class="artist-name" :data-singerid="item.singerId">
              <span :data-singerid="item.singerId">{{ item.singerName }}</span>
            </div>
          </div>
        </div>
        <music-infinite-loading
          :loading="isloading"
          :root="root"
          :finished="isfinfinished"
          @infinite="moreData"
          v-if="!isfinfinished"
        ></music-infinite-loading>
      </div>
    </div>
  </div>
</template>

<script>
import {
  musicArtistArea,
  musicArtistType,
  musicArtistInitial,
  filterArtistList
} from './index.js';
import { findArtistList } from '@/api/singer';
import { reactive, toRefs, ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import useScrollTop from '@/hooks/useScrollTop';
import { useStore } from 'vuex';
export default {
  name: 'SingerList',
  setup() {
    const root = ref(null);
    const router = useRouter();
    const activeIndex1 = ref(0);
    const activeIndex2 = ref(0);
    const activeIndex3 = ref(0);
    const store = useStore();
    const showTopNav = computed(() => {
      return store.getters['user/GETISSHOWTOPNAV'];
    });
    const data = reactive({
      musicArtistData: [],
      singerCategory: {
        type: -1,
        area: -1,
        initial: -1,
        limit: 20,
        offset: 0
      },
      isloading: false,
      isfinfinished: false
    });
    const changeType = (e) => {
      data.singerCategory.type = e.id;
      data.singerCategory.offset = 0;
      data.isfinfinished = false;
      data.musicArtistData = [];
    };
    const changeArea = (e) => {
      data.singerCategory.area = e.id;
      data.singerCategory.offset = 0;
      data.isfinfinished = false;
      data.musicArtistData = [];
    };
    const changeInitial = (e) => {
      data.singerCategory.initial = e.id;
      data.singerCategory.offset = 0;
      data.isfinfinished = false;
      data.musicArtistData = [];
    };
    const getArtistList = async () => {
      const res = await findArtistList(data.singerCategory);
      if (data.singerCategory.offset == 0) {
        setTimeout(() => {
          data.musicArtistData = filterArtistList(res.artists);
          data.singerCategory.offset += data.singerCategory.limit;
        }, 50);
      } else {
        data.musicArtistData.push(...filterArtistList(res.artists));
      }
      data.singerCategory.offset += data.singerCategory.limit;
      if (!res.more) {
        data.isfinfinished = true;
      }
      data.isloading = false;
    };
    const moreData = () => {
      data.isloading = true;
      getArtistList();
    };
    const goSingerDetail = (e) => {
      if (e.target.dataset.singerid) {
        router.push({
          name: 'SingerDetail',
          params: {
            singerId: e.target.dataset.singerid
          }
        });
      }
    };
    useScrollTop();
    return {
      musicArtistType,
      musicArtistArea,
      musicArtistInitial,
      ...toRefs(data),
      changeType,
      changeArea,
      changeInitial,
      root,
      moreData,
      goSingerDetail,
      showTopNav,
      activeIndex1,
      activeIndex2,
      activeIndex3
    };
  }
};
</script>

<style scoped lang="less">
.artist {
  color: @primaryTextColor;
  .artist-tabs {
    padding: @primaryPadding;
    transition: all 0.3s;
    box-shadow: 0px 5px 500px 1px @primaryTextColor;

    border-radius: 5px;

    &.showTopNav {
      position: sticky;
      top: -216px;
      transform: translateY(216px);
      background-image: url('@/assets/images/-2300cdf2406380eb.jpg');
      background-size: cover;
      background-position: center -200px;
      z-index: 1;
      box-shadow: none;
    }
    > div {
      display: block;
      margin-bottom: 15px;
      margin-left: 10px;
    }
  }
  .artist-main {
    padding: @primaryPadding;
    padding-top: @primaryPadding;
    .artist-list {
      .artist-list-grid {
        display: grid;
        place-content: space-between;
        grid-template-columns: repeat(5, 15%);

        .artist-item {
          margin-top: 15px;
          justify-self: center;
          img {
            height: 178px;
            object-fit: cover;
            border-radius: 50%;
          }
          .artist-name {
            text-align: center;
            height: 30px;
            line-height: 30px;
            font-size: 17px;
          }
        }
      }
    }
  }
}
</style>
