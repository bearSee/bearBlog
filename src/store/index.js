import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const resetTheme = (state) => {
    const { themeColor, backgroundColor } = state;
    let componentStyle = document.getElementById('theme-style');
    if (!componentStyle) {
        componentStyle = document.createElement('style');
        componentStyle.id = 'theme-style';
        document.head.appendChild(componentStyle);
    }
    componentStyle.innerText = `:root {
      --theme:${themeColor}!important;
      --bgColor:${backgroundColor}!important;
    }`;
};

export default new Vuex.Store({
    state: {
        themeColor: '',
        backgroundColor: '',
        backgroundImage: '',
        config: null,
    },
    mutations: {
        setConfig(state, payload) {
            state.config = payload;
            ['themeColor', 'backgroundColor', 'backgroundImage'].forEach((d) => {
                const value = window.localStorage.getItem(d) || payload[d === 'themeColor' ? 'defaultThemeColor' : d] || '';
                window.localStorage.setItem(d, value);
                state[d] = value;
                state.config[d] = value;
            });
            resetTheme(state);
        },
        setThemeColor(state, payload) {
            state.themeColor = payload;
            window.localStorage.setItem('themeColor', payload);
            resetTheme(state);
        },
        setBackgroundColor(state, payload) {
            state.backgroundColor = payload;
            window.localStorage.setItem('backgroundColor', payload);
            resetTheme(state);
        },
        setBackgroundImage(state, payload) {
            state.backgroundImage = payload;
            window.localStorage.setItem('backgroundImage', payload);
        },
    },
    actions: {
        getConfig({ commit, dispatch }) {
            Vue.prototype.$http.get('config.json').then(({ data = {} }) => {
                commit('setConfig', data);
                Vue.prototype.$nextTick(() => {
                    dispatch('resetGlobalThemeColor');
                });
            });
        },
        resetGlobalThemeColor({ state, commit }, color) {
            const [last, current] = [color && state.themeColor || state.config.defaultThemeColor, color || state.themeColor];
            if (last === current) return;
            if (color) commit('setThemeColor', color);
            const styles = Array.from(document.querySelectorAll('style')).filter(style => new RegExp(last, 'i').test(style.innerText));
            styles.forEach((style) => {
                style.innerText = style.innerText.replace(new RegExp(last, 'ig'), current);
            });
        },
    },
});
