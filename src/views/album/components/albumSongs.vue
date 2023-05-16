<template>
  <div class="album-songs">
    <SongList
      :musicListData="data"
      :hideAlbum="false"
      @playMusic="handleClick"
    ></SongList>
  </div>
</template>

<script>
import SongList from '@/components/songListBody.vue';
import useMusicControl from '@/hooks/useMusicControl';
export default {
  name: 'AlbumSongs',
  components: { SongList },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  setup() {
    const { playMusicList } = useMusicControl();
    const handleClick = ({ musicListData, musicId }) => {
      playMusicList({ musicListData, musicId });
    };
    return {
      handleClick
    };
  }
};
</script>

<style scoped lang="less">
.album-songs {
  margin-top: 5px;
}
</style>
