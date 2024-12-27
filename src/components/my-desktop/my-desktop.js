import { template } from './my-desktop-template.js'
import '../my-window/index.js'
import '../memory-game/index.js'

customElements.define('my-desktop',

  /**
   *
   */
  class extends HTMLElement {
    #myDesktop
    #appOne
    #appTwo
    #appThree
    #myWindow

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myDesktop = this.shadowRoot.querySelector('#desktopContainer')
      this.#appOne = this.shadowRoot.querySelector('#appLogo1')
      this.#appTwo = this.shadowRoot.querySelector('#appLogo2')
      this.#appThree = this.shadowRoot.querySelector('#appLogo3')
      this.#myWindow = this.shadowRoot.querySelector('#my-window')
    }

    /**
     *
     */
    connectedCallback () {
      this.#appOne.addEventListener('click', event => {
        console.log('App One Clicked')
        this.#myWindow.classList.remove('hidden')
      })
      this.#appTwo.addEventListener('click', event => {
        console.log('App Two Clicked')
        this.#myWindow.classList.remove('hidden')
      })
      this.#appThree.addEventListener('click', event => {
        console.log('App Three Clicked')
        this.#myWindow.classList.remove('hidden')
      })

      if (this.#myDesktop) {
        console.log('desktop added to shadowDOM')
      } else {
        console.error('Failed to find desktop in Shadow DOM')
      }
    }

    /**
     *
     */
    disconnectedCallback () {

    }
  })
