import { defineStore } from 'pinia'
import { type userType, store, router, resetRouter, routerArrays, storageLocal } from '../utils'
import { type UserResult, type RefreshTokenResult, getLogin, refreshTokenApi } from '@/api/user'
import { useMultiTagsStoreHook } from './multiTags'
import { type DataInfo, setToken, removeToken, userKey } from '@/utils/auth'

export const useUserStore = defineStore('user', {
  state: (): userType => ({
    // 头像
    avatar: storageLocal.get<DataInfo<number>>(userKey)?.avatar ?? '',
    // 用户名
    username: storageLocal.get<DataInfo<number>>(userKey)?.username ?? '',
    // 昵称
    nickname: storageLocal.get<DataInfo<number>>(userKey)?.nickname ?? '',
    // 页面级别权限
    roles: storageLocal.get<DataInfo<number>>(userKey)?.roles ?? [],
    // 按钮级别权限
    permissions: storageLocal.get<DataInfo<number>>(userKey)?.permissions ?? [],
    // 前端生成的验证码（按实际需求替换）
    verifyCode: '',
    // 判断登录页面显示哪个组件（0：登录（默认）、1：手机登录、2：二维码登录、3：注册、4：忘记密码）
    currentPage: 0,
    // 是否勾选了登录页的免登录
    isRemembered: false,
    // 登录页的免登录存储几天，默认7天
    loginDay: 7,
  }),
  actions: {
    /** 存储头像 */
    SET_AVATAR(avatar: string) {
      this.avatar = avatar
    },
    /** 存储用户名 */
    SET_USERNAME(username: string) {
      this.username = username
    },
    /** 存储昵称 */
    SET_NICKNAME(nickname: string) {
      this.nickname = nickname
    },
    /** 存储角色 */
    SET_ROLES(roles: Array<string>) {
      this.roles = roles
    },
    /** 存储按钮级别权限 */
    SET_PERMS(permissions: Array<string>) {
      this.permissions = permissions
    },
    /** 存储前端生成的验证码 */
    SET_VERIFYCODE(verifyCode: string) {
      this.verifyCode = verifyCode
    },
    /** 存储登录页面显示哪个组件 */
    SET_CURRENTPAGE(value: number) {
      this.currentPage = value
    },
    /** 存储是否勾选了登录页的免登录 */
    SET_ISREMEMBERED(bool: boolean) {
      this.isRemembered = bool
    },
    /** 设置登录页的免登录存储几天 */
    SET_LOGINDAY(value: number) {
      this.loginDay = Number(value)
    },
    /** 登入 */
    async loginByUsername(data) {
      return new Promise<UserResult>((resolve, reject) => {
        getLogin(data)
          .then((data) => {
            if (data?.success) setToken(data.data)
            resolve(data)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    /**
     * 用户登出方法
     * 清除用户信息、权限数据、token，重置路由并跳转到登录页
     */
    logOut() {
      this.username = ''
      this.roles = []
      this.permissions = []
      removeToken()
      useMultiTagsStoreHook().handleTags('equal', [...routerArrays])
      resetRouter()
      router.push('/login')
    },

    /**
     * 处理刷新令牌的逻辑
     * @param data 刷新令牌所需的参数
     * @returns Promise<RefreshTokenResult> 返回包含新令牌的Promise对象
     * @throws 当刷新令牌失败时抛出错误
     */
    async handRefreshToken(data) {
      return new Promise<RefreshTokenResult>((resolve, reject) => {
        refreshTokenApi(data)
          .then((data) => {
            if (data) {
              setToken(data.data)
              resolve(data)
            }
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
  },
})
