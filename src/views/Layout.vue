<template>
  <div>
    <div class="bg" ref="bg"></div>
    <div class="container">
      <Header></Header>
      <div class="container-item">
        <Aside></Aside>
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Main from '@/components/main.vue';
import ColorThief from 'colorthief';

import { computed, onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'Layout',
  components: {
    Header,
    Aside,
    Main
  },
  setup() {
    const bg = ref(null);
    const store = useStore();
    let img, html;
    const musicBg = computed(() => {
      return store.state.musicplay.musicList.playingMusic.musicBg;
    });
    const colorthief = new ColorThief();
    onMounted(async () => {
      html = document.documentElement;
      img = document.querySelector('.music-item-img img.img');
      if (!musicBg.value) return;
      setBackground();
    });
    const setBackground = async () => {
      img.onload = async () => {
        const result = await colorthief.getPalette(img, 3);
        const color = result.map((item) => {
          return `rgb(${item[0]},${item[1]},${item[2]})`;
        });
        bg.value.style.background = `linear-gradient(to top, ${color[0]}, ${color[1]}, ${color[2]})`;
        store.state.color.colors = color;
        html.style.setProperty('--color', color[0]);
        html.style.setProperty('--color1', color[1]);
        html.style.setProperty('--color2', color[2]);
      };
    };
    watch(
      () => musicBg.value,
      async () => {
        await setBackground();
      }
    );
    return {
      bg
    };
  }
};
</script>

<style scoped lang="less">
.bg {
  height: 100%;
  width: 100%;
  position: fixed;
  background-position: center;
  background-size: cover;
  background-image: url('@/assets/images/1.jpg');
  filter: brightness(0.9);
}

.container {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;

  .container-item {
    display: flex;
  }
}
</style>
