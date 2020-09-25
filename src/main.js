import Vue from 'vue';
import App from './App';
import './plugins/cookies';
import './plugins/axios';
import './plugins/element';
import router from './router/index';
import store from './store';
import i18n from './i18n';

Vue.config.productionTip = false;
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app');
