<template>
  <div class="is-like-song" @click.stop="handleClick">
    <span
      class="iconfont icon-jushoucang like"
      v-if="show"
      data-like="true"
    ></span>
    <span
      class="iconfont icon-jushoucanggift like"
      v-else
      data-dislike="true"
    ></span>
  </div>
</template>

<script>
import { ref, onUpdated, watch, onBeforeMount, computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "IsLikeSong",
  props: {
    musicId: [String, Number],
    allData: Object,
    song: Object,
  },
  setup(props) {
    const show = ref(true);
    const store = useStore();
    const mylike = store.state.user.mylike;
    const isLike = () => {
      const index = mylike.findIndex((item) => {
        return props.musicId == item.musicId;
      });

      show.value = index != -1 ? false : true;
    };
    onBeforeMount(() => {
      isLike();
    });
    const handleClick = (e) => {
      if (props.song.iscanPlay) return;
      if (e.target.dataset.like) {
        store.commit("user/addMyLike", { song: props.song });
        show.value = false;
      } else if (e.target.dataset.dislike) {
        store.commit("user/subMyLike", { song: props.song });
        show.value = true;
      }
    };

    // watch(
    //   () => props.musicId,
    //   (newVal) => {
    //     const index = mylike.findIndex((item) => {
    //       return newVal == item.musicId;
    //     });

    //     show.value = index != -1 ? false : true;
    //   }
    // );
    return {
      show,
      handleClick,
    };
  },
};
</script>

<style scoped lang="less">
.is-like-song {
  height: 30px;
  margin-right: 5px;
  line-height: 30px;
}

.like {
  font-size: 20px;
}
</style>
