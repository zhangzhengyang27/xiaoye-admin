import Cookies from 'js-cookie'
import { useUserStoreHook } from '@/stores/modules/user'

import { storageLocal } from '@/utils/storage'
import { isString } from '@/utils/is'
import { arrayContainsAll } from '@/utils/common'

/**
 * 用户认证数据信息接口
 *
 * @template T - 过期时间字段类型（通常为number时间戳）
 * @property {string} accessToken - 用户访问令牌
 * @property {T} expires - accessToken过期时间（时间戳格式）
 * @property {string} refreshToken - 用于刷新accessToken的令牌
 * @property {string} [avatar] - 用户头像URL（可选）
 * @property {string} [username] - 用户名（可选）
 * @property {string} [nickname] - 用户昵称（可选）
 * @property {Array<string>} [roles] - 用户角色数组（可选）
 * @property {Array<string>} [permissions] - 用户按钮权限数组（可选）
 */
export interface DataInfo<T> {
  accessToken: string
  expires: T
  refreshToken: string
  avatar?: string
  username?: string
  nickname?: string
  roles?: Array<string>
  permissions?: Array<string>
}

export const userKey = 'user-info'
export const TokenKey = 'authorized-token'

/**
 * 通过`multiple-tabs`是否在`cookie`中，判断用户是否已经登录系统，
 * 从而支持多标签页打开已经登录的系统后无需再登录。
 * 浏览器完全关闭后`multiple-tabs`将自动从`cookie`中销毁，
 * 再次打开浏览器需要重新登录系统
 * */
export const multipleTabsKey = 'multiple-tabs'

/** 获取token */
export function getToken(): DataInfo<number> {
  return Cookies.get(TokenKey) ? JSON.parse(Cookies.get(TokenKey)) : storageLocal.get(userKey)
}

/**
 * @description 设置`token`以及一些必要信息并采用无感刷新`token`方案
 * 无感刷新：后端返回`accessToken`（访问接口使用的`token`）、`refreshToken`（用于调用刷新`accessToken`的接口时所需的`token`，`refreshToken`的过期时间（比如30天）应大于`accessToken`的过期时间（比如2小时））、`expires`（`accessToken`的过期时间）
 * 将`accessToken`、`expires`、`refreshToken`这三条信息放在key值为authorized-token的cookie里（过期自动销毁）
 * 将`avatar`、`username`、`nickname`、`roles`、`permissions`、`refreshToken`、`expires`这七条信息放在key值为`user-info`的localStorage里（利用`multipleTabsKey`当浏览器完全关闭后自动销毁）
 */
export function setToken(data: DataInfo<Date>) {
  let expires = 0
  const { accessToken, refreshToken } = data
  const { isRemembered, loginDay } = useUserStoreHook()

  // 如果后端直接设置时间戳，将此处代码改为 expires = data.expires，然后把上面的DataInfo<Date>改成DataInfo<number>即可
  expires = new Date(data.expires).getTime()
  const cookieString = JSON.stringify({ accessToken, expires, refreshToken })

  Cookies.set(TokenKey, cookieString, {
    expires: expires > 0 ? (expires - Date.now()) / 86400000 : undefined,
  })

  Cookies.set(multipleTabsKey, 'true', {
    expires: isRemembered ? loginDay : undefined,
  })

  function setUserKey({ avatar, username, nickname, roles, permissions }) {
    useUserStoreHook().SET_AVATAR(avatar)
    useUserStoreHook().SET_USERNAME(username)
    useUserStoreHook().SET_NICKNAME(nickname)
    useUserStoreHook().SET_ROLES(roles)
    useUserStoreHook().SET_PERMS(permissions)
    storageLocal.set(userKey, {
      refreshToken,
      expires,
      avatar,
      username,
      nickname,
      roles,
      permissions,
    })
  }

  if (data.username && data.roles) {
    const { username, roles } = data
    setUserKey({
      avatar: data?.avatar ?? '',
      username,
      nickname: data?.nickname ?? '',
      roles,
      permissions: data?.permissions ?? [],
    })
  } else {
    const avatar = storageLocal.get<DataInfo<number>>(userKey)?.avatar ?? ''
    const username = storageLocal.get<DataInfo<number>>(userKey)?.username ?? ''
    const nickname = storageLocal.get<DataInfo<number>>(userKey)?.nickname ?? ''
    const roles = storageLocal.get<DataInfo<number>>(userKey)?.roles ?? []
    const permissions = storageLocal.get<DataInfo<number>>(userKey)?.permissions ?? []
    setUserKey({
      avatar,
      username,
      nickname,
      roles,
      permissions,
    })
  }
}

/** 删除`token`以及key值为`user-info`的localStorage信息 */
export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(multipleTabsKey)
  storageLocal.remove(userKey)
}

/** 格式化token（jwt格式） */
export const formatToken = (token: string): string => {
  return 'Bearer ' + token
}

/** 是否有按钮级别的权限（根据登录接口返回的`permissions`字段进行判断）*/
/**
 * 检查用户是否拥有指定权限
 * @param value - 单个权限字符串或权限数组
 * @returns 返回布尔值，表示用户是否拥有全部指定权限
 * @example
 * hasPerms('system:user:add') // 检查单个权限
 * hasPerms(['system:user:add', 'system:user:edit']) // 检查多个权限
 */
export const hasPerms = (value: string | string[]): boolean => {
  if (!value) return false

  const { permissions } = useUserStoreHook()
  if (!permissions?.length) return false

  // 如果拥有通配权限，则直接返回 true
  if (permissions.includes('*:*:*')) return true

  // 判断是否包含指定权限
  return isString(value) ? permissions.includes(value) : arrayContainsAll(permissions, value)
}
