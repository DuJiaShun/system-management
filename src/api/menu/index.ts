import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { Routes } from './types'

// 获取路由
export function getRoutesList(): AxiosPromise<Routes[]> {
  return request({
    url: '/sys/routesList',
    method: 'get',
  })
}