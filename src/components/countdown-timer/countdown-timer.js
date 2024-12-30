import { template } from './countdown-timer-template.js'

/**
 * Defines a custom element 'countdown-timer' which is a countdown timer.
 */
customElements.define('countdown-timer',
  /**
   * A class representing a countdown timer element.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLElement}
     * @description The element that displays the timer value.
     */
    #timerValue

    /**
     * @private
     * @type {number}
     * @description The ID of the interval used for the countdown timer.
     */
    #intervalId

    /**
     * @private
     * @type {number}
     * @description The elapsed time in seconds. Will be shown as the players score.
     */
    #elapsedTime = 0

    /**
     * Creates an instance of the countdown timer and attaches a shadow DOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#timerValue = this.shadowRoot.querySelector('#timerValue')
    }

    /**
     * Specifies the attributes to be observed for changes.
     *
     * @returns {string[]} The list of observed attributes.
     */
    static get observedAttributes () {
      return ['limit']
    }

    /**
     * Called when an observed attribute has been added, removed, updated, or replaced.
     *
     * @param {string} name - The name of the attribute.
     * @param {string} oldValue - The old value of the attribute.
     * @param {string} newValue - The new value of the attribute.
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if (name === 'limit' && oldValue !== newValue) {
        const limit = parseInt(newValue, 10) || 20 // Fallback to 20 if no valid number is provided
        this.resetTimer(limit) // Reset and start the timer with the new value
      }
    }

    /**
     * Starts the countdown timer.
     *
     * @param {number} seconds - The number of seconds for the countdown.
     */
    startCountdown (seconds) {
      let remainingTime = seconds
      this.#timerValue.textContent = remainingTime

      this.#intervalId = setInterval(() => {
        remainingTime -= 1
        this.#elapsedTime++
        this.#timerValue.textContent = remainingTime

        if (remainingTime <= 0) {
          this.stopCountdown()
          this.dispatchEvent(new CustomEvent('timer-ended', {
            bubbles: true,
            composed: true
          }))
        }
      }, 1000)
    }

    /**
     * Stops the countdown timer.
     */
    stopCountdown () {
      clearInterval(this.#intervalId)
    }

    /**
     * Resets the elapsed time to zero.
     */
    resetElapsedTime () {
      this.#elapsedTime = 0
    }

    /**
     * Gets the elapsed time.
     *
     * @returns {number} The current elapsed time.
     */
    get elapsedTime () {
      return this.#elapsedTime
    }

    /**
     * Resets the countdown timer with a new value.
     *
     * @param {number} seconds - The number of seconds for the countdown.
     */
    resetTimer (seconds) {
      this.stopCountdown() // Stop the current timer
      this.startCountdown(seconds) // Start a new timer
    }
  }
)
