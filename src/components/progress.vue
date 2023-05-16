<template>
  <div class="music-progress" :style="{ width: width + 'px' }">
    <div class="music-progress-item" ref="el" @click="clickProgress">
      <div
        class="music-progress-bar"
        ref="el2"
        :style="{ width: currentWidth }"
      ></div>
      <div
        class="music-progress-btn"
        data-bar="true"
        @mousedown="dragProgressBar"
      >
        <span v-if="showTitle">{{ Math.ceil(currentTime * 100) }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue';
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
      default: 1
    },
    width: {
      default: '100'
    },
    showTitle: {
      default: false
    }
  },
  setup(props, { emit }) {
    const el = ref(null);
    const el2 = ref(null);
    const clickProgress = (e) => {
      if (e.target.dataset.bar) return;
      el2.value.style.width = e.offsetX + 'px';
      emit('update:currentTime', (e.offsetX / props.width) * props.duration);
      emit('clickProgress');
    };
    const currentWidth = computed(() => {
      return (props.width / props.duration) * props.currentTime + 'px';
    });
    const dragProgressBar = (e) => {
      let i;
      const move = (e) => {
        if (el.value.getBoundingClientRect().x == 0) return;
        let current = e.clientX - el.value.getBoundingClientRect().x;
        if (current > props.width) {
          current = props.width;
        } else if (current < 0) {
          current = 0;
        }
        el2.value.style.width = current + 'px';
        emit('update:currentTime', (current / props.width) * props.duration);
        if (!i) {
          i = setTimeout(() => {
            emit('clickProgress');
            i = null;
          }, 200);
        }
      };
      const moveup = () => {
        document.removeEventListener('mousemove', move);
        document.onselectstart = null;
        document.removeEventListener('mouseup', moveup);
      };
      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', moveup);
      document.onselectstart = function () {
        return false;
      };
    };
    return {
      el,
      el2,
      clickProgress,
      currentWidth,
      dragProgressBar
    };
  }
};
</script>

<style scoped lang="less">
.music-progress {
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  padding: 10px 5px;
  box-sizing: content-box;
  z-index: 1;

  .music-progress-item {
    height: 6px;
    background-color: @highlightColor;
    display: flex;
    align-items: center;
    border-radius: 30px;
    cursor: pointer;
    .music-progress-bar {
      background-color: @primaryTextColor;
      height: 6px;
    }
    .music-progress-btn {
      background-color: @primaryTextColor;
      width: 12px;
      height: 12px;
      border-radius: 100%;
      margin-left: -6px;
      cursor: pointer;
      position: relative;
      span {
        position: absolute;
        top: -20px;
        left: -5px;
        color: @primaryTextColor;
      }
    }
  }
}
</style>
