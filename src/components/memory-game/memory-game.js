import { template } from './memory-game-template.js'
import '../flipping-tile/index.js'

customElements.define('memory-game',
  /**
   *
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

    /**
     *
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
      if (this.#memoryGame) {
        console.log('memory added to shadowDOM')
      }
      this.#button4x4.addEventListener('click', (event) => {
        console.log('activated 4x4')
        this.createTiles(4, 4)
      })

      this.#button4x2.addEventListener('click', event => {
        console.log('activated 4x2')
        this.createTiles(4, 2)
      })

      this.#button2x2.addEventListener('click', event => {
        console.log('activated 2x2')
        this.createTiles(2, 2)
      })

      this.#resetButton.addEventListener('click', event => {
        console.log('game reset')
        this.createTiles(rows, columns)
      })

      console.log('testtest')

      // Get rows and columns from attributes, if not present set to default values (4x4)
      const rows = parseInt(this.getAttribute('rows')) || 4
      const columns = parseInt(this.getAttribute('columns')) || 4

      // Create tiles based on rows and columns
      this.createTiles(rows, columns)
    }

    /**
     *
     */
    disconnectedCallback () {}

    /**
     *
     */

    /**
     *
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
      // Dynamic adjustment of grid layout based on rows and columns
      const tileSize = '100px' // Size of each tile
      this.#memoryGame.style.gridTemplateColumns = `repeat(${columns}, ${tileSize})` // Column size
      this.#memoryGame.style.gridTemplateRows = `repeat(${rows}, ${tileSize})` // Row size

      // Calculate the number of unique images needed
      const totalTiles = rows * columns
      const uniqueImagesNeeded = totalTiles / 2 // Each image will be used 2 times

      // Create a list of images, duplicate each to be used 2 times
      let images = []
      for (let i = 0; i < uniqueImagesNeeded; i++) {
        images.push(this.#tileImages[i % this.#tileImages.length]) // Cycle through images if needed
      }
      images = [...images, ...images] // Duplicate images to match pairs

      this.shuffleMemory(images) // Shuffle the images

      // Create tiles and assign images
      for (let i = 0; i < totalTiles; i++) {
        const newTile = document.createElement('flipping-tile')
        newTile.setAttribute('data-tile-number', i + 1) // Assign a unique identifier

        // Set the back side image
        const backSide = newTile.shadowRoot.querySelector('#back')
        backSide.style.backgroundImage = `url('${images[i]}')`
        backSide.style.backgroundSize = 'cover'
        backSide.style.backgroundPosition = 'center'

        // Add the new tile to the game board
        this.#memoryGame.appendChild(newTile)
      }
    }

    /**
     *
     * @param arr
     */
    shuffleMemory (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
      }
      return arr
    }
  })
