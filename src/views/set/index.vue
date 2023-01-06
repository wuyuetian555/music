<template>
  <div class="set">
    <h2>设置</h2>
    <music-tabs
      :data="tabsData"
      :bottomPosition="45"
      :paddingWidth="10"
      width="auto"
      v-model:activeIndex="activeIndex"
    >
      <template #0>
        <MusicTheme></MusicTheme>
      </template>
    </music-tabs>
  </div>
</template>

<script>
import { tabsData } from "./index";
import { ref } from "vue";
import MusicTheme from "./components/theme/index.vue";
export default {
  name: "SET",
  components: {
    MusicTheme,
  },
  setup() {
    const activeIndex = ref(0);
    return {
      tabsData,
      activeIndex,
    };
  },
};
</script>

<style scoped lang="less">
.set {
  color: @primaryTextColor;
  padding: @primaryPadding;
  h2 {
    margin-bottom: 10px;
  }
  .music-tabs {
    display: block;
  }
}
</style>
