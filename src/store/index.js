import { createStore } from 'vuex';
import musicplay from './modules/musicplay';
import singer from './modules/singer';
import user from './modules/user';
import search from './modules/search';
import color from './modules/color';
export default createStore({
  modules: {
    musicplay,
    singer,
    user,
    search,
    color
  }
});
