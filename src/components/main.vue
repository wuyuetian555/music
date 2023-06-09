<template>
  <div class="main">
    <div class="list" ref="list">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component
            :key="$route.name"
            :is="Component"
            v-if="$route.meta.keepAlive"
          />
        </keep-alive>
        <component
          :key="$route.name"
          :is="Component"
          v-if="!$route.meta.keepAlive"
        />
      </router-view>
      <i
        class="iconfont icon-xiangshang4 backtop"
        v-show="showBack && showBack2"
        @click="backTop"
      ></i>
    </div>
    <div class="footer-player">
      <Player />
      <transition>
        <keep-alive>
          <Lyric v-if="showLyric"> </Lyric>
        </keep-alive>
      </transition>
    </div>
  </div>
</template>

<script>
import { computed, reactive, toRefs, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Lyric from '@/components/lyric/index.vue';
import Player from '@/components/player/index.vue';
import useMusicControl from '@/hooks/useMusicControl';
export default {
  name: 'Main',
  components: {
    Lyric,
    Player
  },
  setup() {
    const data = reactive({
      list: null,
      showBack: false,
      showBack2: false
    });
    const route = useRoute();
    const store = useStore();
    const audio = store.state.musicplay.audio;
    const showLyric = computed(() => {
      return store.state.musicplay.showLyric;
    });
    onMounted(() => {
      data.list.addEventListener('scroll', listenScroll());
      store.commit('user/getScrollTopDom', data.list);
    });
    const { nextMusic } = useMusicControl();
    audio.addEventListener('ended', () => {
      nextMusic();
    });
    const backTop = () => {
      data.list.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    watch(
      () => route.name,
      (newVal) => {
        if (
          newVal == 'Home' ||
          newVal == 'SingerDetail' ||
          newVal == 'Album' ||
          newVal == 'Played' ||
          newVal == 'Like' ||
          newVal == 'SingerList'
        ) {
          data.showBack = true;
        } else {
          data.showBack = false;
        }
      },
      { immediate: true }
    );

    const listenScroll = () => {
      let timer;
      return function () {
        if (!timer) {
          timer = setTimeout(() => {
            data.showBack2 = data.list.scrollTop > 80;
            store.commit('user/listenListScroll', data.list.scrollTop);
            timer = null;
          }, 150);
        }
      };
    };
    return {
      showLyric,
      ...toRefs(data),
      backTop
    };
  }
};
</script>

<style scoped lang="less">
.v-enter-active,
.v-leave-active {
  transition: all 0.5s;
}

.v-enter-from,
.v-leave-to {
  transform: translateY(100vh);
}
.main {
  flex: 1;
  background-color: @primaryColor;
  overflow: hidden;

  .list {
    height: calc(100vh - 146px);
    overflow: auto;

    .backtop {
      position: fixed;
      right: 255px;
      bottom: 90px;
      color: @primaryTextColor;
      font-size: 28px;
      cursor: pointer;
      transform: scale(1.1);
      &:hover {
        font-weight: 700;
      }
    }
  }
}
</style>
