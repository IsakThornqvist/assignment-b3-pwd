import { template } from './memory-game-template.js'
import '../flipping-tile/index.js'
import '../memory-timer/index.js'
import '../memory-end-screen/index.js'

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
    #flipTimeout = null
    #memoryTimer
    #memoryEndScreen
    #hiddenTilesCount = 0
    #totalTiles = 0

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
      this.#memoryTimer = this.shadowRoot.querySelector('#memoryTimer')
      this.#memoryEndScreen = this.shadowRoot.querySelector('#memoryEndScreen')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      // Lägg till lyssnare för 'window-closed'
      document.addEventListener('window-closed', event => {
        console.log('Memory game: Window closed detected')

        // Återställ timer och poäng
        this.#memoryTimer.resetTimer()
        this.#memoryTimer.resetScore()
      }, { signal })

      this.#button4x4.addEventListener('click', () => {
        this.createTiles(4, 4)
        this.#memoryTimer.resetTimer()
        this.#memoryTimer.resetScore()
      }, { signal })

      this.#button4x2.addEventListener('click', () => {
        this.createTiles(4, 2)
        this.#memoryTimer.resetTimer()
        this.#memoryTimer.resetScore()
      }, { signal })

      this.#button2x2.addEventListener('click', () => {
        this.createTiles(2, 2)
        this.#memoryTimer.resetTimer()
        this.#memoryTimer.resetScore()
      }, { signal })

      this.#resetButton.addEventListener('click', () => {
        this.createTiles(4, 4)
        this.#memoryTimer.resetTimer()
        this.#memoryTimer.resetScore()
      }, { signal })

      this.shadowRoot.addEventListener('tile-clicked', event => {
        if (!this.#nextFlipReady) return

        const tile = event.detail.tile
        if (this.#selectedTiles.includes(tile)) return

        // Start timer for first tile
        if (this.#selectedTiles.length === 0) {
          this.startFlipTimeout(tile)
        }

        this.#selectedTiles.push(tile)
        tile.flipTile()
        this.#memoryTimer.startTimer()

        if (this.#selectedTiles.length === 2) {
          this.clearFlipTimeout() // Clear timeout since two tiles are selected
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

              this.#hiddenTilesCount += 2
              this.#memoryTimer.updateScore()

              if (this.#hiddenTilesCount === this.#totalTiles) {
                this.#memoryTimer.stopTimer()
                this.showEndScreen()
              }
            }, this.#timeoutDuration)
          } else {
            setTimeout(() => {
              firstTile.resetTile()
              secondTile.resetTile()
              this.#selectedTiles = []
              this.#nextFlipReady = true
              this.#memoryTimer.updateScore()
            }, this.#timeoutDuration)
          }
        }
      }, { signal })

      this.createTiles(4, 4)
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      console.log('Event listeners cleaned up in memory-game.')
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
      this.#totalTiles = totalTiles
      this.#hiddenTilesCount = 0

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
        this.#memoryGame.style.display = ''
        this.#memoryEndScreen.classList.add('hidden')
      }
    }

    /**
     * Shows the end screen when the game is over.
     */
    showEndScreen () {
      console.log('End screen shown')
      this.#memoryEndScreen.classList.remove('hidden')
      this.#memoryGame.style.display = 'none'
    }

    /**
     * Starts a timeout for flipping a tile back.
     *
     * @param {HTMLElement} tile - The tile to flip back.
     */
    startFlipTimeout (tile) {
      this.#flipTimeout = setTimeout(() => {
        tile.resetTile()
        this.#selectedTiles = []
        this.#nextFlipReady = true
      }, 4000) // 2 seconds timeout
    }

    /**
     * Clears the flip timeout.
     */
    clearFlipTimeout () {
      if (this.#flipTimeout) {
        clearTimeout(this.#flipTimeout)
        this.#flipTimeout = null
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
