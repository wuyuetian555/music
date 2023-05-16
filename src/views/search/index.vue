<template>
  <div class="search">
    <SearchHeader></SearchHeader>
    <SearchList></SearchList>
  </div>
</template>

<script>
import SearchHeader from './components/SearchHeader.vue';
import SearchList from './components/SearchList.vue';
export default {
  name: 'Search',
  components: { SearchHeader, SearchList }
};
</script>

<style scoped lang="less">
.search {
  padding: @primaryPadding;
}
</style>
