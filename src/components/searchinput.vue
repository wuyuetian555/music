<template>
  <div class="search-header">
    <div class="search-input" :style="{ width, height }">
      <input
        type="text"
        v-model="searValue"
        placeholder="搜索音乐"
        ref="input"
        @keyup.enter="searchSongs(searValue)"
      />
      <span
        class="iconfont icon-fangdajing icon"
        @click.enter="searchSongs(searValue)"
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
import { findsearchSuggest } from "@/api/search";
import { reactive, watch, onMounted, toRefs } from "vue";
import useDebounce from "@/hooks/useDebounce";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "SearchHeader",
  props: {
    width: {
      default: "260px",
    },
    height: {
      default: "40px",
    },
    suggestWidth: {
      default: "479px",
    },
  },
  setup() {
    const data = reactive({
      input: null,
      list: null,
      searValue: "",
      searchSuggest: [],
    });
    const store = useStore();
    const router = useRouter();
    onMounted(() => {
      data.input.onfocus = () => {
        data.list.style.height = "auto";
      };
      data.input.onblur = () => {
        setTimeout(() => {
          data.list.style.height = 0;
        }, 200);
      };
    });

    const getSearchSuggest = () => {
      data.searValue.trim() != "" &&
        findsearchSuggest({ keywords: data.searValue }).then((res) => {
          data.searchSuggest = res.result.songs.slice(0, 10);
        });
    };
    const debounceSearch = useDebounce(getSearchSuggest, 500);
    const handleClick = async (e) => {
      const target = e.target;
      data.searValue = target.dataset.musicname;
      searchSongs(data.searValue);
    };
    const searchSongs = async (value) => {
      if (value.trim() == "") return;
      const result = await findsearchSuggest({ keywords: value, limit: 55 });
      data.input.blur();
      store.commit("search/getSearchList", { songList: result.result.songs });
      data.list.style.height = 0;
      router.push("/search");
    };
    watch(
      () => data.searValue,
      (newVal) => {
        newVal.trim() == "" ? (data.searchSuggest = []) : null;
        debounceSearch();
      }
    );
    return {
      handleClick,
      ...toRefs(data),
      searchSongs,
    };
  },
};
</script>

<style scoped lang="less">
.search-header {
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
    background-color: @topColor;
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
