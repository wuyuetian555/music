<template>
  <div class="music-infinite-loading" ref="target" v-if="!finished">
    <div class="loading" v-if="loading">
      <span class="text">正在加载</span>
      <span class="iconfont icon-91jiazai img"></span>
    </div>
  </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useIntersectionObserver } from "@vueuse/core";
export default {
  name: "MusicInfiniteLoading",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
    root: {
      default: null,
    },
  },
  setup(props, { emit }) {
    const target = ref(null);

    onMounted(() => {
      useIntersectionObserver(
        target,
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            if (!props.loading && !props.finished) {
              emit("infinite");
            }
          }
        },
        { root: props.root, threshold: 0 }
      );
    });

    return { target };
  },
};
</script>
<style scoped lang="less">
@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
.music-infinite-loading {
  height: 200px;
  line-height: 200px;

  .loading {
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
      font-size: 25px;
      animation: rotating 2s linear infinite;
    }
    .text {
      font-size: 16px;
    }
  }
}
</style>
