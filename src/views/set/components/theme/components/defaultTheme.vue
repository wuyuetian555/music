<template>
  <div class="default-theme">
    <div class="default">
      <div class="default-item">
        <span>默认</span>
      </div>
      <div class="category" @click="setTheme">
        <div class="category-item" data-theme="default">
          <i
            class="iconfont icon-checkboxweixuanzhongxiao icon"
            v-if="theme != 'default'"
            data-theme="default"
          ></i>
          <i
            class="iconfont icon-danxuancheckbox icon"
            v-else
            data-theme="default"
          ></i>
          <i class="iconfont icon-baitian-qing theme" data-theme="default"></i>
          <span data-theme="default">经典风格</span>
        </div>
        <div class="category-item" data-theme="dark">
          <i
            class="iconfont icon-checkboxweixuanzhongxiao icon"
            v-if="theme != 'dark'"
            data-theme="dark"
          ></i>
          <i
            class="iconfont icon-danxuancheckbox icon"
            v-else
            data-theme="dark"
          ></i>
          <i
            class="iconfont icon-yueliang1 theme dark theme"
            data-theme="dark"
          ></i>
          <span data-theme="dark">暗夜风格</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "DefaultTheme",
  setup() {
    const store = useStore();
    const theme = computed(() => {
      return store.state.user.theme;
    });
    const setTheme = (e) => {
      let targetTheme = e.target.dataset.theme;
      if (targetTheme == theme.value) return;
      store.commit("user/setTheme", targetTheme);
    };
    return {
      theme,
      setTheme,
    };
  },
};
</script>

<style scoped lang="less">
.default-theme {
  .default {
    min-height: 100px;
    background-color: @highlightColor;
    display: flex;
    border-radius: 5px;
    .default-item {
      width: 80px;
      text-align: center;
      line-height: 100px;

      span {
        font-size: 15px;
        opacity: 0.8;
      }
    }
    .category {
      padding-left: 30px;
      flex: 1;
      .category-item {
        font-size: 15px;
        height: 50px;
        display: flex;
        align-items: center;
        cursor: pointer;

        .icon {
          font-size: 12px;
          margin-right: 5px;
        }
        .theme {
          font-size: 30px;
          margin-right: 2px;
        }
      }
    }
  }
}
</style>
