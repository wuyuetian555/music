<template>
  <div class="music-progress" @click="clickProgress">
    <div class="music-progress-item" ref="el">
      <div
        class="music-progress-bar"
        :style="{ width: currentWidth }"
        ref="el2"
      ></div>
      <div class="music-progress-btn"></div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue';

export default {
  name: 'MusicProgress',
  emit: ['clickProgress'],
  props: {
    currentTime: {
      type: Number,
      default: 0
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const el = ref(null);
    const el2 = ref(null);
    const divWidth = ref(null);
    const clickProgress = (e) => {
      el2.value.style.width = e.offsetX + 'px';

      emit(
        'clickProgress',
        Math.ceil((e.offsetX / divWidth.value) * props.duration)
      );
    };
    onMounted(() => {
      const resizeOb = new ResizeObserver((entries) => {
        divWidth.value = entries[0].contentRect.width;
      });
      resizeOb.observe(el.value);
    });

    const currentWidth = computed(() => {
      return (
        ((divWidth.value - 6) / Math.round(props.duration)) *
          Math.round(props.currentTime) +
        'px'
      );
    });

    return {
      el,
      el2,
      clickProgress,
      currentWidth,
      divWidth
    };
  }
};
</script>

<style scoped lang="less">
.music-progress {
  height: 15px;
  line-height: 15px;
  z-index: 1;
  .music-progress-item {
    height: 4px;
    background-color: @highlightColor;
    display: flex;
    align-items: center;
    border-radius: 30px;
    cursor: pointer;

    .music-progress-bar {
      background-color: @primaryTextColor;
      height: 4px;
    }
    .music-progress-btn {
      background-color: @primaryTextColor;
      width: 8px;
      height: 8px;
      border-radius: 100%;
      margin-left: -2px;
      pointer-events: none;
    }
  }
}
</style>
