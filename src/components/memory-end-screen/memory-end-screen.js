import { template } from './memory-end-screen-template.js'

customElements.define('memory-end-screen',

  /**
   *
   */
  class extends HTMLElement {
    #memoryEndScreen
    /**
     *
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#memoryEndScreen = this.shadowRoot.querySelector('#memoryEndScreen')
    }
  })
