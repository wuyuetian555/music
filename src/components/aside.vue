<template>
  <div class="music-aside">
    <Drawer
      height="calc(100vh - 66px)"
      closeWidth="48px"
      openWidth="200px"
      :show="show"
      @changState="isShowAside"
    >
      <template v-slot>
        <transition mode="out-in">
          <div class="aside-list-close" v-if="!show">
            <RouterLink to="/user/like">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/user/like' }"
              >
                <span class="iconfont icon-jushoucanggift"></span>
                <span class="text">喜欢</span>
              </div>
            </RouterLink>
            <RouterLink to="/user/played">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/user/played' }"
              >
                <span class="iconfont icon-yinle"></span>
                <span class="text">播放</span>
              </div>
            </RouterLink>
            <!-- <div
              class="like"
              :class="{ heightLight: $route.fullPath == '/user/songlist' }"
            >
              <RouterLink to="/user/songlist">
                <span class="iconfont icon-gedan2"></span>
                <span class="text">歌单</span>
              </RouterLink>
            </div> -->
            <RouterLink to="/set">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/set' }"
              >
                <span class="iconfont icon-shezhi"></span>
                <span class="text">设置</span>
              </div>
            </RouterLink>
          </div>
          <div class="aside-list-open" v-else>
            <h4>我的音乐</h4>
            <RouterLink to="/user/like">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/user/like' }"
              >
                <span class="iconfont icon-jushoucanggift"></span>
                <span class="text">我的喜欢</span>
              </div>
            </RouterLink>
            <RouterLink to="/user/played">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/user/played' }"
              >
                <span class="iconfont icon-yinle"></span>
                <span class="text">最近播放</span>
              </div>
            </RouterLink>
            <!-- <div
              class="like"
              :class="{ heightLight: $route.fullPath == '/user/songlist' }"
            >
              <RouterLink to="/user/songlist">
                <span class="iconfont icon-gedan2"></span>
                <span class="text">我收藏的歌单</span>
              </RouterLink>
            </div> -->
            <RouterLink to="/set">
              <div
                class="like"
                :class="{ heightLight: $route.fullPath == '/set' }"
              >
                <span class="iconfont icon-shezhi"></span>
                <span class="text">设置</span>
              </div>
            </RouterLink>
          </div>
        </transition>
      </template>
    </Drawer>
  </div>
</template>

<script>
import Drawer from "@/components/drawer.vue";
import { useStore } from "vuex";
import { computed } from "@vue/runtime-core";
export default {
  name: "Aside",
  components: { Drawer },
  setup() {
    const store = useStore();
    let show = computed(() => {
      return store.state.user.showAside;
    });
    const isShowAside = () => {
      store.commit("user/isShowAside");
    };
    return { show, isShowAside };
  },
};
</script>

<style scoped lang="less">
.v-enter-from {
  opacity: 0;
  transform: translateY(-100px);
}

.v-enter-active {
  transition: all 0.5s;
}

.music-aside {
  background-color: @asideColor;

  display: inline-block;
  .aside-list-close {
    height: 100%;
    overflow: hidden;
    text-align: center;

    .like {
      font-size: 12px;
      padding: 20px 0;
      color: @primaryTextColor;
      display: flex;
      flex-direction: column;
      cursor: pointer;
      transition: all 0.2s;
      span {
        font-size: 17px;
      }

      .text {
        font-size: 14px;
      }
      &.heightLight {
        background-color: @highlightColor;
      }

      &:hover {
        background-color: @highlightColor;
      }
    }
  }

  .aside-list-open {
    padding: 10px 20px;

    h4 {
      color: @primaryTextColor;
      padding: 0 24px;
    }

    .like {
      height: 30px;
      line-height: 30px;
      margin-top: 10px;
      color: @primaryTextColor;
      padding: 0 20px;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      display: flex;
      align-items: center;
      &.heightLight {
        background-color: @highlightColor;
      }

      &:hover {
        background-color: @highlightColor;
      }

      span {
        margin-right: 5px;
        font-size: 17px;
      }

      .text {
        font-size: 14px;
      }
    }
  }
}
</style>
