<template>
  <div class="songlist-header">
    <div class="songlist-header-title">
      <div class="img">
        <img :src="bg" />
      </div>
      <div class="detail">
        <div class="detail-name">
          <h2>{{ name }}</h2>
        </div>
        <div
          class="detail-description ellipsis-n"
          ref="textarea"
          @click="show = !show"
        >
          <span>{{ description }}</span>
          <span class="more" v-if="more">[ 展开 ]</span>
          <music-dialog
            v-model:show="show"
            :hidebtn="true"
            title="歌单详情"
            width="682px"
            height="350px"
            toptranslate="-250px"
          >
            <template v-slot>
              <textarea
                v-model="description"
                class="textarea"
                readonly
              ></textarea>
            </template>
          </music-dialog>
        </div>
        <div class="play-btn">
          <i class="btn iconfont icon-bofang">播放全部</i>
          <i class="iconfont icon-jushoucang like">收藏</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findPartRecommendSongList } from '@/api/home';
import { onMounted, reactive, toRefs, ref, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import musicDialog from '@/components/UI/music-dialog.vue';
export default {
  components: { musicDialog },
  name: 'ListHeader',
  setup() {
    const route = useRoute();
    const textarea = ref(null);
    const show = ref(false);
    const more = ref(false);
    const songListDetail = reactive({
      bg: '',
      description: '',
      name: ''
    });
    onMounted(async () => {
      const result = await findPartRecommendSongList(route.params.musiclistid);
      songListDetail.description = result.playlist.description;
      songListDetail.name = result.playlist.name;
      songListDetail.bg = result.playlist.coverImgUrl;
      await nextTick();

      if (textarea.value.scrollHeight > textarea.value.clientHeight) {
        more.value = true;
      }
    });
    return {
      ...toRefs(songListDetail),
      textarea,
      show,
      more
    };
  }
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
.songlist-header {
  .songlist-header-title {
    display: flex;
    .img {
      overflow: hidden;
      width: 200px;
      height: 200px;
      border-radius: 15px;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
    .detail {
      color: @primaryTextColor;
      flex: 1;
      position: relative;
      display: flex;
      flex-direction: column;
      .detail-name {
        margin-bottom: 10px;
      }
      .detail-description {
        font-size: 17px;
        padding-right: 80px;
        height: 96px;
        position: relative;
        cursor: pointer;
        .more {
          position: absolute;
          right: 20px;
          top: 70px;
          font-size: 17px;
          cursor: pointer;
          color: @primaryTextColor;
          font-weight: 700;
        }
      }
      .ellipsis-n {
        -webkit-line-clamp: 4;
      }
      .play-btn {
        position: absolute;
        bottom: 10px;
        left: 0;

        .btn,
        .like {
          font-size: 17px;
          display: inline-block;
          width: 130px;
          height: 40px;
          line-height: 40px;
          border-radius: 15px;
          background-color: @highlightColor;
          text-align: center;
          margin-right: 10px;
          cursor: pointer;
        }
        .like,
        .btn {
          &::before {
            margin-right: 5px;
            font-size: 17px;
          }
        }
      }
    }
  }
}
</style>
