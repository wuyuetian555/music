<template>
  <div class="songlist">
    <SongListHeader></SongListHeader>
    <SongListBody></SongListBody>
  </div>
</template>

<script>
import SongListHeader from "./components/songlist-header.vue"
import SongListBody from "./components/songlist-body.vue"
export default {
  name: "SongList",
  components: { SongListHeader, SongListBody },
};
</script>

<style scoped lang="less">
.songlist {
  color: @primaryTextColor;
  padding: @primaryPadding;

}
</style>
