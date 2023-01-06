import { createRouter, createWebHashHistory } from "vue-router";
import store from "../store";
const Layout = () => import("../views/Layout.vue");
const Home = () => import("../views/home/index.vue");
const SongList = () => import("../views/songList/index.vue");
const Search = () => import("../views/search");
const Like = () => import("../views/user/like");
const Played = () => import("../views/user/played");
const UserSongList = () => import("../views/user/songlist");
const SingerList = () => import("../views/singer/index.vue");
const SingerDetail = () => import("../views/singerDetail/index.vue");
const Album = () => import("../views/album/index.vue");
const Mv = () => import("../views/mv/index.vue");
const Set = () => import("../views/set/index.vue");
const routes = [
  {
    path: "/",
    component: Layout,
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: Home,
        name: "Home",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/songList/:musiclistid",
        component: SongList,
        name: "SongList",
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/singerList",
        component: SingerList,
        name: "SingerList",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/search",
        component: Search,
        name: "Search",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/user/like",
        component: Like,
        name: "Like",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/user/played",
        component: Played,
        name: "Played",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/user/songlist",
        component: UserSongList,
        name: "UserSongList",
        meta: {
          keepAlive: true,
        },
      },

      {
        path: "/singerDetail/:singerId",
        component: SingerDetail,
        name: "SingerDetail",
        meta: {
          keepAlive: true,
        },
      },
      {
        path: "/album/:albumId",
        component: Album,
        name: "Album",
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/mv/:mvId",
        component: Mv,
        name: "Mv",
        meta: {
          keepAlive: false,
        },
      },
      {
        path: "/set",
        component: Set,
        name: "Set",
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name == "SingerDetail" && !savedPosition) {
      let listDom = store.getters["user/GETSCROLLTOP"];
      listDom.dom.scrollTop = 0;
    } else if (to.name == "SingerDetail" && savedPosition) {
      let listDom = store.getters["user/GETSCROLLTOP"];
      let name = to.name;
      if (!listDom.dom) {
        return;
      } else if (listDom.scroll[name]) {
        listDom.dom.scrollTop = listDom.scroll[name];
      } else if (!listDom.scroll[name]) {
        listDom.dom.scrollTop = 0;
      }
    }
  },
});
router.beforeEach((to, from, next) => {
  next();
});

export default router;
