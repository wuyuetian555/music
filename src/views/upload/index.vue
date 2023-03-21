<template>
  <div class="upload">
    <h2>上传</h2>
    <music-tabs
      :data="tabsData"
      :bottomPosition="45"
      :paddingWidth="10"
      width="auto"
      v-model:activeIndex="activeIndex"
    >
      <template #0>
        <UploadMusic></UploadMusic>
      </template>
      <template #1>
        <UploadAdmin></UploadAdmin>
      </template>
    </music-tabs>
  </div>
</template>

<script>
import { ref } from "vue";
import UploadMusic from "./components/uploadMusic/index.vue";
import UploadAdmin from "./components/uploadAdmin/index.vue";
export default {
  name: "Upload",
  components: {
    UploadMusic,
    UploadAdmin,
  },
  setup() {
    const activeIndex = ref(0);
    const tabsData = ref([
      {
        value: "上传歌曲",
        id: 1,
      },
      {
        value: "上传记录",
        id: 2,
      },
    ]);
    return {
      tabsData,
      activeIndex,
    };
  },
};
</script>

<style scoped lang="less">
.upload {
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
