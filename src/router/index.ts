import { type Router, type RouteRecordRaw, type RouteComponent, createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/index.vue'
import Layout from '@/layout/index.vue'
import Welcome from '@/views/welcome/index.vue'

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/',
      name: 'Home',
      component: Layout,
      redirect: '/welcome',
      meta: {
        icon: 'ep/home-filled',
        title: '首页',
      },
      children: [
        {
          path: '/welcome',
          name: 'Welcome',
          component: () => import('@/views/welcome/index.vue'),
          meta: {
            title: '首页',
            showLink: true,
          },
        },
      ],
    },
    {
      path: '/components',
      redirect: '/components/dialog',
      meta: {
        icon: 'ep/menu',
        title: '组件',
      },
      children: [
        {
          path: '/components/dialog',
          name: 'DialogPage',
          component: () => import('@/views/components/dialog/index.vue'),
          meta: {
            title: '函数式弹窗',
          },
        },
      ],
    },
  ],
})

/**
 * 重置路由
 */
export function resetRouter() {}

/**
 * 用于渲染菜单，保持原始层级
 */
export const constantMenus = () => {}

/**
 * 不参与菜单的路由
 */
export const remainingPaths = () => {}

export default router
