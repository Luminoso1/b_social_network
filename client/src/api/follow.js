import { fetchData } from '.'

export default class Follow {
  static async follow(id) {
    return fetchData('/follow', 'POST', { id })
  }

  static async unFollow(id) {
    return fetchData(`/unfollow/${id}`, 'DELETE')
  }

  static async getFollowers(nick) {
    return fetchData(`/user/${nick}/followers`, 'GET')
  }
  static async getFollowing(nick) {
    return fetchData(`/user/${nick}/following`, 'GET')
  }

  static async getFollow(url) {
    return fetchData(`${url}`, 'GET')
  }
}
