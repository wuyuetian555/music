<template>
  <div class="home">
    <Recommend></Recommend>
    <RecommendList></RecommendList>
  </div>
</template>

<script>
import Recommend from './components/Recommend.vue';
import RecommendList from './components/RecommendList.vue';
import useScrollTop from '@/hooks/useScrollTop';
export default {
  name: 'Home',
  components: {
    Recommend,
    RecommendList
  },
  setup() {
    useScrollTop();
  }
};
</script>

<style lang="less" scoped>
.home {
  color: @primaryTextColor;
  height: 80vh;
  padding: @primaryPadding;
}
</style>
