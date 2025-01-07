/**
 *
 */
export class LocalStorage {
  /**
   *
   */
  static getSavedUsername () {
    return localStorage.getItem('username')
  }

  /**
   *
   * @param username
   */
  static saveUsername (username) {
    localStorage.setItem('username', username)
  }
}
