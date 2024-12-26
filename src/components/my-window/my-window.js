import { template } from './my-windown-template.js'

customElements.define('my-window',

  /**
   *
   */
  class extends HTMLElement {
    #myWindow
    #abortController = new AbortController()

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myWindow = this.shadowRoot.querySelector('#myWindow')
    }

    /**
     *
     */
    connectedCallback () {
      /*       this.#myWindow.addEventListener('click', event => {
        console.log('window added to shadowDOM')
      }) */
      if (this.#myWindow) {
        console.log('window added to shadowDOM')
      } else {
        console.error('Failed to find #myWindow in Shadow DOM')
      }
    }

    /**
     *
     */
    disconnectedCallback () {

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
