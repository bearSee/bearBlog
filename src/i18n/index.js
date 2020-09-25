import Vue from 'vue';
import Element from 'element-ui';
import VueI18n from 'vue-i18n';
import enLocale from 'element-ui/lib/locale/lang/en';
import zhLocale from 'element-ui/lib/locale/lang/zh-CN';
import en from './en';
import cn from './cn';

Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: Vue.prototype.$cookies.get('user_language') || 'zh-CN',
  messages: {
    'en-US': {
      ...enLocale,
      ...en,
    },
    'zh-CN': {
      ...zhLocale,
      ...cn,
    },
  },
});

Vue.use(Element, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small',
});

export default i18n;
