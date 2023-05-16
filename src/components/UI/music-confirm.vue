<template>
  <div class="music-confirm">
    <div class="mask" @click="clearConfirm" :class="{ fade }">
      <div class="confirm" @click.stop>
        <div class="head">
          <h3>提示</h3>
          <i class="iconfont icon-guanbi"></i>
        </div>
        <div class="main">
          <span>您确定执行该操作吗？</span>
        </div>
        <div class="btn">
          <music-button @click="cancel">
            <span>取消</span>
          </music-button>
          <music-button @click="submit">
            <span>确认</span>
          </music-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import MusicButton from './music-button.vue';
export default {
  name: 'MusicConfirm',
  components: { MusicButton },
  props: {
    cancelCallback: {
      type: Function
    },
    submitCallback: {
      type: Function
    }
  },
  setup(props) {
    const fade = ref(false);
    onMounted(() => {
      setTimeout(() => {
        fade.value = true;
      }, 0);
    });
    const clearConfirm = () => {
      props.cancelCallback();
    };
    const cancel = () => {
      props.cancelCallback();
    };
    const submit = () => {
      props.submitCallback();
    };
    return { clearConfirm, fade, cancel, submit };
  }
};
</script>

<style scoped lang="less">
.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  color: @primaryTextColor;
  background: rgba(0, 0, 0, 0);
  &.fade {
    transition: all 0.4s;
    background: rgba(0, 0, 0, 0.5);
  }
  .confirm {
    width: 350px;
    height: 140px;
    padding: 10px 20px;
    border-radius: 6px;
    box-shadow: 0 0 12px 5px @primaryTextColor;
    background-color: @primaryColor;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .head {
      h3 {
        display: inline-block;
      }
      i {
        float: right;
      }
    }
    .btn {
      align-self: flex-end;
      .music-button {
        min-width: auto;
        width: 75px;
        padding: 8px 15px;
        border-radius: 4px;
        height: 32px;
        line-height: 1;
        &:nth-child(2) {
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
