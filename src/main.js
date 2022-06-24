import Vue from 'vue';
// 引入 sibionics-ui 框架
import sibUI from 'sibionics-ui';
import App from './App';
import router from './router';
import store from './store';
import cn from './locale/lang/cn';
import en from './locale/lang/en';

// 引入插件集合
import './plugins';

// 引入样式表集合
import './assets/styles';

Vue.use(sibUI, {
    languages: { 'zh-CN': cn, 'en-US': en },
    lang: window.localStorage.getItem('lang') || 'zh-CN',
    // size: 'mini',
});

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#bear');
