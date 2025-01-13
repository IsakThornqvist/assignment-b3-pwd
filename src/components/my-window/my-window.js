import { template } from './my-windown-template.js'

customElements.define('my-window',

  /**
   * Custom element representing a window.
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
     * Constructor for the my-window element.
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
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      if (this.#myWindow) {
        console.log('window added to shadowDOM')
      } else {
        console.error('Failed to find #myWindow in Shadow DOM')
      }

      const signal = this.#abortController.signal

      this.#myWindow.addEventListener('click', () => {
        this.dispatchEvent(new CustomEvent('window-clicked', {
          bubbles: true,
          composed: true,
          detail: { window: this }
        }))
      }, { signal })

      this.#closeButton.addEventListener('click', event => {
        console.log('window closed')

        // Dispatch custom event for window close
        this.dispatchEvent(new CustomEvent('window-closed', {
          bubbles: true, // Allow event to bubble up the DOM
          composed: true, // Allow event to cross Shadow DOM boundaries
          detail: { window: this }
        }))

        this.remove()
      }, { signal })

      this.#windowTitle.addEventListener('mousedown', e => this.mouseDown(e), { signal })

      document.addEventListener('mousemove', e => this.mouseMove(e), { signal })
      document.addEventListener('mouseup', e => this.mouseUp(e), { signal })
    }

    /**
     * Handles the mousedown event to start dragging the window.
     *
     * @param {MouseEvent} e - The mousedown event.
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
     * Sets the title of the window.
     *
     * @param {string} newTitle - The new title for the window.
     */
    setWindowTitle (newTitle) {
      this.#windowTitle.textContent = newTitle
    }

    /**
     * Handles the mousemove event to drag the window.
     *
     * @param {MouseEvent} e - The mousemove event.
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
     * Handles the mouseup event to stop dragging the window.
     *
     * @param {MouseEvent} e - The mouseup event.
     */
    mouseUp (e) {
      if (this.#isDragging) {
        console.log('Dragging ended')
        this.#isDragging = false
      }
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in window.')
    }
  })
