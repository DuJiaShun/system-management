import { defineStore } from 'pinia'
import { loginByPwd } from '@/api/user'
import { LoginData } from '@/api/user/type'
import { setToken } from '@/utils/auth'
import router from "@/router"

export const useUserStore = defineStore('user', () => {
  // 登录
  function login(params: LoginData) {
    return new Promise<void>((resolve, reject) => {
      loginByPwd(params)
        .then(res => {
          const { accessToken } = res.data
          setToken('', accessToken)
          ElMessage.success('登录成功')
          router.push({name: 'Home'})
          resolve()
        })
        .catch(error => {
          reject(error)
        })
    })
  }
  return { login }
})
