import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from 'axios'
import type {
  PureHttpError,
  RequestMethods,
  PureHttpResponse,
  PureHttpRequestConfig,
} from './types.d'
import { stringify } from 'qs'
import NProgress from '../progress'
import { getToken, formatToken } from '@/utils/auth'
import { useUserStoreHook } from '@/stores/modules/user'

const defaultConfig: AxiosRequestConfig = {
  timeout: 10 * 1000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json;charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class Request {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** `token`过期后，暂存待执行的请求 */
  private static requests = []

  /** 防止重复刷新`token` */
  private static isRefreshing = false

  /** 初始化配置对象 */
  private static initConfig: PureHttpRequestConfig = {}

  /** 保存当前`Axios`实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** 重连原始请求 */
  private static retryOriginalRequest(
    config: PureHttpRequestConfig,
  ): Promise<AxiosRequestConfig<any>> {
    return new Promise((resolve) => {
      Request.requests.push((token: string) => {
        config.headers['Authorization'] = formatToken(token)
        resolve(config)
      })
    })
  }

  /** 请求拦截器 */
  private httpInterceptorsRequest(): void {
    Request.axiosInstance.interceptors.request.use(
      async (config: PureHttpRequestConfig): Promise<any> => {
        NProgress.start()

        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return config
        }

        if (Request.initConfig.beforeRequestCallback) {
          Request.initConfig.beforeRequestCallback(config)
          return config
        }

        /** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
        const whiteList = ['/refresh-token', '/login']
        let isWhiteListUrl = false
        for (const url of whiteList) {
          if (config.url.endsWith(url)) {
            isWhiteListUrl = true
            break
          }
        }

        return new Promise((resolve, reject) => {
          if (isWhiteListUrl) {
            resolve(config)
          } else {
            const data = getToken()
            if (data) {
              const now = new Date().getTime()
              const expired = Number(data.expires) - now <= 0

              if (expired) {
                if (!Request.isRefreshing) {
                  Request.isRefreshing = true
                  useUserStoreHook()
                    .handRefreshToken({ refreshToken: data.refreshToken })
                    .then((res) => {
                      const token = res.data.accessToken
                      config.headers['Authorization'] = formatToken(token)
                      Request.requests.forEach((cb) => cb(token))
                      Request.requests = []
                      resolve(config)
                    })
                    .catch((err) => {
                      reject(err)
                    })
                    .finally(() => {
                      Request.isRefreshing = false
                    })
                } else {
                  // 如果正在刷新token，则暂存请求
                  Request.requests.push((token: string) => {
                    config.headers['Authorization'] = formatToken(token)
                    resolve(config)
                  })
                }
              } else {
                config.headers['Authorization'] = formatToken(data.accessToken)
                resolve(config)
              }
            } else {
              resolve(config)
            }
          }
        })
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Request.axiosInstance
    instance.interceptors.response.use(
      (response: PureHttpResponse) => {
        const $config = response.config
        // 关闭进度条动画
        NProgress.done()

        // 优先判断post/get等方法是否传入回调，否则执行初始化设置等回调
        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }

        if (Request.initConfig.beforeResponseCallback) {
          Request.initConfig.beforeResponseCallback(response)
          return response.data
        }

        return response.data
      },
      (error: PureHttpError) => {
        const $error = error
        $error.isCancelRequest = Axios.isCancel($error)
        // 关闭进度条动画
        NProgress.done()
        // 所有的响应异常 区分来源为取消请求/非取消请求
        return Promise.reject($error)
      },
    )
  }

  /** 通用请求工具函数 */
  public MyRequest<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
      ...axiosConfig,
    } as PureHttpRequestConfig

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      Request.axiosInstance
        .request(config)
        .then((response: undefined) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /** 单独抽离的 post 工具函数 */
  public post<T, P = any>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig,
  ): Promise<T> {
    return this.MyRequest<T>('post', url, params, config)
  }

  /** 单独抽离的 get 工具函数 */
  public get<T, P = any>(
    url: string,
    params?: AxiosRequestConfig<P>,
    config?: PureHttpRequestConfig,
  ): Promise<T> {
    return this.MyRequest<T>('get', url, params, config)
  }
}

export const request = new Request()
