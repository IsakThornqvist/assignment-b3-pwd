import { template } from './flipping-tile-template.js'

customElements.define('flipping-tile',

  /**
   *
   */
  class extends HTMLElement {
    #flippingTile
    #abortController = new AbortController()
    /**
     *
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#flippingTile = this.shadowRoot.querySelector('#flipping-tile')
    }

    /**
     *
     */
    static get observedAttributes () {
      return ['hidden', 'face-up', 'disabled']
    }

    /**
     *
     * @param name
     * @param oldValue
     * @param newValue
     */
    attributeChangedCallback (name, oldValue, newValue) {
      if ((name === 'hidden' || name === 'disabled') &&
        oldValue !== newValue) {
        const isPresent = Boolean(newValue) || newValue === ''

        if (isPresent) {
          this.#flippingTile.setAttribute('disabled', '')
          this.blur()
        } else {
          this.#flippingTile.removeAttribute('disabled')
        }
      }
    }

    /**
     *
     */
    connectedCallback () {
      const signal = this.#abortController.signal
      // this.handleBacksideImageVisibility()

      this.#flippingTile.addEventListener('click', (event) =>
        this.#flipTheTile(),
      { signal }
      )
    }

    /**
     *
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in flipping-tile.')
    }

    /*
    handleBacksideImageVisibility () {

    }

    handleHiddenTile () {
    }

    handleFucusedTile () {

    }
 */
    /**
     *
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
