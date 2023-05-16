<template>
  <div class="album">
    <div class="album-header">
      <div class="album-img">
        <music-image :src="albumDesc.bg"></music-image>
      </div>
      <div class="album-desc">
        <div class="album-name">
          <h1>{{ albumDesc.name }}</h1>
        </div>
        <div class="album-singerName">
          <h3>{{ albumDesc.singerName }}</h3>
        </div>
        <div class="album-publishTime">
          <h4>发行于 {{ albumDesc.publishTime }}</h4>
        </div>
        <div class="play-btn">
          <i class="btn iconfont icon-bofang">播放全部</i>
          <i class="iconfont icon-jushoucang like">收藏</i>
        </div>
      </div>
    </div>
    <music-tabs
      :data="tabsData"
      :bottomPosition="45"
      :paddingWidth="10"
      width="auto"
      v-model:activeIndex="activeIndex"
    >
      <template #0>
        <AlbumSongs :data="albumMusic"></AlbumSongs>
      </template>
      <template #1>
        <AlbumDesc :desc="albumDesc.desc"></AlbumDesc>
      </template>
    </music-tabs>
  </div>
</template>

<script>
import { findSingerDetailAlbum } from '@/api/singer';
import usefIlterMusicData from '@/hooks/usefIlterMusicData';
import { filterTime } from '@/hooks/usefilterAlbum';
import { useRoute } from 'vue-router';
import { reactive, toRefs } from 'vue';
import { tabsData } from './index';
import AlbumSongs from './components/albumSongs.vue';
import AlbumDesc from './components/albumDesc.vue';
export default {
  name: 'Album',
  components: {
    AlbumSongs,
    AlbumDesc
  },
  setup() {
    const route = useRoute();
    const data = reactive({
      albumDesc: {
        name: '',
        desc: '',
        singerName: '',
        publishTime: '',
        bg: ''
      },
      albumMusic: [],
      activeIndex: 0
    });
    findSingerDetailAlbum(route.params.albumId).then(({ album, songs }) => {
      data.albumDesc.name = album.name;
      data.albumDesc.desc = JSON.stringify(album.description);
      data.albumDesc.publishTime = filterTime(album.publishTime);
      data.albumDesc.bg = album.blurPicUrl;
      data.albumDesc.singerName = album.artist.name;
      data.albumMusic = usefIlterMusicData(songs);
    });

    return {
      tabsData,
      ...toRefs(data)
    };
  }
};
</script>

<style scoped lang="less">
.album {
  color: @primaryTextColor;
  height: 80vh;
  padding: @primaryPadding;
  .album-header {
    display: flex;
    .album-img {
      width: 200px;
      height: 200px;
      overflow: hidden;
      border-radius: 5px;
      margin-right: 20px;
      flex-shrink: 0;
    }
    .album-desc {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .album-singerName,
      .album-publishTime {
        margin-left: 5px;
      }
      .play-btn {
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
  .music-tabs {
    display: block;
  }
}
</style>
