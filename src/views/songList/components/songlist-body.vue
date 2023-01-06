<template>
  <div class="songlist-body">
    <music-tabs :data="data" :bottomPosition="60"></music-tabs>
    <songlistbody
      :musicListData="musicListData"
      @playMusic="handlePlayMusic"
      height="45vh"
    ></songlistbody>
  </div>
</template>

<script>
import { findDetailedRecommendSongList } from "@/api/musicList";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";
import songlistbody from "@/components/songListBody.vue";
import useMusicControl from "@/hooks/useMusicControl";
import usefIlterMusicData from "@/hooks/usefIlterMusicData";
export default {
  name: "SongListBody",
  components: { songlistbody },
  setup() {
    const data = reactive([
      {
        value: "歌 曲",
        id: 1,
      },
    ]);
    const route = useRoute();
    const musicListData = reactive([]);
    const { playMusicList } = useMusicControl();

    onMounted(async () => {
      var result = await findDetailedRecommendSongList(
        route.params.musiclistid
      );
      result = usefIlterMusicData(result.songs);
      result = result.filter((item) => {
        return !item.iscanPlay;
      });
      musicListData.push(...result);
    });
    const handlePlayMusic = (obj) => {
      playMusicList(obj);
    };
    return {
      data,
      musicListData,
      handlePlayMusic,
    };
  },
};
</script>

<style scoped lang="less">

</style>
