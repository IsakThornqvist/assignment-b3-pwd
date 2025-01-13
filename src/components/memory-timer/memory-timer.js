import { template } from './memory-timer-template.js'

customElements.define('memory-timer',

  /**
   * Custom element representing a memory timer.
   */
  class extends HTMLElement {
    #memoryTimer
    #seconds = 0
    #timerInterval
    #score = 0
    /**
     * Constructor for the memory-timer element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#memoryTimer = this.shadowRoot.querySelector('#scoreAndTime')
    }

    /**
     * Starts the timer.
     *
     * @param {number} seconds - The initial seconds to start the timer from.
     */
    startTimer (seconds) {
      if (!this.#timerInterval) {
        this.#timerInterval = setInterval(() => {
          this.#seconds++
          const timeElement = this.shadowRoot.querySelector('#time')

          if (timeElement) {
            timeElement.textContent = `Time: ${this.#seconds}`
          }
        }, 1000)
        this.dispatchEvent(new CustomEvent('timer-started', {
          bubbles: true,
          composed: true
        }))
      }
    }

    /**
     * Updates the score.
     */
    updateScore () {
      this.#score++ // Öka poängen
      this.updateScoreDisplay()
    }

    /**
     * Updates the score display.
     */
    updateScoreDisplay () {
      const scoreElement = this.shadowRoot.querySelector('#score')
      if (scoreElement) {
        scoreElement.textContent = `Attempts: ${this.#score}`
      }
    }

    /**
     * Resets the score.
     */
    resetScore () {
      this.#score = 0
      this.updateScoreDisplay()
    }

    /**
     * Resets the timer.
     */
    resetTimer () {
      this.stopTimer()
      this.#seconds = 0

      const timeElement = this.shadowRoot.querySelector('#time')
      if (timeElement) {
        timeElement.textContent = 'Time: 0'
      }

      this.dispatchEvent(new CustomEvent('timer-reset', {
        bubbles: true,
        composed: true
      }))
    }

    /**
     * Stops the timer.
     */
    stopTimer () {
      if (this.#timerInterval) {
        clearInterval(this.#timerInterval)
        this.#timerInterval = null
      }
      this.dispatchEvent(new CustomEvent('timer-ended', {
        bubbles: true,
        composed: true
      }))
    }
  })
