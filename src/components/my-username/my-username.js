import { template } from './my-user-template.js'
import { LocalStorage } from '../local-storage/local-storage.js'

customElements.define('my-username',

  /**
   * Custom element for handling username input and submission.
   */
  class extends HTMLElement {
    #myUsername
    #sendButton
    #userNameInput
    #abortController = new AbortController()
    /**
     * Constructor for the my-username element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myUsername = this.shadowRoot.querySelector('#my-username')
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
      this.#userNameInput = this.shadowRoot.querySelector('#userNameInput')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      const savedUsername = LocalStorage.getSavedUsername()
      if (savedUsername) {
        this.classList.add('hidden')
        console.log('welcome back 2', savedUsername)
      } else {
        this.#sendButton.addEventListener('click', event => {
          event.preventDefault()
          this.getNickName()
          this.#myUsername.classList.add('hidden')
          this.#sendButton.classList.add('hidden')
        }, { signal })

        this.#userNameInput.addEventListener('keydown', event => {
          if (event.key === 'Enter') {
            event.preventDefault()
            this.getNickName()
            this.#myUsername.classList.add('hidden')
            this.#sendButton.classList.add('hidden')
          }
        }, { signal })
      }
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
    }

    /**
     * Retrieves the nickname from the input field, dispatches a custom event if the nickname is valid.
     *
     * @param {string} nickName - The nickname to be set.
     * @returns {string} The trimmed nickname.
     */
    getNickName (nickName) {
      const nickname = this.#userNameInput.value.trim()
      nickName = nickname

      if (nickname) {
        console.log('Nickname submitted:', nickname)
        this.dispatchEvent(new CustomEvent('username-submitted', {
          bubbles: true,
          composed: true,
          detail: { nickname }
        }))
      } else {
        console.log('Nickname is empty')
      }
      return nickName
    }
  })
