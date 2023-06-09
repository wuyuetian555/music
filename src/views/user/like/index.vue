<template>
  <div class="like">
    <template v-if="show">
      <topNav @deleteSongs="show = !show"></topNav>
      <songlist
        :musicListData="mylike"
        @playMusic="handlePlayMusic"
        v-if="mylike"
      ></songlist>
    </template>
    <template v-else>
      <deletesonglist
        :musicListData="mylike"
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
import { ref } from 'vue';
import useMusicControl from '@/hooks/useMusicControl';
import deletesonglist from '@/components/deleteSongList.vue';
import { useStore } from 'vuex';
import useScrollTop from '@/hooks/useScrollTop';
import topNav from './components/topNav.vue';
export default {
  name: 'Like',
  components: { songlist, deletesonglist, topNav },
  setup() {
    const show = ref(true);
    const store = useStore();
    const mylike = store.state.user.mylike;

    const { playMusicList } = useMusicControl();
    const handlePlayMusic = ({ musicListData, musicId }) => {
      playMusicList({ musicListData, musicId });
    };
    const deletSongList = (songList) => {
      store.commit('user/deleteAllMyLike', { songList });
    };
    useScrollTop();
    return {
      handlePlayMusic,
      show,
      mylike,
      deletSongList
    };
  }
};
</script>

<style scoped lang="less">
.v-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.v-enter-active {
  transition: all 0.3s;
}
.like {
  color: @primaryTextColor;

  .songlist {
    padding: 0 20px;
  }
}
</style>
