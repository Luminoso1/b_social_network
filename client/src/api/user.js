import { fetchData } from '.'

export default class User {
  static async register(data) {
    return fetchData('/register', 'POST', data)
  }

  static async login(data) {
    return fetchData('/login', 'POST', data)
  }

  static async logout() {
    return fetchData('/logout', 'GET')
  }

  static async profile() {
    return fetchData('/profile', 'GET')
  }

  static async getUser(id) {
    return fetchData(`/users/${id}`, 'GET')
  }

  static async getProfile(nick) {
    return fetchData(`/user/${nick}`, 'GET')
  }

  static update(data) {
    return fetchData('/user/update', 'PUT', data)
  }
}
