import { template } from './my-user-template.js'

customElements.define('my-username',

  /**
   *
   */
  class extends HTMLElement {
    #myUsername
    #sendButton
    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myUsername = this.shadowRoot.querySelector('#my-username')
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      this.#sendButton.addEventListener('click', event => {
        event.preventDefault()
        this.getNickName()
      })
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {

    }

    /**
     *
     * @param nickName
     */
    getNickName (nickName) {
      const textInput = this.shadowRoot.querySelector('#textInput')
      const nickname = textInput.value.trim()
      nickName = nickname

      if (nickname) {
        console.log('Nickname submitted:', nickname)
      } else {
        console.log('Nickname is empty')
      }
      return nickName
    }
  })
