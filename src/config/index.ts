import axios from 'axios'
import type { App } from 'vue'

let config: object = {}
const { VITE_PUBLIC_PATH } = import.meta.env

const setConfig = (cfg?) => {
  config = Object.assign(config, cfg)
}

const getConfig = (key?: string): PlatformConfigs => {
  if (typeof key === 'string') {
    const arr = key.split('.')
    if (arr && arr.length) {
      let data = config
      arr.forEach((item) => {
        if (data && typeof data[item] !== 'undefined') {
          data = data[item]
        } else {
          data = null
        }
      })
      return data
    }
  }
  return config
}

export const getPlatformConfig = async (app: App): Promise<undefined> => {
  app.config.globalProperties.$config = getConfig()
  return axios({
    method: 'get',
    url: `${VITE_PUBLIC_PATH}platform-config.json`,
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config
      // 自动注入系统配置
      if (app && $config && typeof config === 'object') {
        $config = Object.assign($config, config)
        app.config.globalProperties.$config = $config
        // 设置全局配置
        setConfig($config)
      }
      return $config
    })
    .catch(() => {
      throw '请在 public 文件夹下添加 platform-config.json 配置文件'
    })
}

/** 本地响应式存储的命名空间 */
const responsiveStorageNameSpace = () => getConfig().ResponsiveStorageNameSpace

export { getConfig, setConfig, responsiveStorageNameSpace }
