<template>
  <button class="music-button">
    <i class="iconfont" :class="icon" v-if="icon"></i>
    <div>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'MusicButton',
  props: {
    icon: {
      default: ''
    }
  }
};
</script>

<style scoped lang="less">
button {
  color: @primaryTextColor;
  cursor: pointer;
  outline: none;
  background-color: @highlightColor;
  border: 0;
  padding: 10px 20px;
  border-radius: 20px;
  transition: all 0.2s;
  font-weight: 500;
  text-align: center;
  font-size: 14px;
  min-width: 115px;

  i {
    font-size: 14px;
    vertical-align: baseline;
    font-weight: bold;
  }
  div {
    display: inline-block;
    margin-left: 5px;
    font-weight: bold;
  }
}
</style>
