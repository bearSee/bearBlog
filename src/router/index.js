import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routeConfig from './route-config';

Vue.use(Router);
const router = new Router(routeConfig);
router.beforeEach(async (to, from, next) => {
  document.body.scrollTop = 0;
  if (!store.state.menuConfig) {
    await Vue.prototype.$http.get('master/menuConfig.json').then(({ data }) => {
      data = data || {};
      store.commit('setMenuConfig', data);
      const componentStyle = document.createElement('style');
      componentStyle.innerText = `:root {--bgColor:${data.backgroundColor || '#545c64'}}`;
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
