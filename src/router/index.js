import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routeConfig from './route-config';

Vue.use(Router);
const router = new Router(routeConfig);
router.beforeEach(async (to, from, next) => {
  document.body.scrollTop = 0;
  if (!store.state.wholeConfig) {
    await Vue.prototype.$http.get('configData.json').then(({ data }) => {
      data = data || {};
      store.commit('setWholeConfig', data);
      const componentStyle = document.createElement('style');
      componentStyle.innerText = `:root {--bgColor:${data.menuConfig && data.menuConfig.backgroundColor || '#545c64'}}`;
      document.head.appendChild(componentStyle);
    });
  }
  next();
});

export function resetRouter() {
  const newRouter = new Router(routeConfig);
  router.matcher = newRouter.matcher;
}

export default router;
