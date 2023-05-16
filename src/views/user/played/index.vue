<template>
  <div class="played">
    <template v-if="show">
      <topNav @deleteSongs="show = !show"></topNav>
      <songlist
        v-if="playedMusic"
        :musicListData="playedMusic"
        @playMusic="handlePlayMusic"
        @deleteSong="deleteSong"
        hideDeleteSong="true"
      ></songlist>
    </template>
    <template v-else>
      <deletesonglist
        :musicListData="playedMusic"
        @backAction="show = !show"
        @deletSongList="deletSongList"
        height="70vh"
      >
      </deletesonglist>
    </template>
  </div>
</template>

<script>
import songlist from '@/components/songListBody.vue';
import { computed, ref } from 'vue';
import useMusicControl from '@/hooks/useMusicControl';
import deletesonglist from '@/components/deleteSongList.vue';
import { useStore } from 'vuex';
import useScrollTop from '@/hooks/useScrollTop';
import topNav from './components/topNav.vue';
export default {
  name: 'Played',
  components: { songlist, deletesonglist, topNav },
  setup() {
    const show = ref(true);
    const store = useStore();

    const playedMusic = computed(() => {
      return store.state.user.playedMusic;
    });

    const { playMusicList } = useMusicControl();
    const handlePlayMusic = ({ musicListData, musicId }) => {
      playMusicList({ musicListData, musicId });
    };
    const deletSongList = (songList) => {
      store.commit('user/deleteAllPlayedMusic', { songList });
    };
    const deleteSong = ({ musicId }) => {
      store.commit('user/deleteOneSong', { musicId });
    };
    useScrollTop();
    return {
      playedMusic,
      handlePlayMusic,
      show,
      deletSongList,
      deleteSong
    };
  }
};
</script>

<style scoped lang="less">
.played {
  color: @primaryTextColor;
  .songlist {
    padding: 0 20px;
  }
}
</style>
