import type { Method, AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'

export type resultType = {
  accessToken?: string
}

/**
 * 定义支持的HTTP请求方法类型
 *
 * 从Method类型中提取出'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'这些方法
 */
export type RequestMethods = Extract<Method, 'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'>

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: PureHttpRequestConfig) => void
  beforeResponseCallback?: (response: PureHttpResponse) => void
}

export default class PureHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig,
  ): Promise<T>
  post<T, P>(url: string, params?: P, config?: PureHttpRequestConfig): Promise<T>
  get<T, P>(url: string, params?: P, config?: PureHttpRequestConfig): Promise<T>
}
