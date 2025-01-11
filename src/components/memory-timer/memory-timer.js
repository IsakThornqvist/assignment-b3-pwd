import { template } from './memory-timer-template.js'

customElements.define('memory-timer',

  /**
   *
   */
  class extends HTMLElement {
    #memoryTimer
    #seconds = 0
    #timerInterval
    #score = 0
    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#memoryTimer = this.shadowRoot.querySelector('#scoreAndTime')
    }

    /**
     *
     */
    connectedCallback () {
      console.log('memory timer added')
    }

    /**
     *
     */
    disconnectedCallback () {

    }

    /**
     *
     * @param seconds
     */
    startTimer (seconds) {
      if (!this.#timerInterval) {
        this.#timerInterval = setInterval(() => {
          this.#seconds++
          console.log(this.#seconds)
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
     *
     */
    updateScore () {
      this.#score++ // Öka poängen
      this.updateScoreDisplay()
    }

    /**
     *
     */
    updateScoreDisplay () {
      const scoreElement = this.shadowRoot.querySelector('#score')
      if (scoreElement) {
        scoreElement.textContent = `Attempts: ${this.#score}`
      }
    }

    /**
     *
     */
    resetScore () {
      this.#score = 0
      this.updateScoreDisplay()
    }

    /**
     *
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
     *
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
