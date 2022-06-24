import Vue from 'vue';
import axios from 'axios';

const { origin, pathname } = window.location;

const axiosConfig = {
    baseURL: `${origin}${pathname}requests/`,
    timeout: 30 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};
const Axios = axios.create(axiosConfig);
// 请求拦截
Axios.interceptors.request.use(
    (config) => {
        const timeStamp = window.SIB.formatDate(new Date(), 'YYYYMMDDhhmmss');
        // get请求增加时间戳，避免服务器304
        if (config.method === 'get') {
            config.params = {
                _t: timeStamp,
                ...config.params,
            };
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    },
);

// 响应拦截
Axios.interceptors.response.use(
    response => response,
    (error) => {
        const message = window.localStorage.getItem('lang') === 'en-US' ? 'Server internal exception' : '服务器内部异常';
        Vue.prototype.$message.error((error.data || {}).message || message);

        return Promise.reject(error);
    },
);

window.axios = Axios;
Vue.prototype.$http = Axios;
