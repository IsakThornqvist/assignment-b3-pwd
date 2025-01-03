import { template } from './my-chat-application-template.js'

customElements.define('my-chat-application',

  /**
   * Custom element representing a chat application.
   */
  class extends HTMLElement {
    #myChat
    /**
     * Constructor for the my-chat-application element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myChat = this.shadowRoot.querySelector('#my-chat-application')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {

    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {

    }
  })
