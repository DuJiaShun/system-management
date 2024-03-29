import { defineStore } from 'pinia'
import { loginByPwd, getUserinfo } from '@/api/user'
import { LoginData } from '@/api/user/type'
import { getToken, removeToken } from '@/utils/auth'
import { setToken } from '@/utils/auth'
import { Userinfo } from '@/api/user/type'

export const useUserStore = defineStore('user', () => {
  // 登录
  function login(params: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginByPwd(params)
        .then(res => {
          const { accessToken } = res.data
          setToken('', accessToken)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 获取用户信息
  let userinfo = ref<Userinfo>()
  function loadUserinfo() {
    return new Promise<void>((resolve, reject) => {
      getUserinfo()
        .then(({ data }) => {
          userinfo.value = data
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 删除 token
  function resetToken() {
    return new Promise<void>(resolve => {
      removeToken()
      resolve()
    })
  }
  return { login, userinfo, loadUserinfo, resetToken }
})
