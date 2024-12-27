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
    #colorVariations = ['blueviolet', 'lightgreen', 'blue', 'red', 'orange', 'pink', 'green', 'lightblue']

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
    createTileColor () {
      const colors = this.#colorVariations
      console.log(colors)
    }

    /**
     * Creates flipping-tiles based on rows and columns.
     *
     * @param {number} rows - Number of rows.
     * @param {number} columns - Number of columns.
     */
    createTiles (rows, columns) {
      // Clear previous tiles (if any)
      this.#memoryGame.innerHTML = ''

      // Dynamic adjustment of grid layout based on rows and columns
      const tileSize = '130px' // Size of each tile
      this.#memoryGame.style.gridTemplateColumns = `repeat(${columns}, ${tileSize})` // Column size
      this.#memoryGame.style.gridTemplateRows = `repeat(${rows}, ${tileSize})` // Row size

      // Create as many tiles as needed
      const totalTiles = rows * columns

      // Calculate the number of unique colors needed
      const uniqueColorsNeeded = totalTiles / 2 // Each color will be used 2 times

      // Create a list of colors, duplicate each color to be used 2 times
      let colors = []
      for (let i = 0; i < uniqueColorsNeeded; i++) {
        colors.push(this.#colorVariations[i % this.#colorVariations.length]) // Cycle through colors if needed
      }

      // Double check that we have enough colors for all tiles
      colors = [...colors, ...colors] // Duplicate so that we have two of each color

      this.shuffleArray(colors) // Shuffle the colors

      // Create tiles and assign colors
      for (let i = 0; i < totalTiles; i++) {
        const newTile = document.createElement('flipping-tile')
        newTile.textContent = i + 1
        newTile.setAttribute('data-tile-number', i + 1) // Assign a name/number

        // Get the backside element and set the color
        const backSide = newTile.shadowRoot.querySelector('#back')
        backSide.style.backgroundColor = colors[i] // Assign random color

        // Add the new tile to the game board
        this.#memoryGame.appendChild(newTile)
      }
    }

    /**
     *
     * @param arr
     */
    shuffleArray (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]] // Swap elements
      }
      return arr
    }
  })
