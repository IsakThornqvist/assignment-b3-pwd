import { template } from './my-desktop-template.js'

customElements.define('my-desktop',

  /**
   *
   */
  class extends HTMLElement {
    #myDesktop
    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myDesktop = this.shadowRoot.querySelector('#desktopContainer')
    }
  })
