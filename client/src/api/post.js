import { fetchData } from '.'

export default class Post {
  static async getAll(page) {
    return fetchData(`/posts?page=${page || 1}`, 'GET')
  }

  static async getPostByNick(nick, page) {
    return fetchData(`/user/${nick}/posts?page=${page}`, 'GET')
  }

  static async create(data) {
    return fetchData('/post', 'POST', data)
  }

  static async delete(id) {
    return fetchData(`/posts/${id}`, 'DELETE')
  }
}
