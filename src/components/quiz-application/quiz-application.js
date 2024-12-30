import '../nickname-form/index.js'
import '../countdown-timer/index.js'
import '../quiz-question/index.js'
import '../high-score/index.js'
import { template } from './quiz-application-template.js'

/**
 * Defines a custom element 'quiz-application' which handles the quiz application.
 */
customElements.define('quiz-application',
  /**
   * A class representing a quiz application element.
   */
  class extends HTMLElement {
    /**
     * @private
     * @type {HTMLElement}
     * @description The element that handles quiz questions.
     */
    #quizQuestions

    /**
     * @private
     * @type {HTMLElement}
     * @description The element that handles the countdown timer.
     */
    #countdownTimer

    /**
     * @private
     * @type {HTMLElement}
     * @description The element that handles the nickname form.
     */
    #nicknameForm

    /**
     * @private
     * @type {HTMLElement}
     * @description The element that displays the high score.
     */
    #highScore
    /**
     * @private
     * @type {number}
     * @description The current time limit for the quiz, default is 20 seconds.
     */
    #currentLimit = 20

    /**
     * @private
     * @type {AbortController}
     * @description The AbortController to abort fetch requests when disconnected.
     */
    #abortController = new AbortController()

    /**
     * Creates an instance of the quiz application element and attaches a shadow DOM.
     * Initializes the elements for quiz questions, countdown timer, nickname form, and high score.
     */
    constructor () {
      super()
      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#quizQuestions = this.shadowRoot.querySelector('#quiz-questions')
      this.#countdownTimer = this.shadowRoot.querySelector('#countdown-timer')
      this.#nicknameForm = this.shadowRoot.querySelector('#nickname-form')
      this.#highScore = this.shadowRoot.querySelector('#high-score')
    }

    /**
     * Called when the element is connected to the document's DOM.
     */
    connectedCallback () {
      this.#nicknameForm.addEventListener('nickname-submitted', this.handleNicknameSubmitted)

      this.#quizQuestions.addEventListener('question-timer-limit', this.handleQuestionTimerLimit)

      this.#countdownTimer.addEventListener('timer-ended', this.handleQuizEndedOutOfTime)

      this.addEventListener('reset-quiz', this.handleResetQuiz)

      this.#quizQuestions.addEventListener('quiz-ended-wrong-answer', this.handleQuizEndedWrongAnswer)

      this.#quizQuestions.addEventListener('quiz-ended-all-correct', this.handleQuizEndedAllCorrect)
    }

    /**
     * Called when the element is disconnected from the document's DOM.
     * Aborts any ongoing fetch requests and removes event listeners.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      this.#nicknameForm.removeEventListener('nickname-submitted', this.handleNicknameSubmitted)

      this.#quizQuestions.removeEventListener('question-timer-limit', this.handleQuestionTimerLimit)

      this.#countdownTimer.removeEventListener('timer-ended', this.handleQuizEndedOutOfTime)
      this.removeEventListener('reset-quiz', this.handleResetQuiz)

      this.#quizQuestions.removeEventListener('quiz-ended-wrong-answer', this.handleQuizEndedWrongAnswer)

      this.#quizQuestions.removeEventListener('quiz-ended-all-correct', this.handleQuizEndedAllCorrect)
    }

    /**
     * Handles the nickname submitted event.
     *
     * @param {Event} event - The event object.
     */
    handleNicknameSubmitted = (event) => {
      this.nickname = event.detail.nickname

      this.showQuestionAndTimer()
      this.startQuiz()
    }

    /**
     * Handles the question timer limit event.
     *
     * @param {Event} event - The event object.
     */
    handleQuestionTimerLimit = (event) => {
      const { limit } = event.detail
      this.#currentLimit = limit || 20
      this.#countdownTimer.setAttribute('limit', this.#currentLimit)
      this.#countdownTimer.resetTimer(this.#currentLimit)
    }

    /**
     * Handles the timer ended event.
     */
    handleQuizEndedOutOfTime = () => {
      console.log('Timer ended! Game over.')
      this.showHighScoreList()
      this.#countdownTimer.resetElapsedTime()
    }

    /**
     * Handles the reset quiz event.
     */
    handleResetQuiz = () => {
      this.resetQuiz()
      this.#countdownTimer.stopCountdown()
      this.#quizQuestions.updateSelectedAlternative(-1)
    }

    /**
     * Handles the quiz ended with a wrong answer event.
     *
     * @param {Event} event - The event object.
     */
    handleQuizEndedWrongAnswer = (event) => {
      console.log('Quiz ended:', event.detail.message)
      this.showHighScoreList()
      this.#countdownTimer.resetTimer(this.#currentLimit)
      this.#countdownTimer.stopCountdown()
      this.#countdownTimer.resetElapsedTime()
    }

    /**
     * Handles the quiz ended with all correct answers event.
     *
     * @param {Event} event - The event object.
     */
    handleQuizEndedAllCorrect = (event) => {
      console.log('Quiz ended:', event.detail.message)
      const elapsedTime = this.#countdownTimer.elapsedTime

      // Add to high score list
      this.#highScore.addHighScore(this.nickname, elapsedTime)

      console.log(`${this.nickname} completed the quiz in ${elapsedTime} seconds`)
      this.showHighScoreList()
      this.#countdownTimer.resetTimer(this.#currentLimit)
      this.#countdownTimer.stopCountdown()
      this.#countdownTimer.resetElapsedTime()
    }

    /**
     * Starts the quiz by fetching the first question.
     */
    startQuiz () {
      this.#quizQuestions.fetchQuestionData('https://courselab.lnu.se/quiz/question/1', { signal: this.#abortController.signal })
    }

    /**
     * Shows the question and timer elements, hides the nickname form.
     */
    showQuestionAndTimer () {
      this.#nicknameForm.classList.add('hide')
      this.#quizQuestions.classList.remove('hide')
      this.#countdownTimer.classList.remove('hide')
    }

    /**
     * Shows the high score list by removing the 'hide' class.
     */
    showHighScoreList () {
      this.#nicknameForm.classList.add('hide')
      this.#quizQuestions.classList.add('hide')
      this.#countdownTimer.classList.add('hide')
      this.#highScore.classList.remove('hide')
    }

    /**
     * Resets the quiz by hiding the high score and showing the nickname form.
     * Also hides the quiz questions and countdown timer, and clears the nickname input field.
     */
    resetQuiz () {
      this.#highScore.classList.add('hide')
      this.#nicknameForm.classList.remove('hide')
      this.#quizQuestions.classList.add('hide')
      this.#countdownTimer.classList.add('hide')

      const nicknameInput = this.#nicknameForm.shadowRoot.querySelector('input')
      if (nicknameInput) {
        nicknameInput.value = ''
      }
      this.#countdownTimer.stopCountdown()
    }
  }
)
