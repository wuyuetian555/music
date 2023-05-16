import { onActivated } from 'vue';
import { useStore } from 'vuex';
import { useRoute, onBeforeRouteLeave } from 'vue-router';

export default () => {
  const store = useStore();
  const route = useRoute();
  onActivated(() => {
    const listDom = store.getters['user/GETSCROLLTOP'];
    const name = route.name;
    if (listDom.dom) {
      if (listDom.scroll[name]) {
        listDom.dom.scrollTop = listDom.scroll[name];
      } else {
        listDom.dom.scrollTop = 0;
      }
    }
  });

  onBeforeRouteLeave(() => {
    const name = route.name;
    const scrollTop = store.getters['user/GETSCROLLTOP'].dom.scrollTop;
    store.commit('user/getScrollTop', { name, scrollTop });
    store.commit('user/listenListScroll', 0);
  });
};
