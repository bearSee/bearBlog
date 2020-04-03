

export default {
  data() {
    return {
      langs: [
        {
          label: '中文',
          value: 'zh-CN',
          suffix: 'cn',
        },
        {
          label: 'English',
          value: 'en-US',
          suffix: 'en',
        },
      ],
    };
  },
  methods: {
    toSwitchLanguage(val) {
      this.$i18n.locale = val;
      window.localStorage.setItem('user_language', val);
      // location.reload();
    },
  },
};
