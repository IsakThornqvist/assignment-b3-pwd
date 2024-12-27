import { template } from './my-windown-template.js'

customElements.define('my-window',

  /**
   *
   */
  class extends HTMLElement {
    #myWindow
    #closeButton
    #windowTitle
    #abortController = new AbortController()

    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myWindow = this.shadowRoot.querySelector('#myWindow')
      this.#closeButton = this.shadowRoot.querySelector('#closeButton')
      this.#windowTitle = this.shadowRoot.querySelector('#windowTitle')
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

      this.#closeButton.addEventListener('click', event => {
        this.classList.add('hidden')
        console.log('window closed')
      })

      this.#windowTitle.addEventListener('click', event => {
        console.log('title clicked')
      })
    }

    /**
     *
     */
    moveWindow () {
      this.#windowTitle.addEventListener('mousedown', event => {
        console.log('down')
      })
      this.#windowTitle.addEventListener('mousemove', event => {
        console.log('movbe')
      })
      this.#windowTitle.addEventListener('mouseup', event => {
        console.log('up')
      })
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
