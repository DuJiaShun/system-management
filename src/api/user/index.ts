import request from '@/utils/request'
import { AxiosPromise } from 'axios'
import { LoginData, LoginResult, Userinfo } from './type'


// 账号密码登录
export function loginByPwd(data: LoginData): AxiosPromise<LoginResult> {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserinfo(): AxiosPromise<Userinfo> {
  return request({
    url: '/sys/userinfo',
    method: 'get',
  })
}