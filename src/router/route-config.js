/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-04-01 18:55:22
 * @LastEditTime: 2019-08-15 10:30:03
 * @LastEditors: Please set LastEditors
 */
export default {
    routes: [
        {
            path: '/',
            redirect: '/index',
            component: () => import(/* webpackChunkName: "master" */ '@/views/master'),
            children: [
                {
                    name: 'index',
                    path: '/index',
                    component: () => import(/* webpackChunkName: "index" */ '@/views/index'),
                },
                {
                    name: 'userCenter',
                    path: '/userCenter',
                    component: () => import(/* webpackChunkName: "userCenter" */ '@/views/userCenter/index'),
                },
                {
                    name: 'memories',
                    path: '/memories',
                    component: () => import(/* webpackChunkName: "memories" */ '@/views/memories/index'),
                },
                {
                    name: 'diaries',
                    path: '/diaries',
                    component: () => import(/* webpackChunkName: "diaries" */ '@/views/diaries/index'),
                },
            ],
        },
    ],
};
