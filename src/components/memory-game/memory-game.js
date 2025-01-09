import { template } from './memory-game-template.js'
import '../flipping-tile/index.js'

customElements.define('memory-game',
  /**
   * Custom element representing a memory game.
   */
  class extends HTMLElement {
    #memoryGame
    #resetButton
    #button4x4
    #button4x2
    #button2x2
    #tileImages = [
      './img/bellingham-memory-tile.png',
      './img/valverde-memory-tile.png',
      './img/mbappe-memory-tile.png',
      './img/rodrygo-memory-tile.png',
      './img/rudiger-memory-tile.png',
      './img/tchouameni-memory-tile.png',
      './img/camavinga-memory-tile.png',
      './img/vinicius-memory-tile.png'
    ]

    #selectedTiles = []
    #shuffledImages
    #abortController = new AbortController()
    #nextFlipReady = true // Allows to flip the next tiles
    #timeoutDuration = 500 // Timeout duration in milliseconds (1 second)

    /**
     * Constructor for the memory-game element.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#memoryGame = this.shadowRoot.querySelector('#memory-board')
      this.#resetButton = this.shadowRoot.querySelector('#resetButton')
      this.#button4x4 = this.shadowRoot.querySelector('#button4x4')
      this.#button4x2 = this.shadowRoot.querySelector('#button4x2')
      this.#button2x2 = this.shadowRoot.querySelector('#button2x2')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      this.#button4x4.addEventListener('click', () => {
        console.log('activated 4x4')
        this.createTiles(4, 4)
      }, { signal })

      this.#button4x2.addEventListener('click', () => {
        console.log('activated 4x2')
        this.createTiles(4, 2)
      }, { signal })

      this.#button2x2.addEventListener('click', () => {
        console.log('activated 2x2')
        this.createTiles(2, 2)
      }, { signal })

      this.#resetButton.addEventListener('click', () => {
        console.log('game reset')
        this.clearTiles()
        this.createTiles(4, 4) // Reset to default 4x4
      }, { signal })

      this.shadowRoot.addEventListener('tile-flipped', event => {
        if (!this.#nextFlipReady) return // Stop interaction if not ready for the next flip

        const tile = event.detail.tile
        this.#selectedTiles.push(tile)

        if (this.#selectedTiles.length === 2) {
          const [firstTile, secondTile] = this.#selectedTiles
          const firstImage = firstTile.shadowRoot.querySelector('#back').style.backgroundImage
          const secondImage = secondTile.shadowRoot.querySelector('#back').style.backgroundImage

          this.#nextFlipReady = false // Lock interaction while processing the two tiles

          if (firstImage === secondImage) {
            // If the images match, hide both tiles
            setTimeout(() => {
              firstTile.hideTile()
              secondTile.hideTile()
              this.#selectedTiles = [] // Reset the selected tiles
              this.#nextFlipReady = true // Unlock interaction for the next flip
            }, this.#timeoutDuration) // Time it takes for the tiles to flip back
          } else {
            // If the images don't match, reset both tiles
            setTimeout(() => {
              firstTile.resetTile()
              secondTile.resetTile()
              this.#selectedTiles = [] // Reset the selected tiles
              this.#nextFlipReady = true // Unlock interaction for the next flip
            }, this.#timeoutDuration) // Time before flipping interaction is over
          }
        }
      }, { signal })

      const rows = parseInt(this.getAttribute('rows')) || 4
      const columns = parseInt(this.getAttribute('columns')) || 4
      this.createTiles(rows, columns)
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in memory.')
    }

    /**
     * Clears all tiles from the game board.
     */
    clearTiles () {
      while (this.#memoryGame.firstChild) {
        this.#memoryGame.removeChild(this.#memoryGame.firstChild)
      }
    }

    /**
     * Creates flipping-tiles based on rows and columns.
     *
     * @param {number} rows - Number of rows.
     * @param {number} columns - Number of columns.
     */
    createTiles (rows, columns) {
      this.clearTiles()
      const tileSize = '100px'
      this.#memoryGame.style.gridTemplateColumns = `repeat(${columns}, ${tileSize})`
      this.#memoryGame.style.gridTemplateRows = `repeat(${rows}, ${tileSize})`

      const totalTiles = rows * columns
      const uniqueImagesNeeded = totalTiles / 2

      let images = []
      for (let i = 0; i < uniqueImagesNeeded; i++) {
        images.push(this.#tileImages[i % this.#tileImages.length])
      }
      images = [...images, ...images]
      this.#shuffledImages = this.shuffleMemory(images)

      for (let i = 0; i < totalTiles; i++) {
        const newTile = document.createElement('flipping-tile')
        newTile.setAttribute('data-tile-number', i + 1)

        const backSide = newTile.shadowRoot.querySelector('#back')
        backSide.style.backgroundImage = `url('${this.#shuffledImages[i]}')`
        backSide.style.backgroundSize = 'cover'
        backSide.style.backgroundPosition = 'center'

        this.#memoryGame.appendChild(newTile)
      }
    }

    /**
     * Shuffles an array of memory tiles.
     *
     * @param {Array} arr - The array to shuffle.
     * @returns {Array} The shuffled array.
     */
    shuffleMemory (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
      }
      console.log(arr)
      return arr
    }
  })

// variabel tiles flippade
// tilesen sköter flippingen
// memory som säger år den att flippa
