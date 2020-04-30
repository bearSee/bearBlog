import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    themeColor: window.localStorage.getItem('theme-color'),
    cdn: `${window.location.protocol}//${window.location.host}/images/`,
    // 全局配置
    wholeConfig: null,
  },
  mutations: {
    setWholeConfig(state, payload) {
      state.wholeConfig = payload;
    },
    setThemeColor(state, payload) {
      state.themeColor = payload;
    },
  },
  actions: {},
});
