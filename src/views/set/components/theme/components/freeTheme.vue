<template>
  <div class="free-theme">
    <div class="free">
      <div class="free-name">
        <span>自定义</span>
      </div>
      <div class="free-parameter">
        <div class="free-item">
          <span class="text">文字颜色</span>
          <input
            type="color"
            v-model="currentThemeDetail.primaryTextColor"
            @input="changTheme"
            data-theme="primaryTextColor"
          />
          <div class="progress">
            <span>透明度</span>
            <span class="Alpha">{{
              Math.ceil(Alpha.primaryTextColor * 100)
            }}</span>
            <AlphaProgress
              v-model:currentTime="Alpha.primaryTextColor"
              :duration="1"
              @clickProgress="getProgressValue"
              width="200"
            ></AlphaProgress>
            <span>100</span>
          </div>
        </div>
        <div class="free-item">
          <span class="text">背景颜色</span>
          <input
            type="color"
            v-model="currentThemeDetail.primaryColor"
            @input="changTheme"
            data-theme="primaryColor"
          />
          <div class="progress">
            <span>透明度</span>
            <span class="Alpha">{{ Math.ceil(Alpha.primaryColor * 100) }}</span>
            <AlphaProgress
              v-model:currentTime="Alpha.primaryColor"
              :duration="1"
              @clickProgress="getProgressValue"
              width="200"
            ></AlphaProgress>
            <span>100</span>
          </div>
        </div>
        <div class="free-item">
          <span class="text">hover颜色</span>
          <input
            type="color"
            v-model="currentThemeDetail.highlightColor"
            @input="changTheme"
            data-theme="highlightColor"
          />
          <div class="progress">
            <span>透明度</span>
            <span class="Alpha">{{
              Math.ceil(Alpha.highlightColor * 100)
            }}</span>
            <AlphaProgress
              v-model:currentTime="Alpha.highlightColor"
              :duration="1"
              @clickProgress="getProgressValue"
              width="200"
            ></AlphaProgress>
            <span>100</span>
          </div>
        </div>
      </div>
      <div class="free-btn" @click="setTheme" data-theme="myTheme">
        <i
          class="iconfont icon-checkboxweixuanzhongxiao icon"
          v-if="currentTheme != 'myTheme'"
          data-theme="myTheme"
        ></i>
        <i
          class="iconfont icon-danxuancheckbox icon"
          v-else
          data-theme="myTheme"
        ></i>
        <span data-theme="myTheme"> 自定义风格 </span>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, reactive, toRefs, watch } from 'vue';
import { useStore } from 'vuex';
import { themes } from '@/theme/model';
import { getHexString, getRgba, getColorAlpha } from '@/theme/theme';
import AlphaProgress from '@/components/progress.vue';
export default {
  name: 'FreeTheme',
  components: {
    AlphaProgress
  },
  setup() {
    const store = useStore();
    const currentTheme = computed(() => {
      return store.state.user.theme;
    });
    const data = reactive({
      currentThemeDetail: {
        primaryColor: '',
        primaryTextColor: '',
        highlightColor: ''
      },
      Alpha: {}
    });
    onBeforeMount(() => {
      data.currentThemeDetail = init(currentTheme.value).currentThemeDetail;
      data.Alpha = init(currentTheme.value).Alpha;
    });
    watch(
      () => currentTheme.value,
      (newVal) => {
        if (newVal != 'myTheme') return;
        data.currentThemeDetail = init(newVal).currentThemeDetail;
        data.Alpha = init(newVal).Alpha;
      }
    );
    const changTheme = () => {
      const color = getRgba({ ...data });
      store.commit('user/setMyTheme', color);
    };
    const init = (themeName) => {
      if (themes[themeName] && !store.state.user.myThemeDetail) {
        return {
          currentThemeDetail: getHexString(themes[themeName]),
          Alpha: getColorAlpha(themes[themeName])
        };
      } else {
        return {
          currentThemeDetail: getHexString(store.state.user.myThemeDetail),
          Alpha: getColorAlpha(store.state.user.myThemeDetail)
        };
      }
    };
    const getProgressValue = () => {
      const color = getRgba({ ...data });
      store.commit('user/setMyTheme', color);
    };
    const setTheme = (e) => {
      const targetTheme = e.target.dataset.theme;
      if (targetTheme == currentTheme.value) return;
      store.commit('user/setTheme', targetTheme);
    };
    return {
      ...toRefs(data),
      changTheme,
      getProgressValue,
      currentTheme,
      setTheme
    };
  }
};
</script>

<style scoped lang="less">
.free-theme {
  background-color: @highlightColor;
  margin-top: 20px;
  border-radius: 5px;

  .free {
    display: flex;

    .free-name {
      width: 80px;
      text-align: center;
      font-size: 15px;
      opacity: 0.8;
      margin: auto 0;
    }
    .free-parameter {
      padding-left: 30px;
      .free-item {
        height: 50px;
        line-height: 50px;
        display: flex;
        align-items: center;

        .text {
          display: inline-block;
          width: 80px;
          margin-right: 10px;
        }
        input {
          margin-right: 60px;
        }
        .progress {
          display: flex;
          align-items: center;
          > span {
            margin-left: 10px;
            width: 50px;
          }
          .Alpha {
            width: 30px;
          }
          .music-progress {
            margin-left: 10px;
          }
        }
      }
    }
    .free-btn {
      margin: auto 20px;
      cursor: pointer;
      padding: 10px;
      .icon {
        font-size: 12px;
        padding-right: 5px;
      }
      span {
        font-size: 15px;
      }
    }
  }
}
</style>
