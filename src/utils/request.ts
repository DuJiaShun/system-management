import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'
import { getToken } from '@/utils/auth'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.headers['X-Token'] = getToken()
    return config
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code } = response.data
    if (code === 200) {
      return response.data
    }
    return response
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
