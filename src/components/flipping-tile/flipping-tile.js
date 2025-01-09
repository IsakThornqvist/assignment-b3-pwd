import { template } from './flipping-tile-template.js'

customElements.define('flipping-tile',

  /**
   * Custom element representing a flipping tile.
   */
  class extends HTMLElement {
    #flippingTile
    #abortController = new AbortController()
    /**
     * Constructor for the flipping-tile element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#flippingTile = this.shadowRoot.querySelector('#flipping-tile')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      this.#flippingTile.addEventListener('click', (event) =>
        this.#flipTheTile(),
      { signal }
      )
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in flipping-tile.')
    }

    /**
     *
     */
    hideTile () {
      this.#flippingTile.classList.add('hidden')
    }

    /**
     *
     */
    resetTile () {
      this.#flippingTile.style.transform = 'rotateY(0deg)'
    }

    /**
     * Flips the tile and dispatches a custom event.
     *
     * @private
     */
    #flipTheTile () {
      const tileFlipped = this.#flippingTile.style.transform === 'rotateY(180deg)'
      this.#flippingTile.style.transform = tileFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)'
      console.log('tile flipped')
      this.dispatchEvent(new CustomEvent('tile-flipped', {
        bubbles: true,
        composed: true,
        detail: { tile: this }
      }))
    }
  })
