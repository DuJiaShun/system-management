export interface LoginData {
  username: string
  password: string
}

export interface LoginResult {
  accessToken: string
  tokenType: string
}

export interface Userinfo {
  userId: number
  username: string
  nickname: string
  avatar: string
  roles: string[] // string元素组成的数组
}