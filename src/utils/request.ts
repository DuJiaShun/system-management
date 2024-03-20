import axios, { InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    console.log(config)
    return config
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response: AxiosResponse) => {
    console.log(response)
    return response
  },
  (error: any) => {
    console.log(error)
    return Promise.reject(error)
  }
)

export default service
