import { onActivated } from "vue";
import { useStore } from "vuex";
import { useRoute, onBeforeRouteLeave } from "vue-router";

export default () => {
  const store = useStore();
  const route = useRoute();
  onActivated(() => {
    let listDom = store.getters["user/GETSCROLLTOP"];
    let name = route.name;
    if (!listDom.dom) {
      return;
    } else if (listDom.scroll[name]) {
      listDom.dom.scrollTop = listDom.scroll[name];
    } else if (!listDom.scroll[name]) {
      listDom.dom.scrollTop = 0;
    }
  });

  onBeforeRouteLeave(() => {
    const name = route.name;
    let scrollTop = store.getters["user/GETSCROLLTOP"].dom.scrollTop;
    store.commit("user/getScrollTop", { name, scrollTop });
    store.commit("user/listenListScroll", 0);
  });
};
