import { request } from '@/utils/request'

export type UserResult = {
  success: boolean
  data: {
    avatar: string
    username: string
    nickname: string
    roles: Array<string>
    permissions: Array<string>
    accessToken: string
    refreshToken: string
    expires: Date
  }
}

/**
 * 刷新令牌返回结果类型
 * @property {boolean} success - 请求是否成功
 * @property {Object} data - 令牌数据
 * @property {string} data.accessToken - 访问令牌
 * @property {string} data.refreshToken - 用于刷新访问令牌的令牌
 * @property {Date} data.expires - 访问令牌过期时间（格式'xxxx/xx/xx xx:xx:xx'）
 */
export type RefreshTokenResult = {
  success: boolean
  data: {
    accessToken: string
    refreshToken: string
    expires: Date
  }
}

/**
 * 用户信息类型定义
 *
 * @property avatar - 用户头像 URL
 * @property username - 用户名（登录账号）
 * @property nickname - 用户昵称/显示名称
 * @property email - 电子邮箱地址
 * @property phone - 联系电话号码
 * @property description - 用户个人简介/描述
 */
export type UserInfo = {
  avatar: string
  username: string
  nickname: string
  email: string
  phone: string
  description: string
}

export type UserInfoResult = {
  success: boolean
  data: UserInfo
}

/**
 * 表格数据返回类型
 * @property success - 请求是否成功
 * @property data - 表格数据
 * @property data.list - 列表数据数组
 * @property data.total - 数据总条目数(可选)
 * @property data.pageSize - 每页显示条目数(可选)
 * @property data.currentPage - 当前页码(可选)
 */
type ResultTable = {
  success: boolean
  data?: {
    list: Array<any>
    total?: number
    pageSize?: number
    currentPage?: number
  }
}

/** 登录 */
export const getLogin = (data?: object) => {
  return request.post<UserResult>('/login', { data })
}

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return request.post<RefreshTokenResult>('/refresh-token', { data })
}

/** 账户设置-个人信息 */
export const getMine = (data?: object) => {
  return request.get<UserInfoResult>('/mine', { data })
}

/** 账户设置-个人安全日志 */
export const getMineLogs = (data?: object) => {
  return request.get<ResultTable>('/mine-logs', { data })
}
