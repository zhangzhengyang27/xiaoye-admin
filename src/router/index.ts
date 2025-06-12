import { type Router, type RouteRecordRaw, type RouteComponent, createRouter, createWebHistory } from 'vue-router'
import login from '../views/login/index.vue'

export const router: Router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: login,
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
