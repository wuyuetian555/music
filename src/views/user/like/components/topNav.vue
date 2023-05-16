<template>
  <div class="like-header" :class="{ showTopNav: showTopNav >= 200 }">
    <h2>我的喜欢</h2>
    <div class="like-tabs">
      <music-tabs
        :data="tabsDate"
        :bottomPosition="45"
        :paddingWidth="10"
        width="auto"
      ></music-tabs>
    </div>
    <div class="like-btn">
      <music-button icon="icon-bofang1">播放全部</music-button>
      <music-button icon="icon-lajitong1" @click="$emit('deleteSongs')"
        >批量删除</music-button
      >
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive } from 'vue';
export default {
  name: 'LikeTopNav',
  emits: ['deleteSongs'],
  setup() {
    const tabsDate = reactive([
      {
        value: '歌曲',
        id: 1
      }
    ]);
    const store = useStore();
    const showTopNav = computed(() => {
      return store.getters['user/GETISSHOWTOPNAV'];
    });
    return {
      showTopNav,
      tabsDate
    };
  }
};
</script>

<style scoped lang="less">
.v-enter-from {
  transform: translateY(-66px);
  opacity: 0;
}

.v-enter-active {
  transition: all 0.3s;
}
.v-leave-to {
  opacity: 0;
}
.like-header {
  height: 172px;
  padding: @primaryPadding;
  transition: transform 0.3s;

  border-radius: 5px;
  &.showTopNav {
    position: sticky;
    top: -172px;
    transform: translateY(172px);
    background-color: @topColor;
    z-index: 1;
    background-image: url('@/assets/images/1.jpg');
    background-size: cover;
    background-position: center -200px;
  }
  .like-tabs {
    .music-tabs {
      margin-left: 3px;
    }
  }

  .like-btn {
    padding-top: @primaryPadding;
    button {
      margin-right: 15px;
    }
  }
}
</style>
