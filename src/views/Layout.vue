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
import Header from '@/components/header.vue';
import Aside from '@/components/aside.vue';
import Main from '@/components/main.vue';
export default {
  name: 'Layout',
  components: {
    Header,
    Aside,
    Main
  },
  setup() {}
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
