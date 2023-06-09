<template>
  <div class="search-header">
    <div class="search-input" :style="{ width, height }">
      <input
        type="text"
        v-model="searchValue"
        placeholder="搜索音乐"
        ref="input"
        @keyup.enter="searchSongs(searchValue)"
      />
      <span
        class="iconfont icon-fangdajing icon"
        @click.enter="searchSongs(searchValue)"
      ></span>
    </div>
    <div
      class="search-suggest"
      @click="handleClick"
      ref="list"
      :style="{ width: suggestWidth }"
    >
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
import { findsearchSuggest } from '@/api/search';
import { reactive, watch, onMounted, toRefs } from 'vue';
import useDebounce from '@/hooks/useDebounce';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'SearchHeader',
  props: {
    width: {
      default: '260px'
    },
    height: {
      default: '40px'
    },
    suggestWidth: {
      default: '479px'
    }
  },
  setup() {
    const data = reactive({
      input: null,
      list: null,
      searchValue: '',
      searchSuggest: []
    });
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      data.input.onfocus = () => {
        data.list.style.height = 'auto';
      };
      data.input.onblur = () => {
        setTimeout(() => {
          data.list.style.height = 0;
        }, 200);
      };
    });

    const getSearchSuggest = () => {
      data.searchValue.trim() != '' &&
        findsearchSuggest({ keywords: data.searchValue }).then((res) => {
          data.searchSuggest = res.result.songs.slice(0, 10);
        });
    };
    const debounceSearch = useDebounce(getSearchSuggest, 500);
    const handleClick = async (e) => {
      const target = e.target;
      data.searchValue = target.dataset.musicname;
      searchSongs(data.searchValue);
    };
    const searchSongs = async (value) => {
      if (value.trim() == '') return;
      const result = await findsearchSuggest({ keywords: value, limit: 55 });
      data.input.blur();
      store.commit('search/getSearchList', { songList: result.result.songs });
      data.list.style.height = 0;
      store.commit('search/editActiveIndex', { activeIndex: 0 });
      store.commit('search/getSearchValue', { searchValue: value });
      router.push('/search');
    };
    watch(
      () => data.searchValue,
      (newVal) => {
        newVal.trim() == '' && (data.searchSuggest = []);
        debounceSearch();
      }
    );
    return {
      handleClick,
      ...toRefs(data),
      searchSongs
    };
  }
};
</script>

<style scoped lang="less">
.search-header {
  position: relative;
  z-index: 11;
  .search-input {
    background-color: @highlightColor;
    display: flex;
    align-items: center;
    border-radius: 30px;
    overflow: hidden;

    input {
      border: 0;
      outline: none;
      height: 40px;
      background: transparent;
      flex: 1;
      padding: 10px 20px;
      font-size: 14px;
      line-height: 40px;
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
      font-size: 17px;
      display: inline-block;
      width: 40px;
      text-align: center;
    }
  }

  .search-suggest {
    margin-top: 5px;
    cursor: pointer;
    height: auto;
    transition: all 1s;
    color: @primaryTextColor;
    background-color: var(--color2);
    border-radius: 5px;
    overflow: hidden;
    position: absolute;
    z-index: 10;
    .search-suggest-item {
      height: 30px;
      line-height: 30px;
      padding: 0 20px;

      &:hover {
        background-color: @highlightColor !important;
      }
    }
  }
}
</style>
