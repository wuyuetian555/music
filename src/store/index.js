import { createStore } from "vuex";
import musicplay from "./modules/musicplay";
import singer from "./modules/singer";
import user from "./modules/user";
import search from "./modules/search";
export default createStore({
  modules: {
    musicplay,
    singer,
    user,
    search,
  },
});
