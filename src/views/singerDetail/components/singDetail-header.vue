<template>
  <div class="singer-detail-header">
    <div class="singer-img">
      <img :src="singerBg + '?param=200y200'" />
    </div>
    <div class="singer-introduce">
      <h1>{{ singerName }}</h1>
      <div
        class="introduce ellipsis-n"
        ref="textarea"
        @click="showDialog = !showDialog"
      >
        <span>{{ singerIntroduce }}</span>
        <span class="more" v-if="showMore">[ 展开 ]</span>
        <music-dialog
          v-model:show="showDialog"
          :hidebtn="true"
          :title="singerName"
          width="682px"
          height="350px"
          toptranslate="-250px"
        >
          <template v-slot>
            <textarea
              v-model="singerIntroduce"
              class="textarea"
              readonly
            ></textarea>
          </template>
        </music-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { findSingerDesc } from "@/api/singer";
import { useRoute } from "vue-router";
import { reactive, toRefs, ref, nextTick, onMounted, onActivated } from "vue";

export default {
  name: "SingerDetailHeader",
  setup() {
    const route = useRoute();
    let singerId = route.params.singerId;
    const data = reactive({
      singerName: "",
      singerIntroduce: "",
      singerBg: "",
      showMore: false,
      showDialog: false,
    });
    const textarea = ref(null);

    onMounted(async () => {
      init();
    });
    const init = async () => {
      const res = await findSingerDesc(route.params.singerId);
      data.singerName = res.data.artist.name;
      data.singerIntroduce = res.data.artist.briefDesc;
      data.singerBg = res.data.artist.cover;
      await nextTick();
      if (textarea.value.scrollHeight > textarea.value.clientHeight) {
        data.showMore = true;
      }
    };
    onActivated(() => {
      if (route.params.singerId != singerId) {
        singerId = route.params.singerId;
        init();
      }
    });
    return {
      ...toRefs(data),
      textarea,
    };
  },
};
</script>

<style scoped lang="less">
.music-dialog {
  .textarea {
    width: 100%;
    height: 100%;
    background: transparent;
    resize: none;
    border: none;
    outline: none;
    color: @primaryTextColor;
  }
}
.singer-detail-header {
  height: 250px;
  width: 1171px;
  display: flex;
  color: @primaryTextColor;
  .singer-img {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 20px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .singer-introduce {
    flex: 1;
    overflow-y: hidden;
    height: 250px;
    cursor: pointer;
    .introduce {
      margin-top: 10px;
      font-size: 17px;
      padding-right: 70px;
      line-height: 25px;
      position: relative;
      .more {
        position: absolute;
        bottom: 2px;
        right: 5px;
        font-size: 20px;
        color: @primaryTextColor;
        font-weight: 700;
      }
    }
    .ellipsis-n {
      -webkit-line-clamp: 8;
    }
  }
}
</style>
