import { template } from './tic-tac-template.js'

customElements.define('tic-tac-toe',
  /**
   * Custom element representing a Tic Tac Toe game.
   */
  class extends HTMLElement {
    #board = ['', '', '', '', '', '', '', '', '']
    #currentPlayer = 'X'
    #isGameOver = false
    #abortController = new AbortController()
    #restartButton
    #status
    #gameBoard

    /**
     * Constructor for the Tic Tac Toe element.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#restartButton = this.shadowRoot.querySelector('#restartButton')
      this.#status = this.shadowRoot.querySelector('#gameStatus')
      this.#gameBoard = this.shadowRoot.querySelector('#gameBoard')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      // Initialize the game
      this.#initializeGame()

      // Add restart button event listener
      this.#restartButton.addEventListener('click', () => this.#restartGame(), { signal })
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort() // Clean up event listeners
      console.log('Tic Tac cleaned up.')
    }

    /**
     * Initializes the game by rendering the board
     */
    #initializeGame () {
      this.#createBoard()
      this.#updateStatus()
    }

    /**
     * Renders/creates the Tic Tac Toe board.
     * First while makes sure we start with a empty board every time
     */
    #createBoard () {
      while (this.#gameBoard.firstChild) {
        this.#gameBoard.removeChild(this.#gameBoard.firstChild)
      }

      // parameter box = value in the box aka O/X
      // index = index for boxes
      // create a element for each box on the board
      this.#board.forEach((box, index) => {
        const boxElement = document.createElement('div')
        boxElement.classList.add('box')
        boxElement.textContent = box

        // Change the textcontent and style depending on O/X
        if (box === 'X') {
          boxElement.textContent = 'X'
          boxElement.classList.add('xStyle')
        } else if (box === 'O') {
          boxElement.textContent = 'O'
          boxElement.classList.add('oStyle')
        }

        boxElement.addEventListener('click', () => this.#handleBoxClick(index), { signal: this.#abortController.signal })

        this.#gameBoard.appendChild(boxElement)
      })
    }

    /**
     * Handles a click on a box.
     *
     * @param {number} index - The index of the clicked box.
     */
    #handleBoxClick (index) {
    // if the box isnt empty or the game is over do nothing
      if (this.#board[index] !== '' || this.#isGameOver) return

      this.#board[index] = this.#currentPlayer
      this.#checkWinner()
      if (this.#currentPlayer === 'X') {
        this.#currentPlayer = 'O'
      } else {
        this.#currentPlayer = 'X'
      }
      this.#updateStatus()
      this.#createBoard()
    }

    /**
     * Checks if there is a winner or a draw.
     */
    #checkWinner () {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ]

      // go through every winningCombo
      for (const combo of winningCombos) {
        const [a, b, c] = combo
        // see if a.b,c is all X/O
        if (this.#board[a] && this.#board[a] === this.#board[b] && this.#board[a] === this.#board[c]) {
          this.#status.textContent = `Player ${this.#board[a]} Wins!🥇`
          this.#isGameOver = true
          return
        }
      }
      // if noone has won and all boxes has X/O its a draw
      if (!this.#isGameOver && this.#board.every(box => box !== '')) {
        this.#status.textContent = 'It\'s a Draw!🥈'
        this.#isGameOver = true
      }
    }

    /**
     * Updates the status message as long as the game isn't over
     */
    #updateStatus () {
      if (!this.#isGameOver) {
        this.#status.textContent = `Player ${this.#currentPlayer}'s Turn`
      }
    }

    /**
     * Restarts the game.
     * Gives the board the original state
     */
    #restartGame () {
      this.#board = ['', '', '', '', '', '', '', '', '']
      this.#currentPlayer = 'X'
      this.#isGameOver = false
      this.#createBoard()
      this.#updateStatus()
    }
  }
)
