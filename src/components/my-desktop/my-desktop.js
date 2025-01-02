import { template } from './my-desktop-template.js'
import '../my-window/index.js'
import '../memory-game/index.js'
import '../quiz-application/index.js'

customElements.define('my-desktop',

  /**
   *
   */
  class extends HTMLElement {
    #myDesktop
    #appOne
    #appTwo
    #appThree
    #highestZIndex = 1
    #windowCounter = 0 // Counter for the windows

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
    }

    /**
     *
     */
    connectedCallback () {
      this.#appOne.addEventListener('click', () => {
        console.log('App One Clicked')
        this.createNewWindow('memory-game')
      })
      this.#appTwo.addEventListener('click', () => {
        console.log('App Two Clicked')
        this.createNewWindow('my-window')
      })
      this.#appThree.addEventListener('click', () => {
        console.log('App Three Clicked')
        this.createNewWindow('quiz-application')
      })

      this.shadowRoot.addEventListener('window-clicked', event => {
        console.log('Window clicked:', event.detail.window)
        this.bringUpToFront(event.detail.window)
      })

      if (this.#myDesktop) {
        console.log('Desktop added to shadowDOM')
      } else {
        console.error('Failed to find desktop in Shadow DOM')
      }
    }

    /**
     * Create a new window with the given app
     *
     * @param {string} appName - The name of the app that will be loaded into the window
     */
    createNewWindow (appName) {
      // Create a new window
      const newWindow = document.createElement('my-window')
      newWindow.setAttribute('id', `window-${++this.#windowCounter}`)
      newWindow.style.zIndex = ++this.#highestZIndex

      // Create the apps content
      const appInstance = document.createElement(appName)
      newWindow.appendChild(appInstance)

      // Add the app to the desktop
      this.#myDesktop.appendChild(newWindow)

      console.log(`New window created with app: ${appName}, ID: window-${this.#windowCounter}`)
    }

    /**
     * Move the window to the top depending on the Z index
     *
     * @param {HTMLElement} window - The window that will be moved to the top
     */
    bringUpToFront (window) {
      this.#highestZIndex += 1
      window.style.zIndex = this.#highestZIndex
      console.log(window, 'Brought to front with z-index:', this.#highestZIndex)
    }

    /**
     *
     */
    disconnectedCallback () {}
  })
