<template>
  <div class="music-mvicon" :style="{ fontSize: width }">
    <span :data-mvid="data">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'MusicMvicon',
  props: {
    width: {
      typepf: String,
      default: '12px'
    },
    title: {
      typeof: String,
      default: 'MV'
    },
    data: {
      default: 0
    }
  }
};
</script>

<style scoped lang="less">
.music-mvicon {
  display: inline-block;
  border: 1px solid @primaryTextColor;
  padding: 1px 5px;
  font-size: 12px;
  transform: scale(0.65);

  cursor: pointer;
  span {
    font-weight: bold;
    color: @primaryTextColor;
  }
}
</style>
