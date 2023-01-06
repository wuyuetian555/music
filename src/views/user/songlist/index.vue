<template>
  <div class="songlist">
    <div class="songlist-header"><h2>我收藏的歌单</h2></div>
  </div>
  <div class="songlist-tabs">
    <music-tabs :data="tabsDate" bottomPosition="10"></music-tabs>
    <div class="songlist-body"></div>
    <input type="color" ref="button" />
    <button @click="getcolor">11111111111</button>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "SongList",
  components: {},
  setup() {
    const tabsDate = reactive([
      {
        value: "歌单",
        id: 1,
      },
    ]);
    const button = ref(null);
    const getcolor = () => {
      console.log(button.value.value);
    };
    return {
      tabsDate,
      button,
      getcolor,
    };
  },
};
</script>

<style scoped lang="less">
.songlist {
  color: @primaryTextColor;
}
</style>
