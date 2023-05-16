<template>
  <div class="search-header">
    <div class="search-input">
      <input
        type="text"
        v-model="searchValue"
        placeholder="请输入歌名"
        ref="input"
        @keyup.enter="searchSongs(searchValue)"
      />
      <span
        class="iconfont icon-fangdajing icon"
        @click="searchSongs(searchValue)"
      ></span>
    </div>
    <div class="search-suggest" @click="handleClick" ref="list">
      <div
        v-for="item in searchSuggest"
        :key="item.id"
        class="search-suggest-item"
        :data-musicName="item.name"
      >
        {{ item.name }} -- {{ item.ar[0].name }}
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, watch, onMounted, toRefs, computed } from 'vue';
import useDebounce from '@/hooks/useDebounce';
import { useStore } from 'vuex';
export default {
  name: 'SearchHeader',
  setup() {
    const data = reactive({
      input: null,
      list: null,
      searchSuggest: []
    });
    const searchValue = computed({
      get() {
        return store.state.search.searchValue;
      },
      set(val) {
        store.commit('search/getSearchValue', { searchValue: val });
      }
    });
    const store = useStore();
    onMounted(() => {
      data.input.focus();
      data.input.onfocus = () => {
        data.list.style.height = 'auto';
      };
      data.input.onblur = () => {
        setTimeout(() => {
          data.list.style.height = 0;
        }, 200);
      };
    });

    const getSearchSuggest = async () => {
      if (searchValue.value == '') return;
      const songs = await store.dispatch('search/searchWYYSongsSuggest');
      data.searchSuggest = songs;
    };
    const debounceSearch = useDebounce(getSearchSuggest, 500);
    const handleClick = async (e) => {
      const target = e.target;
      searchValue.value = target.dataset.musicname;
      searchSongs(searchValue.value);
    };
    const searchSongs = async (value) => {
      if (value.trim() == '') return;
      await store.dispatch('search/searchWYYSongs', { keywords: value });
      data.input.blur();
      data.list.style.height = 0;
    };
    watch(
      () => searchValue.value,
      (newVal) => {
        data.searchSuggest = newVal.trim() == '' ? [] : data.searchSuggest;
        debounceSearch();
      }
    );
    return {
      handleClick,
      ...toRefs(data),
      searchSongs,
      searchValue
    };
  }
};
</script>

<style scoped lang="less">
.search-header {
  margin-left: 50%;
  transform: translateX(-50%);
  position: relative;
  z-index: 10;
  .search-input {
    width: 600px;
    height: 50px;
    background-color: @highlightColor;
    display: flex;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;

    input {
      border: 0;
      outline: none;
      height: 50px;
      background: transparent;
      flex: 1;
      padding: 10px 20px;
      font-size: 16px;
      line-height: 30px;
      color: @primaryTextColor;

      &::-webkit-input-placeholder {
        /* WebKit browsers */
        color: @primaryTextColor;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: @primaryTextColor;
      }

      &::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: @primaryTextColor;
      }

      &::-ms-input-placeholder {
        /* Internet Explorer 10+ */
        color: @primaryTextColor;
      }
    }

    .icon {
      color: @primaryTextColor;
      font-size: 32px;
      display: inline-block;
      width: 50px;
    }
  }

  .search-suggest {
    margin-top: 5px;
    width: 600px;
    height: auto;
    transition: all 1s;
    color: @primaryTextColor;
    background-color: @topColor;
    border-radius: 5px;
    overflow: hidden;
    position: absolute;

    .search-suggest-item {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;

      cursor: pointer;
      &:hover {
        background-color: @highlightColor !important;
      }
    }
  }
}
</style>
