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
    #myWindowTwo
    #myWindowThree
    #highestZIndex = 1

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
      this.#myWindowTwo = this.shadowRoot.querySelector('#my-window-two')
      this.#myWindowThree = this.shadowRoot.querySelector('#my-window-three')
    }

    /**
     *
     */
    connectedCallback () {
      this.#appOne.addEventListener('click', event => {
        console.log('App One Clicked')
        this.openWindowComponent(this.#myWindow)
      })
      this.#appTwo.addEventListener('click', event => {
        console.log('App Two Clicked')
        this.openWindowComponent(this.#myWindowTwo)
      })
      this.#appThree.addEventListener('click', event => {
        console.log('App Three Clicked')
        this.openWindowComponent(this.#myWindowThree)
      })

      if (this.#myDesktop) {
        console.log('desktop added to shadowDOM')
      } else {
        console.error('Failed to find desktop in Shadow DOM')
      }
    }

    /**
     *
     * @param window
     */
    bringUpToFront (window) {
      this.#highestZIndex += 1
      window.style.zIndex = this.#highestZIndex
      console.log(window, 'Brought to front with z-index:', this.#highestZIndex)
    }

    /**
     *
     * @param window
     */
    openWindowComponent (window) {
      window.classList.remove('hidden')
      this.bringUpToFront(window)
    }

    /**
     *
     */
    disconnectedCallback () {

    }
  })
