/**
 * Utility class for handling local storage operations.
 */
export class LocalStorage {
  /**
   * Retrieves the saved username from local storage.
   *
   * @returns {string|null} The saved username, or null if not found.
   */
  static getSavedUsername () {
    return localStorage.getItem('username')
  }

  /**
   * Saves the given username to local storage.
   *
   * @param {string} username - The username to save.
   */
  static saveUsername (username) {
    localStorage.setItem('username', username)
  }
}
