import { template } from './my-chat-application-template.js'
import '../my-username/index.js'
import { LocalStorage } from '../local-storage/local-storage.js'

customElements.define('my-chat-application',

  /**
   * Custom element representing a chat application.
   */
  class extends HTMLElement {
    #myChat
    #sendButton
    #textInput
    #userName
    /**
     * Constructor for the my-chat-application element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myChat = this.shadowRoot.querySelector('#my-chat-application')
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
      this.#textInput = this.shadowRoot.querySelector('#textInput')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const savedUsername = LocalStorage.getSavedUsername()
      if (savedUsername) {
        this.#userName = savedUsername
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
        console.log('welcome back', savedUsername)
      } else {
        this.shadowRoot.querySelector('my-username').classList.remove('hidden')
      }
      this.#sendButton.addEventListener('click', event => {
        console.log('message sent1')
        this.getMessage()
      })

      this.addEventListener('message-sent', event => {
        console.log('message:', event.detail.message)
      })

      this.#textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.getMessage()
        }
      })

      this.shadowRoot.addEventListener('username-submitted', event => {
        console.log('Username chat app', event.detail.nickname)
        this.#userName = event.detail.nickname
        localStorage.setItem('username', this.#userName)
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
      })
    }

    /**
     *
     * @param message
     */
    getMessage (message) {
      const theMessage = this.#textInput.value.trim()
      message = theMessage

      if (theMessage) {
        console.log('Message sent:', theMessage)

        this.dispatchEvent(new CustomEvent('message-sent', {
          bubbles: true,
          composed: true,
          detail: { message }
        }))
      } else {
        console.log('Message is empty')
      }
      return message
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {

    }
  })
