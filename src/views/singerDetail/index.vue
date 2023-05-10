<template>
  <div class="singer-detail">
    <SingerDetailHeader></SingerDetailHeader>
    <music-tabs
      :data="tabsData"
      :bottomPosition="50"
      :paddingWidth="10"
      width="auto"
      v-model:activeIndex="activeIndex"
      ref="tabs"
    >
      <template #0>
        <div>
          <SingerHotSongs></SingerHotSongs>
        </div>
      </template>
      <template #1>
        <div>
          <SingerAllSongs></SingerAllSongs>
        </div>
      </template>
      <template #2>
        <div>
          <SingerAllZhuanji></SingerAllZhuanji>
        </div>
      </template>
    </music-tabs>
  </div>
</template>

<script>
import SingerDetailHeader from "@/views/singerDetail/components/singDetail-header.vue";
import SingerHotSongs from "./components/singerHotSongs.vue";
import SingerAllSongs from "./components/allSongs.vue";
import SingerAllZhuanji from "./components/allZhuanji.vue";
import { reactive, toRefs, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteLeave } from "vue-router";
export default {
  name: "SingerDetail",
  components: {
    SingerDetailHeader,
    SingerHotSongs,
    SingerAllSongs,
    SingerAllZhuanji,
  },
  setup() {
    const data = reactive({
      tabsData: [
        {
          value: "热门歌曲",
          id: 0,
        },
        {
          value: "所有歌曲",
          id: 1,
        },
        {
          value: "专辑",
          id: 2,
        },
        {
          value: "视频",
          id: 3,
        },
      ],
      activeIndex: 2,
      tabs: null,
    });
    const store = useStore();
    let scroll = computed(() => {
      return store.getters["user/GETISSHOWTOPNAV"];
    });
    const route = useRoute();

    watch(
      () => scroll.value,
      (newVal) => {
        if (newVal > 300) {
          data.tabs.$el.children[0].style.cssText = `position: sticky;top: 0px;background-color: var(--topColor);z-index: 1;border-radius:5px;
          background-image: url("./images/-2300cdf2406380eb.jpg");
          background-size: cover;
          background-position: center -250px;`;
        } else {
          data.tabs.$el.children[0].style.cssText = ``;
        }
      }
    );
    onBeforeRouteLeave(() => {
      const name = route.name;
      let scrollTop = store.getters["user/GETSCROLLTOP"].dom.scrollTop;
      store.commit("user/getScrollTop", { name, scrollTop });
      store.commit("user/listenListScroll", 0);
    });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style scoped lang="less">
.singer-detail {
  padding: @primaryPadding;
}
.music-tabs {
  margin-top: 20px;
  display: block;
  &::v-deep .tabs-item {
    height: 60px;
  }
}
</style>
