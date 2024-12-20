import { template } from './my-windown-template.js'

customElements.define('my-window',

  /**
   *
   */
  class extends HTMLElement {
    #myWindow

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myWindow = this.shadowRoot.querySelector()
    }
  })



  // service worker
  // egen fil
  // visas bra i videon

  // cache storage och cacha saker måste jag kolla upp
  // man  kan skapa en async function
  
  // .webmanifest ????
  // peka ut manifest filen i index.html
  
  // routing sidan ska inter laddas om 