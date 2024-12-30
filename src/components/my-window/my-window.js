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
    #startX // current cord
    #startY // current cord
    #newX // how much it moved
    #newY // how much it moved
    #isDragging = false

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
      if (this.#myWindow) {
        console.log('window added to shadowDOM')
      } else {
        console.error('Failed to find #myWindow in Shadow DOM')
      }

      this.#myWindow.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('window-clicked', {
          bubbles: true,
          composed: true,
          detail: { window: this }
        }))
      })

      this.#closeButton.addEventListener('click', event => {
        this.classList.add('hidden')
        console.log('window closed')
      })

      this.#windowTitle.addEventListener('mousedown', e => this.mouseDown(e))

      document.addEventListener('mousemove', e => this.mouseMove(e))
      document.addEventListener('mouseup', e => this.mouseUp(e))
    }

    /**
     *
     * @param e
     */
    mouseDown (e) {
      this.dispatchEvent(new CustomEvent('window-clicked', {
        bubbles: true,
        composed: true,
        detail: { window: this }
      }))
      this.#isDragging = true
      this.#startX = e.clientX
      this.#startY = e.clientY
    }

    /**
     *
     * @param e
     */
    mouseMove (e) {
      if (!this.#isDragging) return
      this.#newX = this.#startX - e.clientX
      this.#newY = this.#startY - e.clientY

      this.#startX = e.clientX
      this.#startY = e.clientY

      this.#myWindow.style.top = (this.#myWindow.offsetTop - this.#newY) + 'px'
      this.#myWindow.style.left = (this.#myWindow.offsetLeft - this.#newX) + 'px'

      console.log('newX', this.#newX)
      console.log('newY', this.#newY)
      console.log('startX', this.#startX)
      console.log('startY', this.#startY)
    }

    /**
     *
     * @param e
     */
    mouseUp (e) {
      if (this.#isDragging) {
        console.log('Dragging ended')
        this.#isDragging = false
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
