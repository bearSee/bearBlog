import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeColor: window.localStorage.getItem('theme-color'),
    cdn: `${window.location.protocol}//${window.location.host}/images/`,
    menuConfig: null,
  },
  mutations: {
    setMenuConfig(state, payload) {
      state.menuConfig = payload;
    },
    setThemeColor(state, payload) {
      state.themeColor = payload;
    },
  },
  actions: {},
});
