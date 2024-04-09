import routesList from './routesList'
import type { MockConfig } from 'vite-plugin-mock'
export default (config?: MockConfig) => {
  return [
    {
      url: '/sys/login',
      method: 'post',
      response: () => {
        return {
          code: 200,
          message: 'ok',
          data: {
            accessToken:
              'eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInVzZXJJZCI6IjAiLCJuYW1lIjoi566h55CG5ZGYIiwicm9sZXMiOiIxIiwiZXhwIjoxNzExMDI5MTI0fQ.B-smjAkEuq__zVFtcrhP7BaHvQvIiPxYu7UxaZWJNNzCSGsnMJ5MA5I2fLyIvl5uYXW6wO6bVs5s2GGYVwaPpYZsCNO1lO6-Scob6BQLZ0KZH4yHGruG4LdbkformuXnieDQDrXjrxliRsDJVvfnNUkvgHRBtNec8WH8RvQjoVQ'
          }
        }
      }
    },

    {
      url: '/sys/userinfo',
      method: 'get',
      response: () => {
        return {
          code: 200,
          message: 'ok',
          data: {
            userId: 2,
            username: 'admin',
            nickname: '系统管理员',
            avatar: 'https://oss.youlai.tech/youlai-boot/2023/05/16/811270ef31f548af9cffc026dfc3777b.gif',
            roles: ['all']
          }
        }
      }
    },
    {
      url: '/sys/routesList',
      method: 'get',
      response: () => {
        return {
          code: 200,
          message: 'ok',
          data: routesList
        }
      }
    }
  ]
}
