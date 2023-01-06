<template>
  <div class="music-drawer" :style="{ width, height }">
    <slot></slot>
    <div class="btn" @click.stop="clickOpen">
      <span class="iconfont" :class="style[show ? 'open' : 'close']"></span>
    </div>
  </div>
</template>

<script>
import { ref, onBeforeMount, onUpdated } from "vue";
export default {
  name: "Drawer",
  props: {
    openWidth: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "300px",
    },
    closeWidth: {
      type: String,
      default: "0px",
    },
    show: {
      default: true,
    },
  },
  setup(props, { emit }) {
    let width = ref(null);
    const style = {
      open: "icon-xiangzuojiantou",
      close: "icon-jiantou",
    };
    onBeforeMount(() => {
      width.value = props.show ? props.openWidth : props.closeWidth;
    });
    const clickOpen = () => {
      emit("changState");
    };
    onUpdated(() => {
      width.value = props.show ? props.openWidth : props.closeWidth;
    });
    return {
      width,
      clickOpen,
      style,
    };
  },
};
</script>

<style scoped lang="less">
.music-drawer {
  position: relative;
  transition: all 0.2s;
  height: 100%;

  .btn {
    width: 16px;
    height: 80px;
    position: absolute;
    background-color: @primaryTextColor;
    top: 50%;
    right: -9px;
    transform: translateY(-50%);
    border-radius: 11px;
    cursor: pointer;
    overflow: hidden;
    display: flex;
    align-items: center;

    &:hover {
      font-weight: 700;
    }

    .iconfont {
      color: @topColor;
      font-weight: bold;
    }
  }
}
</style>
