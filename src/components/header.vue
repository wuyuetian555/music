<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/"><i class="iconfont icon-yinle icon"></i></router-link>
      <HeaderNav class="header-nav"></HeaderNav>
    </div>

    <div class="header-right">
      <SearchInput></SearchInput>
      <div class="user">
        <div class="login" @click.stop="show = !show" v-if="!userinfo.email">
          <span>登 录</span>
          <Login v-model:show="show" v-if="show"></Login>
          <i class="iconfont icon-touxiang"></i>
        </div>

        <el-popover
          trigger="click"
          v-else
          width="225"
          popper-class="el-popover1"
          popper-style="backgroundColor:var(--primaryColor);borderColor:var(--primaryColor)"
          :teleported="false"
        >
          <template #reference>
            <div>
              <div class="user-name ellipsis">
                <h4>Hi,{{ userinfo.email.split("@")[0] }}</h4>
                <span :title="userinfo.email">{{ userinfo.email }}</span>
              </div>
              <span class="avatar"
                >{{ userinfo.email.slice(0, 2).toUpperCase() }}
              </span>
            </div>
          </template>

          <template #default>
            <div class="sign-out">
              <el-button type="primary" @click.stop="signOut"
                >退出登录</el-button
              >
            </div>
          </template>
        </el-popover>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/headerNav.vue";
import Time from "@/components/time.vue";
import Skin from "@/components/skin.vue";
import SearchInput from "@/components/searchinput.vue";

import { ref, computed, onBeforeMount } from "vue";
import Login from "@/components/login/index.vue";
import { useStore } from "vuex";
export default {
  name: "Header",
  components: { HeaderNav, Time, Skin, SearchInput, Login },
  setup() {
    const show = ref(false);
    const store = useStore();
    const userinfo = computed(() => {
      return store.state.user.userinfo;
    });
    onBeforeMount(() => {
      store.commit("user/initTheme", store.state.user.theme);
    });
    const signOut = () => {
      store.commit("user/signOut");
    };
    return { show, userinfo, signOut };
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

  .header-right {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 10px;
    .search-header {
      margin-right: 50px;
    }

    .user {
      color: @primaryTextColor;

      .el-tooltip__trigger {
        display: flex;
        align-items: center;
        cursor: pointer;
        min-width: 221px;
        justify-content: flex-end;
        .user-name {
          max-width: 200px;
          text-align: right;

          h4 {
            font-weight: bold;
          }
          span {
            font-size: 12px;
          }
        }
        .avatar {
          display: inline-block;
          border: 1px solid @primaryTextColor;
          padding: 6px 8px;
          border-radius: 5px;
          margin-left: 20px;
        }
      }
      .sign-out {
        text-align: center;
        button {
          background-color: @asideColor;
          border-color: @primaryColor;
          width: 100%;
          color: @primaryTextColor;
        }
      }
      ::v-deep .el-popper__arrow::before {
        background-color: @primaryTextColor;
        border-color: @primaryTextColor;
      }

      .login {
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
    }
  }
}
</style>
