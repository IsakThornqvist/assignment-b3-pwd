import { template } from './quiz-question-template.js'

/**
 * Defines a custom element 'quiz-questions' which handles quiz questions.
 */
customElements.define('quiz-questions',
  /**
   * A class representing a quiz question element.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLElement}
     * @description The form element for the quiz.
     */
    #quizForm

    /**
     * @private
     * @type {HTMLElement}
     * @description The input element for the quiz answer.
     */
    #questionAnswer

    /**
     * @private
     * @type {HTMLElement}
     * @description The element that presents the quiz question.
     */
    #questionPresenter

    /**
     * @private
     * @type {string}
     * @description The URL for fetching the next quiz question.
     */
    #nextURL

    /**
     * @private
     * @type {HTMLElement}
     * @description The element that contains the quiz question alternatives.
     */
    #questionAlternatives

    /**
     * @private
     * @type {HTMLElement}
     * @description The button element for submitting the quiz answer.
     */
    #questionSubmitButton

    /**
     * @private
     * @type {number}
     * @description The time limit for answering the quiz question.
     */
    #limit

    /**
     * @private
     * @type {number}
     * @description The index of the current alternative being displayed.
     */
    #currentAlternativeIndex = 0

    /**
     * Creates an instance of the quiz question element and attaches a shadow DOM.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#quizForm = this.shadowRoot.querySelector('#quizForm')
      this.#questionAnswer = this.shadowRoot.querySelector('#questionInput')
      this.#questionPresenter = this.shadowRoot.querySelector('#questionText')
      this.#questionAlternatives = this.shadowRoot.querySelector('#questionAlternatives')
      this.#questionSubmitButton = this.shadowRoot.querySelector('#questionButton')
    }

    /**
     * Called when the element is connected to the document's DOM.
     */
    connectedCallback () {
      this.#quizForm.addEventListener('submit', event => {
        event.preventDefault()
        // Check if a radio button is selected
        const selectedRadio = this.#questionAlternatives.querySelector('input[type="radio"]:checked')
        if (selectedRadio) {
          // If a button is selected submit its value
          this.submitAnswer(selectedRadio.value)
        } else if (this.#questionAnswer.value.trim()) {
          this.submitAnswer()
        } else {
          console.warn('No answer selected or provided')
        }
      })

      document.addEventListener('keydown', this.keyboardInput.bind(this))
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     */
    disconnectedCallback () {
      document.removeEventListener('keydown', this.keyboardInput.bind(this))
    }

    /**
     * Fetches question data from the given URL.
     *
     * @param {string} url - The URL to fetch question data from.
     */
    async fetchQuestionData (url) {
      try {
        const response = await window.fetch(url)

        if (!response.ok) {
          throw new Error(`Error! Status: ${response.status}`)
        }

        const data = await response.json()
        this.#questionPresenter.textContent = data.question
        this.#nextURL = data.nextURL
        this.#limit = data.limit || 20

        this.dispatchEvent(new CustomEvent('question-timer-limit', {
          detail: { limit: this.#limit },
          bubbles: true,
          composed: true
        }))

        this.clearPreviousData()

        if (data.alternatives) {
          this.renderAlternatives(data.alternatives)
          this.#questionSubmitButton.style.display = 'none'
          this.#questionAnswer.style.display = 'none'
        } else {
          this.#questionAnswer.style.display = 'block'
          this.#questionSubmitButton.style.display = 'block'
        }
      } catch (error) {
        console.error('Error fetching the quiz data', error)
      }
    }

    /**
     * Clears previous question data.
     */
    clearPreviousData () {
      while (this.#questionAlternatives.firstChild) {
        this.#questionAlternatives.removeChild(this.#questionAlternatives.firstChild)
      }
      this.#questionAnswer.style.display = 'none'
      this.#questionAnswer.value = ''
    }

    /**
     * Renders the question alternatives.
     *
     * @param {object} alternatives - The alternatives for the question.
     */
    renderAlternatives (alternatives) {
      // Removes all existing child elements
      while (this.#questionAlternatives.firstChild) {
        this.#questionAlternatives.removeChild(this.#questionAlternatives.firstChild)
      }

      this.#questionAnswer.style.display = 'none'
      // Convert the alternatives object into an array of key, value pairs
      const alternativesArray = Object.entries(alternatives)

      // Iterate through and create the elements
      alternativesArray.forEach(([key, value], index) => {
        const li = document.createElement('li')

        // Create a radio button input element for the alternative
        const radio = document.createElement('input')
        radio.type = 'radio' // Set input type to 'radio'
        radio.name = 'quiz-alternatives' // Group all radio buttons under the same name
        radio.id = `alternative-${index}` // Assign a unique ID to the radio button
        radio.value = key
        radio.dataset.index = index // Store the index as a dataset property for navigation

        // Create a label element associated with the radio button
        const label = document.createElement('label')
        label.htmlFor = radio.id
        label.textContent = value

        li.appendChild(radio)
        li.appendChild(label)
        this.#questionAlternatives.appendChild(li)
      })

      this.updateSelectedAlternative(0)
    }

    /**
     * Handles keyboard input for navigating alternatives.
     *
     * @param {KeyboardEvent} event - The keyboard event.
     */
    keyboardInput (event) {
      // Check if there are any radio buttons in the alternatives 'container'
      if (this.#questionAlternatives.querySelectorAll('input[type="radio"]').length > 0) {
        if (event.key === 'ArrowDown') {
          this.navigateAlternatives('down')
        } else if (event.key === 'ArrowUp') {
          this.navigateAlternatives('up')
        } else if (event.key === 'Enter') {
          const selectedRadio = this.#questionAlternatives.querySelector('input[type="radio"]:checked')
          if (selectedRadio) {
            // Submit the value of the selected radio button
            this.submitAnswer(selectedRadio.value)
          }
        }
      }
    }

    /**
     * Navigates through the alternatives using the keyboard.
     *
     * @param {string} direction - The direction to navigate ('up' or 'down').
     */
    navigateAlternatives (direction) {
      const radios = Array.from(this.#questionAlternatives.querySelectorAll('input[type="radio"]'))
      const totalAlternatives = radios.length // Get the number of alternatives

      // Handles down movement
      if (direction === 'down') {
        // Increment the current alternative index and wrap around using modulo operator
        this.#currentAlternativeIndex = (this.#currentAlternativeIndex + 1) % totalAlternatives
        // Handles up movement
      } else if (direction === 'up') {
        // Decrement the current index and wrap around by adding totalAlternatives for negative values
        this.#currentAlternativeIndex = (this.#currentAlternativeIndex - 1 + totalAlternatives) % totalAlternatives
      }

      radios[this.#currentAlternativeIndex].checked = true
    }

    /**
     * Updates the selected alternative based on the given index.
     *
     * @param {number} index - The index of the alternative to select.
     */
    updateSelectedAlternative (index) {
      const radios = this.#questionAlternatives.querySelectorAll('input[type="radio"]')
      radios.forEach((radio, i) => {
        radio.checked = i === index
      })
    }

    /**
     * Submits the answer.
     *
     * @param {string|null} [selectedKey=null] - The selected key for the answer.
     */
    async submitAnswer (selectedKey = null) {
      // If a selectedKey is provided use it. Otherwise, use the text input value.
      const answerData = selectedKey ? { answer: selectedKey } : { answer: this.#questionAnswer.value }

      try {
        const response = await fetch(this.#nextURL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(answerData)
        })

        if (!response.ok) {
          const errorMessage = await response.json()
          throw new Error(`Error! Status: ${response.status} - ${errorMessage.message}`)
        }

        const data = await response.json()
        // If there's a next question URL, fetch the next question
        if (data.nextURL) {
          this.fetchQuestionData(data.nextURL)
        } else {
          // If no next URL, dispatch an event signaling the quiz is complete
          this.dispatchEvent(new CustomEvent('quiz-ended-all-correct', {
            detail: { message: data.message || 'Quiz finished!' },
            bubbles: true,
            composed: true
          }))
        }
      } catch (error) {
        console.error('Error submitting the answer', error)
        // Dispatch an event signaling the quiz ended due to a wrong answer
        this.dispatchEvent(new CustomEvent('quiz-ended-wrong-answer', {
          detail: { message: 'Wrong answer.' },
          bubbles: true,
          composed: true
        }))
      }
    }
  }
)
