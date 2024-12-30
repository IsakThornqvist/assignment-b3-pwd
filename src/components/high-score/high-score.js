import { template } from './high-score-template.js'

/**
 * Defines a custom element 'high-score' which displays a high score list.
 */
customElements.define('high-score',
  /**
   * A class representing a high score element.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLElement}
     * @description The element that displays the high score list.
     */
    #highScoreList

    /**
     * @private
     * @type {HTMLElement}
     * @description The button element used to reset the high score list.
     */
    #resetButton

    /**
     * @private
     * @type {HTMLElement}
     * @description The button element used to clear high scores from localStorage.
     */
    #clearHighScoresButton

    /**
     * Creates an instance of the high score element and attaches a shadow DOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#highScoreList = this.shadowRoot.querySelector('#highScoreList')
      this.#resetButton = this.shadowRoot.querySelector('#resetButton')
      this.#clearHighScoresButton = this.shadowRoot.querySelector('#clearHighScores')
    }

    /**
     * Called when the element is connected to the document's DOM.
     */
    connectedCallback () {
      this.#resetButton.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('reset-quiz', { bubbles: true, composed: true }))
        console.log('Quiz reset')
      })

      this.#clearHighScoresButton.addEventListener('click', () => {
        this.clearHighScores()
      })

      // Load high scores from localStorage
      const highScores = JSON.parse(localStorage.getItem('highScores')) || []
      this.updateHighScores(highScores)
    }

    /**
     * Updates the high score list UI.
     *
     * @param {Array} highScores - Array of high score objects with nickname and elapsedTime.
     */
    updateHighScores (highScores) {
      // Clear the list
      while (this.#highScoreList.firstChild) {
        this.#highScoreList.removeChild(this.#highScoreList.firstChild)
      }

      // Add the new time and nickname
      highScores.forEach(({ nickname, elapsedTime }) => {
        const li = document.createElement('li')
        li.textContent = `${nickname} - ${elapsedTime}s`
        this.#highScoreList.appendChild(li)
      })
    }

    /**
     * Adds a new high score entry.
     *
     * @param {string} nickname - The player's nickname.
     * @param {number} elapsedTime - The player's completion time.
     */
    addHighScore (nickname, elapsedTime) {
      const highScores = JSON.parse(localStorage.getItem('highScores')) || []

      // Add new score and sort by elapsed time (ascending)
      highScores.push({ nickname, elapsedTime })
      highScores.sort((a, b) => a.elapsedTime - b.elapsedTime)

      // Only top 5 will be shown
      const topFiveScores = highScores.slice(0, 5)

      // Save in localstorage
      localStorage.setItem('highScores', JSON.stringify(topFiveScores))

      this.updateHighScores(topFiveScores)
    }

    /**
     * Clears all high scores from localStorage and updates the UI.
     */
    clearHighScores () {
      localStorage.removeItem('highScores')
      this.updateHighScores([])
      console.log('High scores cleared')
    }
  }
)
