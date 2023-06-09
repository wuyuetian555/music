<template>
  <ul class="HeaderNav" @mouseleave="MouseLeaveNav" @click="ClickNav($event)">
    <li>
      <div ref="divDom"></div>
    </li>
    <li v-for="(item, index) in data" :key="item.id">
      <RouterLink
        :to="item.link"
        @mouseenter="MouseEnterNav(index + 1)"
        :class="{ active: index + 1 == clickIndex }"
        :data-index="item.id"
        >{{ item.value }}</RouterLink
      >
    </li>
  </ul>
</template>

<script>
import { ref, reactive, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'HeaderNav',
  setup() {
    const divDom = ref(null);
    const clickIndex = ref(null);
    const route = useRoute();
    const data = reactive([
      {
        id: 1,
        value: '首 页',
        link: '/'
      },
      {
        id: 2,
        value: '歌 手',
        link: '/singerList'
      },
      {
        id: 3,
        value: '搜 索',
        link: '/search'
      }
    ]);

    const MouseEnterNav = (index) => {
      switch (+index) {
        case 1:
          divDom.value.style.left = '30px';
          break;
        case 2:
          divDom.value.style.left = '130px';
          break;
        case 3:
          divDom.value.style.left = '230px';
          break;
        default:
          break;
      }
    };
    const MouseLeaveNav = () => {
      MouseEnterNav(clickIndex.value);
    };
    const ClickNav = (e) => {
      clickIndex.value = e.target.dataset.index;
    };
    watch(
      () => route.meta,
      (newVal) => {
        if (newVal.showDivDom) {
          divDom.value.style.display = 'block';
        } else {
          divDom.value.style.display = 'none';
          clickIndex.value = 0;
        }
      }
    );
    onMounted(() => {
      if (route.fullPath == '/home') {
        divDom.value.style.left = '30px';
        clickIndex.value = 1;
      } else if (route.fullPath == '/search') {
        divDom.value.style.left = '230px';
        clickIndex.value = 3;
      } else if (route.fullPath == '/singerList') {
        divDom.value.style.left = '130px';
        clickIndex.value = 2;
      }
    });
    return {
      divDom,
      data,
      MouseEnterNav,
      MouseLeaveNav,
      ClickNav,
      clickIndex
    };
  }
};
</script>

<style scoped lang="less">
.HeaderNav {
  display: flex;
  position: relative;
  height: 66px;
  line-height: 66px;
  overflow: hidden;

  li {
    div {
      position: absolute;
      z-index: 1;
      transition: all 0.2s ease-in-out 0s;
      background-color: @primaryTextColor;
      height: 5px;
      left: 30px;
      width: 40px;
      top: 0px;
    }

    a {
      width: 40px;
      display: inline-block;
      font-size: 15px;
      color: @primaryTextColor;
      text-align: center;
      cursor: pointer;
      margin: 0 30px;
      transition: all 0.3s;

      &:hover {
        font-weight: 700;
      }

      &.active {
        font-weight: 700;
      }
    }
  }
}
</style>
