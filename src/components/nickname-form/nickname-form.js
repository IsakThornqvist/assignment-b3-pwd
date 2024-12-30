import { template } from './nickname-form-template.js'

/**
 * Defines a custom element 'nickname-form' which is a form for submitting nicknames.
 */
customElements.define('nickname-form',

  /**
   * A class representing a nickname form element.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLElement}
     * @description The form element for submitting nicknames.
     */
    #nicknameForm

    /**
     * Creates an instance of the nickname form and attaches a shadow DOM.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#nicknameForm = this.shadowRoot.querySelector('#nicknameForm')
    }

    /**
     * Called when the element is connected to the document's DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('#nicknameForm').addEventListener('submit', (event) => {
        event.preventDefault()

        const nickname = this.shadowRoot.querySelector('#nicknameInput').value.trim()
        if (nickname) {
          // Create and dispatch a CustomEvent when nickname is submitted
          const nicknameSubmittedEvent = new CustomEvent('nickname-submitted', {
            detail: { nickname },
            bubbles: true,
            composed: true
          })
          this.dispatchEvent(nicknameSubmittedEvent)
        }
      })
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     */
    disconnectedCallback () {
      this.#nicknameForm.removeEventListener('submit')
      this.#nicknameForm.style.display = 'none'
    }
  })
