import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeColor: window.localStorage.getItem('theme-color'),
  },
  mutations: {
    setThemeColor(state, payload) {
      state.themeColor = payload;
    },
  },
  actions: {},
});
