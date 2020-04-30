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
      meta: {
        keepAlive: false,
        requirAuth: false,
      },
      children: [
        {
          name: 'index',
          path: '/index',
          component: () => import(/* webpackChunkName: "index" */ '@/views/index'),
          meta: {
            requirAuth: false,
            keepAlive: true,
          },
        },
        {
          name: 'userCenter',
          path: '/userCenter',
          component: () => import(/* webpackChunkName: "userCenter" */ '@/views/userCenter/index'),
          meta: {
            requirAuth: false,
          },
        },
        {
          name: 'memories',
          path: '/memories',
          component: () => import(/* webpackChunkName: "memories" */ '@/views/memories/index'),
          meta: {
            requirAuth: false,
          },
        },
        {
          name: 'diaries',
          path: '/diaries',
          component: () => import(/* webpackChunkName: "diaries" */ '@/views/diaries/index'),
          meta: {
            requirAuth: false,
          },
        },
      ],
    },
  ],
};
