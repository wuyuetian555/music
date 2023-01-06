<template>
  <div>
    <div class="bg"></div>
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
import Header from "@/components/header.vue";
import Aside from "@/components/aside.vue";
import Player from "@/components/player/index.vue";
import Lyric from "@/components/lyric/index.vue";
import Main from "@/components/main.vue";

export default {
  name: "Layout",
  components: {
    Header,
    Aside,
    Player,
    Lyric,
    Main,
  },
  setup() {},
};
</script>

<style scoped lang="less">
.bg {
  height: 100vh;
  background-size: cover;
  transition: all 0.4s;
  background-position: center;
  position: fixed;
  width: 100%;
  filter: brightness(0.9) sepia(10%);
  background-image: url("@/assets/images/1.jpg");
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
