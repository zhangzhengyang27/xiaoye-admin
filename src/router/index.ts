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
        {
          path: '/components/drawer',
          name: 'DrawerPage',
          component: () => import('@/views/components/drawer/index.vue'),
          meta: {
            title: '函数式抽屉',
          },
        },
        {
          path: '/components/message',
          name: 'Message',
          component: () => import('@/views/components/message.vue'),
          meta: {
            title: '消息提示',
          },
        },
        {
          path: '/components/upload',
          name: 'PureUpload',
          component: () => import('@/views/components/upload/index.vue'),
          meta: {
            title: '文件上传',
          },
        },
        {
          path: '/components/check-card',
          name: 'CheckCard',
          component: () => import('@/views/components/check-card.vue'),
          meta: {
            title: '多选卡片',
          },
        },
        {
          path: '/components/date-picker',
          name: 'DatePicker',
          component: () => import('@/views/components/date-picker.vue'),
          meta: {
            title: '日期选择器',
          },
        },
        {
          path: '/components/datetime-picker',
          name: 'DateTimePicker',
          component: () => import('@/views/components/datetime-picker.vue'),
          meta: {
            title: '日期时间选择器',
          },
        },
        {
          path: '/components/time-picker',
          name: 'TimePicker',
          component: () => import('@/views/components/time-picker.vue'),
          meta: {
            title: '时间选择器',
          },
        },
        {
          path: '/components/icon-select',
          name: 'IconSelect',
          component: () => import('@/views/components/icon-select.vue'),
          meta: {
            title: '图标选择器',
          },
        },
        {
          path: '/components/animatecss',
          name: 'AnimateCss',
          component: () => import('@/views/components/animatecss/index.vue'),
          meta: {
            title: 'animate.css 选择器',
          },
        },
        {
          path: '/components/cropping',
          name: 'Cropping',
          component: () => import('@/views/components/cropping.vue'),
          meta: {
            title: '图片裁剪',
          },
        },
        {
          path: '/components/segmented',
          name: 'Segmented',
          component: () => import('@/views/components/segmented.vue'),
          meta: {
            title: '分段控制器',
          },
        },
        {
          path: '/components/text',
          name: 'PureText',
          component: () => import('@/views/components/text.vue'),
          meta: {
            title: '文本省略',
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
