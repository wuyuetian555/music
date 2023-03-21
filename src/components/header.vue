<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/"><i class="iconfont icon-yinle icon"></i></router-link>
      <HeaderNav class="header-nav"></HeaderNav>
    </div>

    <Time class="time"></Time>
    <div class="header-right">
      <SearchInput></SearchInput>
      <div class="user">
        <button @click.stop="show = !show">
          <span class="login">登 录</span>
          <Login v-model:show="show" v-if="show"></Login>
          <i class="iconfont icon-touxiang"></i>
        </button>
        <div @click="changeTheme">
          <i
            class="iconfont icon-baitian-qing theme"
            v-if="theme == 'default'"
            data-theme="dark"
          ></i>
          <i
            class="iconfont icon-yueliang1 theme dark"
            v-else-if="theme == 'dark'"
            :data-theme="
              $store.state.user.myThemeDetail.length != 0
                ? 'myThemeDetail'
                : 'default'
            "
          ></i>
          <i
            class="iconfont icon-pifu theme dark"
            v-else
            data-theme="default"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/headerNav.vue";
import Time from "@/components/time.vue";
import Skin from "@/components/skin.vue";
import SearchInput from "@/components/searchinput.vue";
import { useStore } from "vuex";
import { computed, onBeforeMount, ref } from "vue";
import Login from "@/components/login/index.vue";
export default {
  name: "Header",
  components: { HeaderNav, Time, Skin, SearchInput, Login },
  setup() {
    const store = useStore();
    const theme = computed(() => {
      return store.state.user.theme;
    });
    onBeforeMount(() => {
      store.commit("user/initTheme", theme.value);
    });
    const changeTheme = (e) => {
      let target = e.target.dataset.theme;
      target ? store.commit("user/setTheme", e.target.dataset.theme) : null;
    };
    const show = ref(false);
    return { theme, changeTheme, show };
  },
};
</script>

<style lang="less" scoped>
.header {
  background-color: @headerColor;
  display: flex;
  align-items: center;
  position: relative;

  .header-left {
    flex: 1;
    display: flex;
    align-items: center;

    .icon {
      color: @primaryTextColor;
      width: 40px;
      height: 40px;
      min-width: 40px;
      min-height: 40px;
      cursor: pointer;
      display: block;
      margin-left: 10px;
      line-height: 40px;
      text-align: center;
      &::before {
        font-size: 32px;
        transform: scale(2);
      }
    }
  }

  .time {
    flex: 1;
  }

  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .search {
      border-radius: 30px;
      width: 260px;
      overflow: hidden;
      display: flex;
      height: 40px;
      align-items: center;
      background-color: @primaryColor;

      input {
        height: 100%;
        padding: 0px 0px 0px 15px;
        flex: 1;
        outline: none;
        background: transparent;
        border: 0;
        color: @primaryTextColor;

        &::-webkit-input-placeholder {
          color: @primaryTextColor;
        }

        &::-moz-placeholder {
          color: @primaryTextColor;
        }

        &::-moz-placeholder {
          color: @primaryTextColor;
        }

        &::-ms-input-placeholder {
          color: @primaryTextColor;
        }
      }

      span {
        font-size: 25px;
        color: @primaryTextColor;
        background: transparent;
        width: 50px;
        text-align: center;
        line-height: 40px;
      }
    }

    .user {
      display: flex;
      align-items: center;
      justify-content: space-between;

      button {
        border: none;
        cursor: pointer;
        background: transparent;
        display: flex;
        align-items: center;
        margin-right: 15px;

        span,
        i {
          flex-shrink: 0;
          font-size: 17px;
          padding: 0 10px;
          color: @primaryTextColor;
          transition: all 0.2s;
        }

        .iconfont {
          font-size: 25px;
          opacity: 0.6;
          transition: all 0.2s;
        }

        &:hover {
          .iconfont {
            opacity: 1;
            font-weight: 700;
          }
        }
      }

      .theme {
        font-size: 25px;
        color: @primaryTextColor;
        transition: all 0.2s;
        cursor: pointer;
        margin-right: 10px;
        opacity: 0.6;
        vertical-align: 0.15em;

        &:hover {
          opacity: 1;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
