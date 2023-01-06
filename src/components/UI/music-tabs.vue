<template>
  <div class="music-tabs">
    <div class="tabs-bar-item">
      <div
        class="tabs-bar"
        ref="bar"
        :style="{ width: barWidth + 'px', top: bottomPosition + 'px' }"
      ></div>
      <div class="tabs-item">
        <ul @click="getLeftPosition" :style="{ fontSize: size + 'px' }">
          <li
            v-for="(item, index) in data"
            :key="item.id"
            :style="{ padding: paddingWidth + 'px', width }"
            ref="item"
            :class="{ active: index == computedActiveIndex }"
            :data-index="index"
          >
            {{ item.value }}
          </li>
        </ul>
      </div>
    </div>
    <div class="tabs-container">
      <Transition mode="out-in">
        <slot :name="activeIndex"></slot>
      </Transition>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
export default {
  name: "MusicTabs",
  emit: ["change"],
  props: {
    size: {
      type: [Number, String],
      default: 17,
    },
    barWidth: {
      type: [Number, String],
      default: 17,
    },
    paddingWidth: {
      type: [Number, String],
      default: 20,
    },

    activeIndex: {
      type: [Number, String],
      default: 0,
    },
    bottomPosition: {
      type: [Number, String],
      default: 0,
    },
    width: {
      default: "80px",
    },
    data: Object,
  },
  setup(props, { emit }) {
    const bar = ref(null);
    const item = ref(null);
    const computedActiveIndex = ref(props.activeIndex);
    const getLeftPosition = (e) => {
      if (!e.target.dataset.index) return;
      if (e.target.dataset.index != 0) {
        const getLeftPosition =
          (e.target.offsetWidth - props.paddingWidth * 2) / 2 -
          props.barWidth / 2;
        bar.value.style.left =
          e.target.offsetLeft + props.paddingWidth + getLeftPosition + "px";
      } else {
        const getLeftPosition =
          (e.target.offsetWidth - props.paddingWidth) / 2 - props.barWidth / 2;
        bar.value.style.left = e.target.offsetLeft + getLeftPosition + "px";
      }
      computedActiveIndex.value = e.target.dataset.index;
      emit("change", props.data[e.target.dataset.index]);
      emit("update:activeIndex", e.target.dataset.index);
    };
    onMounted(() => {
      init();
    });

    const init = () => {
      if (props.activeIndex != 0) {
        const getLeftPosition =
          (item.value[props.activeIndex].offsetWidth - props.paddingWidth * 2) /
            2 -
          props.barWidth / 2;
        bar.value.style.left =
          item.value[props.activeIndex].offsetLeft * props.activeIndex +
          props.paddingWidth +
          getLeftPosition +
          "px";
      } else {
        const getLeftPosition =
          (item.value[0].offsetWidth - props.paddingWidth) / 2 -
          props.barWidth / 2;
        bar.value.style.left =
          item.value[0].offsetLeft * props.activeIndex + getLeftPosition + "px";
      }
    };

    return {
      getLeftPosition,
      bar,
      item,
      computedActiveIndex,
    };
  },
};
</script>

<style scoped lang="less">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.music-tabs {
  display: inline-block;
  width: auto;
  .tabs-bar-item {
    position: relative;
    .tabs-bar {
      position: absolute;
      height: 2px;
      background-color: @primaryTextColor;
      transition: all 0.2s;
    }

    .tabs-item {
      width: auto;

      ul {
        display: flex;
        color: @primaryTextColor;
        align-items: center;
        height: 100%;
        li {
          display: inline-block;
          cursor: pointer;
          transition: all 0.2s;
          text-align: center;
          &:first-of-type {
            padding-left: 0px !important;
          }

          &.active {
            font-weight: 700;
          }
        }
      }
    }
  }
  .tabs-container {
    color: @primaryTextColor;
    width: 100%;
    overflow: hidden;
  }
}
</style>
