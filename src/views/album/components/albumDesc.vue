<template>
  <div class="album-desc">
    <h3>{{ JSON.parse(desc) }}</h3>
  </div>
</template>

<script>
export default {
  name: 'AlbumDesc',
  props: {
    desc: {
      default: ''
    }
  },
  setup() {}
};
</script>

<style scoped lang="less">
.album-desc {
  margin-top: 15px;
  h3 {
    white-space: pre-wrap;
  }
}
</style>
