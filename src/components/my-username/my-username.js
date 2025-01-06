import { template } from './my-user-template.js'

customElements.define('my-username',

  /**
   *
   */
  class extends HTMLElement {
    #myUsername
    #sendButton
    #userNameInput
    /**
     *
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
      this.#sendButton.addEventListener('click', event => {
        event.preventDefault()
        this.getNickName()
        this.#myUsername.classList.add('hidden')
        this.#sendButton.classList.add('hidden')
      })

      this.#userNameInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.getNickName()
          this.#myUsername.classList.add('hidden')
          this.#sendButton.classList.add('hidden')
        }
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
