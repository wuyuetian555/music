<template>
  <div class="music-tabs">
    <div class="tabs-bar-item">
      <div
        class="tabs-bar"
        ref="bar"
        :style="{ width: barWidth + 'px', top: bottomPosition + 'px' }"
      ></div>
      <div class="tabs-item">
        <ul @click="changePosition" :style="{ fontSize: size + 'px' }">
          <li
            v-for="(item, index) in data"
            :key="item.id"
            :style="{ padding: paddingWidth + 'px', width }"
            ref="item"
            :class="{ active: index == activeIndex }"
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
import { ref, onMounted, watch } from 'vue';
export default {
  name: 'MusicTabs',
  emit: ['change'],
  props: {
    size: {
      type: [Number, String],
      default: 17
    },
    barWidth: {
      type: [Number, String],
      default: 17
    },
    paddingWidth: {
      type: [Number, String],
      default: 20
    },

    activeIndex: {
      type: [Number, String],
      default: 0
    },
    bottomPosition: {
      type: [Number, String],
      default: 0
    },
    width: {
      default: '80px'
    },
    data: Object
  },
  setup(props, { emit }) {
    const bar = ref(null);
    const item = ref(null);
    const changePosition = (e) => {
      if (e.target.dataset.index) {
        emit('change', props.data[e.target.dataset.index]);
        emit('update:activeIndex', e.target.dataset.index);
      }
    };
    onMounted(() => {
      init();
    });

    const init = () => {
      if (props.activeIndex != 0) {
        const offsetWidth = item.value[props.activeIndex].offsetWidth;
        const offsetLeft = item.value[props.activeIndex].offsetLeft;
        const getLeftPosition =
          (offsetWidth - props.paddingWidth * 2) / 2 - props.barWidth / 2;
        bar.value.style.left =
          offsetLeft + props.paddingWidth + getLeftPosition + 'px';
      } else {
        const offsetWidth = item.value[0].offsetWidth;
        const getLeftPosition =
          (offsetWidth - props.paddingWidth) / 2 - props.barWidth / 2;
        bar.value.style.left = +getLeftPosition + 'px';
      }
    };

    watch(
      () => props.activeIndex,
      () => {
        init();
      }
    );

    return {
      changePosition,
      bar,
      item
    };
  }
};
</script>

<style scoped lang="less">
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
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
  }
}
</style>
