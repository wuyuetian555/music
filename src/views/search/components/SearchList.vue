<template>
  <div class="searchlist">
    <music-tabs
      :data="tabsDate"
      bottomPosition="45"
      :paddingWidth="10"
      width="auto"
      v-model:activeIndex="activeIndex"
      @change="changeTabs"
    >
      <template #0>
        <songlistbody
          :musicListData="musicListData"
          @playMusic="handlePlayMusic"
          height="61vh"
          v-if="musicListData.length"
        ></songlistbody>
      </template>
      <template #1>
        <songlistbody
          :musicListData="musicListData"
          @playMusic="handlePlayMusic"
          height="61vh"
          v-if="musicListData.length"
        ></songlistbody
      ></template>
    </music-tabs>
  </div>
</template>

<script>
import { computed, ref, watch } from "vue";
import songlistbody from "@/components/songListBody.vue";
import { useStore } from "vuex";
import useMusicControl from "@/hooks/useMusicControl";
import { tabsDate } from "./index";

export default {
  name: "SearchList",
  components: { songlistbody },
  setup() {
    const store = useStore();
    const activeIndex = ref(0);
    watch(
      () => store.state.search.activeIndex,
      (newVal) => {
        activeIndex.value = newVal;
      }
    );
    const musicListData = computed(() => {
      return store.state.search.searchList;
    });

    const { playMusic } = useMusicControl();
    const handlePlayMusic = (value) => {
      const song = value.musicListData.filter((item) => {
        return item.musicId == value.musicId;
      });
      const isExist = store.state.musicplay.musicList.data.data.findIndex(
        (item) => {
          return item.musicId == value.musicId;
        }
      );

      if (isExist != -1) {
        playMusic({ musicId: value.musicId });
      } else if (!song[0].iscanPlay) {
        store.dispatch("musicplay/baseonSearchGetSongAddtoMusicList", {
          song,
          musicId: value.musicId,
        });
      }
    };
    const changeTabs = async (activeIndex) => {
      store.commit("search/editActiveIndex", { activeIndex: activeIndex.id });
      if (activeIndex.id == 1) {
        store.dispatch("search/searchSongsRequest");
      } else {
        await store.dispatch("search/searchWYYSongs", { keywords: "" });
      }
    };
    return {
      tabsDate,
      musicListData,
      handlePlayMusic,
      activeIndex,
      changeTabs,
    };
  },
};
</script>

<style scoped lang="less">
.music-tabs {
  display: block;
}
</style>
