import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken(key?: string) {
  return Cookies.get(key || TokenKey)
}

export function setToken(key: string, token: string) {
  return Cookies.set(key || TokenKey, token)
}

export function removeToken(key?: string) {
  return Cookies.remove(key || TokenKey)
}