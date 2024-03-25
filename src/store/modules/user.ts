import { defineStore } from 'pinia'
import { loginByPwd, getUserinfo } from '@/api/user'
import { LoginData } from '@/api/user/type'
import { setToken } from '@/utils/auth'

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

  function loadUserinfo() {
    return new Promise<void>((resolve, reject) => {
      getUserinfo()
        .then(res => {
          console.log(res)
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  return { login, loadUserinfo }
})
