<template>
  <div class="set-theme">
    <DefaultTheme></DefaultTheme>
    <FreeTheme></FreeTheme>
  </div>
</template>

<script>
import DefaultTheme from './components/defaultTheme.vue';
import FreeTheme from './components/freeTheme.vue';
export default {
  name: 'Theme',
  components: {
    DefaultTheme,
    FreeTheme
  }
};
</script>

<style scoped lang="less">
.set-theme {
  margin-top: 20px;
}
</style>
