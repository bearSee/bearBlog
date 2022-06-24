import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import routeConfig from './route-config';

Vue.use(Router);

const router = new Router(routeConfig);

router.beforeEach(async (to, from, next) => {
    document.body.scrollTop = 0;
    if (!store.state.config) await store.dispatch('getConfig');
    next();
});

export default router;
