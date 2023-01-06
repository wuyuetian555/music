<template>
  <div class="searchlist" v-if="musicListData.length">
    <music-tabs
      :data="tabsDate"
      bottomPosition="45"
      :paddingWidth="10"
      width="auto"
    ></music-tabs>
    <songlistbody
      :musicListData="musicListData"
      @playMusic="handlePlayMusic"
      height="61vh"
    ></songlistbody>
  </div>
</template>

<script>
import { computed } from "vue";
import songlistbody from "@/components/songListBody.vue";
import { useStore } from "vuex";
import useMusicControl from "@/hooks/useMusicControl";
import { tabsDate } from "./index";
export default {
  name: "SearchList",
  components: { songlistbody },
  setup() {
    const store = useStore();
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

    return {
      tabsDate,
      musicListData,
      handlePlayMusic,
    };
  },
};
</script>

<style scoped lang="less"></style>
