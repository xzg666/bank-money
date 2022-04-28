import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function setUserName(userName) {
  return Cookies.set('userName', userName)
}
export function getUserName() {
  return Cookies.get('userName')
}
export function removeUserName() {
  return Cookies.remove('userName')
}
