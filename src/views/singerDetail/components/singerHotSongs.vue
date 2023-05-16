<template>
  <div class="hot-songs" v-if="musicListData.length">
    <SongList
      :musicListData="musicListData"
      :hideSinger="false"
      @playMusic="handleClick"
    ></SongList>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import SongList from '@/components/songListBody.vue';
import { toRefs, reactive, onActivated, onBeforeMount } from 'vue';
import useMusicControl from '@/hooks/useMusicControl';
export default {
  name: 'SingerHotSongs',
  components: { SongList },
  setup() {
    const store = useStore();
    const route = useRoute();
    let singerId = route.params.singerId;
    const data = reactive({
      musicListData: []
    });

    const { playMusicList } = useMusicControl();
    const handleClick = (e) => {
      playMusicList(e);
    };

    const init = () => {
      store
        .dispatch('singer/getSingerHotSongs', {
          singerId: route.params.singerId
        })
        .then((res) => {
          data.musicListData = res;
        });
    };
    onBeforeMount(() => {
      init();
    });
    onActivated(() => {
      if (route.params.singerId != singerId) {
        singerId = route.params.singerId;
        init();
      }
    });
    return { ...toRefs(data), handleClick };
  }
};
</script>

<style scoped lang="less"></style>
