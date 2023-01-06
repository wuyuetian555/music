<template>
  <teleport to="body">
    <transition name="slide-fade" mode="out-in">
      <div class="music-mask" @click="close" v-if="show">
        <div
          class="music-dialog"
          @click="isStopPropagation"
          :style="{ width: width, height: height, marginTop: toptranslate }"
        >
          <div class="dialog-title">
            <span
              class="title"
              :style="{ textAlign: index }"
              v-if="!hidetitle"
              >{{ title }}</span
            >
            <span class="iconfont icon-guanbi" @click="close"></span>
          </div>
          <div class="dialog-body">
            <slot>
              <div class="body">{{ text }}</div>
            </slot>
          </div>
          <div class="dialog-btn" v-if="!hidebtn">
            <button @click="close"><span>关 闭</span></button>
            <button @click="save"><span>保 存</span></button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "MusicDialog",
  emits: ["save", "update:show"],
  props: {
    title: {
      type: String,
      default: "标题内容",
    },
    index: {
      type: String,
      default: "left",
    },
    show: {
      type: Boolean,
      default: true,
    },
    width: {
      type: String,
      default: "500px",
    },
    height: {
      type: String,
      default: "220px",
    },
    hidetitle: {
      type: Boolean,
      default: false,
    },
    hidebtn: {
      type: Boolean,
      default: false,
    },
    data: {
      default: "",
    },
    toptranslate: {
      default: "",
    },
    text: {
      type: String,
      default: "",
    },
    cancelCallback: {
      type: Function,
    },
  },
  setup(props, { emit }) {
    const close = () => {
      props.cancelCallback && props.cancelCallback();
      emit("update:show", !props.show);
    };
    const save = () => {
      emit("save", 66);
      emit("update:show", !props.show);
    };
    const isStopPropagation = (e) => {
      props.cancelCallback && props.cancelCallback();
      props.cancelCallback || e.stopPropagation();
    };
    return { close, save, isStopPropagation };
  },
};
</script>

<style scoped lang="less">
.slide-fade-enter-active {
  transition: all 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0.2;
}

.music-mask {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.music-dialog {
  display: flex;
  flex-direction: column;

  min-height: 220px;
  max-height: 80vh;
  background-color: @primaryColor;
  filter: contrast(1);
  border-radius: 4px;
  box-shadow: 0px 3px 7px 0px @primaryColor;

  .dialog-title {
    display: flex;
    align-items: center;
    padding: 10px 20px;
    position: sticky;
    top: 0;
    border-bottom: 1px solid @primaryColor;
    color: @primaryTextColor;

    .title {
      flex: 1;
      display: inline-block;
      font-size: 20px;
    }

    .icon-guanbi {
      transition: all 0.2s;
      color: @primaryTextColor;
      cursor: pointer;

      &:hover {
        filter: brightness(2);
      }
    }
  }

  .dialog-body {
    flex: 1;
    padding: 20px;
    overflow: hidden;
    color: @primaryTextColor;
    font-size: 17px;

    .body {
      text-align: center;
      margin-top: 30px;
    }
  }

  .dialog-btn {
    text-align: right;
    height: 70px;
    line-height: 70px;
    padding: 0 20px;

    button {
      border: 0;
      outline: none;
      border-radius: 4px;
      border: 1px solid #dcdfe6;
      line-height: 1;
      white-space: nowrap;
      color: @primaryTextColor;
      background-color: @primaryColor;
      cursor: pointer;

      & + button {
        margin-left: 20px;
      }

      span {
        font-size: 14px;
        padding: 12px 20px;
        display: inline-block;
        transition: all 0.2s;

        &:hover {
          font-weight: 700;
        }
      }
    }
  }
}
</style>
