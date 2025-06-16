import { request } from '@/utils/request'

type Result = {
  success: boolean
  data: Array<any>
}

/** 地图数据 */
export const mapJson = (params?: object) => {
  return request.get<Result>('/get-map-info', { params })
}

/** 文件上传 */
export const formUpload = (data) => {
  return request.post<Result>(
    'https://run.mocky.io/v3/3aa761d7-b0b3-4a03-96b3-6168d4f7467b',
    { data },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  )
}
