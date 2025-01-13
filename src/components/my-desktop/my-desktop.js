import { template } from './my-desktop-template.js'
import '../my-window/index.js'
import '../memory-game/index.js'
import '../my-chat-application/index.js'
import '../tic-tac/index.js'

customElements.define('my-desktop',

  /**
   * Custom element representing a desktop environment.
   */
  class extends HTMLElement {
    #myDesktop
    #appOne
    #appTwo
    #appThree
    #highestZIndex = 1
    #windowCounter = 0 // Counter for the windows
    #abortController = new AbortController()

    /**
     * Constructor for the my-desktop element.
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
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      this.#appOne.addEventListener('click', () => {
        this.createNewWindow('memory-game')
      }, { signal })

      this.#appTwo.addEventListener('click', () => {
        this.createNewWindow('my-chat-application')
      }, { signal })

      this.#appThree.addEventListener('click', () => {
        this.createNewWindow('tic-tac-toe')
      }, { signal })

      this.shadowRoot.addEventListener('window-clicked', event => {
        this.bringUpToFront(event.detail.window)
      }, { signal })

      if (this.#myDesktop) {
        console.log('Desktop added to DOM')
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

      // Set the window title based on the app
      if (appName === 'memory-game') {
        newWindow.setWindowTitle('Memory Game')
      } else if (appName === 'my-chat-application') {
        newWindow.setWindowTitle('Chat Application')
      } else if (appName === 'tic-tac-toe') {
        newWindow.setWindowTitle('Tic-Tac-Toe')
      }
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
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }
  })
