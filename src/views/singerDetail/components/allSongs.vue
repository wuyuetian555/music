<template>
  <div class="all-songs" ref="root">
    <SongList
      :musicListData="musicListData"
      :hideSinger="false"
      v-if="musicListData"
      @playMusic="handleClick"
    ></SongList>
    <music-infinite-loading
      :root="root"
      :loading="loading"
      :finished="finished"
      @infinite="getMoreData"
    ></music-infinite-loading>
  </div>
</template>

<script>
import SongList from '@/components/songListBody.vue';
import { useStore } from 'vuex';
import { reactive, ref, toRefs, onActivated } from 'vue';
import { useRoute } from 'vue-router';
import useMusicControl from '@/hooks/useMusicControl';
export default {
  name: 'AllSongs',
  components: { SongList },
  setup() {
    const store = useStore();
    const route = useRoute();
    let singerId = route.params.singerId;
    const data = reactive({
      request: {
        order: 'hot',
        limit: 30,
        offset: 0,
        singerId: route.params.singerId
      },
      musicListData: [],
      loading: false,
      finished: false
    });

    const root = ref(null);

    const getData = async () => {
      const res = await store.dispatch('singer/getSingerAllSongs', {
        ...data.request
      });
      data.request.offset += data.request.limit;
      data.musicListData.push(...res.songs);
      data.loading = false;

      if (!res.more) {
        data.finished = true;
      }
    };
    const getMoreData = () => {
      data.loading = true;
      getData();
    };

    const { playMusic } = useMusicControl();
    const handleClick = (value) => {
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
        store.dispatch('musicplay/baseonSearchGetSongAddtoMusicList', {
          song,
          musicId: value.musicId
        });
      }
    };
    onActivated(() => {
      if (route.params.singerId != singerId) {
        singerId = route.params.singerId;
        data.request = {
          order: 'hot',
          limit: 30,
          offset: 0,
          singerId: route.params.singerId
        };
        data.finished = false;
        data.musicListData = [];
      }
    });
    return {
      root,
      getMoreData,
      ...toRefs(data),
      handleClick
    };
  }
};
</script>

<style scoped lang="less"></style>
