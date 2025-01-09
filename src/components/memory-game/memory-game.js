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
    #nextFlipReady = true
    #timeoutDuration = 500

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
     *
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      this.#button4x4.addEventListener('click', () => this.createTiles(4, 4), { signal })
      this.#button4x2.addEventListener('click', () => this.createTiles(4, 2), { signal })
      this.#button2x2.addEventListener('click', () => this.createTiles(2, 2), { signal })
      this.#resetButton.addEventListener('click', () => this.createTiles(4, 4), { signal })

      this.shadowRoot.addEventListener('tile-clicked', event => {
        if (!this.#nextFlipReady) return

        const tile = event.detail.tile
        if (this.#selectedTiles.includes(tile)) return

        this.#selectedTiles.push(tile)
        tile.flipTile()

        if (this.#selectedTiles.length === 2) {
          const [firstTile, secondTile] = this.#selectedTiles
          const firstImage = firstTile.shadowRoot.querySelector('#back').style.backgroundImage
          const secondImage = secondTile.shadowRoot.querySelector('#back').style.backgroundImage

          this.#nextFlipReady = false

          if (firstImage === secondImage) {
            setTimeout(() => {
              firstTile.hideTile()
              secondTile.hideTile()
              this.#selectedTiles = []
              this.#nextFlipReady = true
            }, this.#timeoutDuration)
          } else {
            setTimeout(() => {
              firstTile.resetTile()
              secondTile.resetTile()
              this.#selectedTiles = []
              this.#nextFlipReady = true
            }, this.#timeoutDuration)
          }
        }
      }, { signal })

      this.createTiles(4, 4)
    }

    /**
     *
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in memory-game.')
    }

    /**
     *
     */
    clearTiles () {
      while (this.#memoryGame.firstChild) {
        this.#memoryGame.removeChild(this.#memoryGame.firstChild)
      }
    }

    /**
     *
     * @param rows
     * @param columns
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
