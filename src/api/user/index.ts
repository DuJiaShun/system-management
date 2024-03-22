// import request from '../../utils/request'
import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { LoginData, LoginResult } from './type'

export function loginByPwd(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}