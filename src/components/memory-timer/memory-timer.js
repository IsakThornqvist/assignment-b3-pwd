import { template } from './memory-timer-template.js'

customElements.define('memory-timer',

  /**
   *
   */
  class extends HTMLElement {
    #memoryTimer
    #seconds = 0
    #timerInterval
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
