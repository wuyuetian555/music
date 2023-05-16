<template>
  <Transition name="down">
    <div class="music-message" v-show="visible">
      <span class="text">{{ text }}</span>
    </div>
  </Transition>
</template>
<script>
import { onMounted, ref } from 'vue';
export default {
  name: 'MusicMessage',
  props: {
    text: {
      type: String,
      default: '一首歌曲无法播放，已自动播放下一首'
    }
  },
  setup() {
    const visible = ref(false);
    onMounted(() => {
      visible.value = true;
    });
    return { visible };
  }
};
</script>
<style scoped lang="less">
.down {
  &-enter {
    &-from {
      transform: translate3d(-240px, 0, 0);
      opacity: 0;
    }
    &-active {
      transition: all 0.5s;
    }
    &-to {
      transform: none;
      opacity: 1;
    }
  }
}
.music-message {
  width: 240px;
  height: 100px;
  position: fixed;
  z-index: 9999;
  left: 0;
  top: 100px;
  line-height: 20px;
  padding: 0 25px;
  border: 1px solid @primaryColor;
  background-color: @primaryColor;
  color: @primaryTextColor;
  border-radius: 4px;
  font-size: 17px;
  i {
    margin-right: 4px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
</style>
