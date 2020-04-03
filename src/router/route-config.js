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
          path: '/index',
          component: () => import(/* webpackChunkName: "index" */ '@/views/index'),
          meta: {
            requirAuth: false,
          },
        },
      ],
    },
  ],
};
