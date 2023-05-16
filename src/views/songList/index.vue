<template>
  <div class="songlist">
    <listHeader></listHeader>
    <listMain></listMain>
  </div>
</template>

<script>
import listHeader from './components/listHeader.vue';
import listMain from './components/listMain.vue';
export default {
  name: 'SongList',
  components: { listHeader, listMain }
};
</script>

<style scoped lang="less">
.songlist {
  color: @primaryTextColor;
  padding: @primaryPadding;
}
</style>
