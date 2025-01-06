import { template } from './my-chat-application-template.js'
import '../my-username/index.js'

customElements.define('my-chat-application',

  /**
   * Custom element representing a chat application.
   */
  class extends HTMLElement {
    #myChat
    #sendButton
    /**
     * Constructor for the my-chat-application element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myChat = this.shadowRoot.querySelector('#my-chat-application')
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      this.#sendButton.addEventListener('click', event => {
        console.log('message sent')
        this.getMessage()
      })
    }

    /**
     *
     * @param message
     */
    getMessage (message) {
      const textInput = this.shadowRoot.querySelector('#textInput')
      const theMessage = textInput.value.trim()
      message = theMessage

      if (theMessage) {
        console.log('Message sent:', theMessage)
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
