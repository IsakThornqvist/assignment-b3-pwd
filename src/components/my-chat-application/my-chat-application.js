import { template } from './my-chat-application-template.js'
import '../my-username/index.js'
import { LocalStorage } from '../local-storage/local-storage.js'

customElements.define('my-chat-application',

  /**
   * Custom element representing a chat application.
   */
  class extends HTMLElement {
    #myChat
    #sendButton
    #textInput
    #userName
    #messageArea
    #socket
    #processedMessages = new Set()
    #onMessageHandler
    #userNameShower
    #abortController = new AbortController()

    /**
     * Constructor for the my-chat-application element.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
      this.shadowRoot.appendChild(template.content.cloneNode(true))
      this.#myChat = this.shadowRoot.querySelector('#my-chat-application')
      this.#sendButton = this.shadowRoot.querySelector('#sendButton')
      this.#textInput = this.shadowRoot.querySelector('#textInput')
      this.#messageArea = this.shadowRoot.querySelector('#messageArea')
      this.#userNameShower = this.shadowRoot.querySelector('#chattingName')
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const signal = this.#abortController.signal

      const savedUsername = LocalStorage.getSavedUsername()
      if (savedUsername) {
        this.#userName = savedUsername
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
        this.#messageArea.classList.remove('hidden')
        this.#userNameShower.classList.remove('hidden')
      } else {
        this.shadowRoot.querySelector('my-username').classList.remove('hidden')
      }

      this.#sendButton.addEventListener('click', () => this.getMessage())
      this.#textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.getMessage()
        }
      }, { signal })

      this.shadowRoot.addEventListener('username-submitted', event => {
        this.#userName = event.detail.nickname
        localStorage.setItem('username', this.#userName)
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
        this.#messageArea.classList.remove('hidden')
        this.#userNameShower.classList.remove('hidden')
      }, { signal })

      this.loadMessageFromLocalStorage()
      this.connectWebSocket()
    }

    /**
     * Connects to the WebSocket server.
     */
    connectWebSocket () {
      if (this.#socket) {
        this.#socket.removeEventListener('message', this.#onMessageHandler)
      }

      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')
      /**
       * Handles incoming WebSocket messages.
       *
       * @param {MessageEvent} event - The message event from the WebSocket.
       */
      this.#onMessageHandler = event => {
        const receivedData = JSON.parse(event.data)
        if (receivedData.type !== 'heartbeat') {
          this.#displayMessages(receivedData)
          this.saveMessageToLocalStorage(receivedData)
        }
      }

      this.#socket.addEventListener('open', () => {
        console.log('WebSocket connection established')
      })

      this.#socket.addEventListener('message', this.#onMessageHandler)

      this.#socket.addEventListener('close', () => {
        console.warn('WebSocket connection closed, attempting to reconnect')
        setTimeout(() => this.connectWebSocket(), 5000)
      })

      this.#socket.addEventListener('error', error => {
        console.error('websocket error', error)
      })
    }

    /**
     * Displays a message in the chat area.
     *
     * @param {object} message - The message to display.
     */
    #displayMessages (message) {
      const messageKey = `${message.username}-${message.data}`
      if (this.#processedMessages.has(messageKey)) {
        return
      }
      this.#processedMessages.add(messageKey)

      const myMessengeElement = document.createElement('div')
      myMessengeElement.classList.add('messageStyle')
      myMessengeElement.setAttribute('data-message-key', messageKey)

      const myUserNameElement = document.createElement('span')
      myUserNameElement.textContent = `${message.username || 'Unknown'}:`
      myUserNameElement.classList.add('username')

      const messageElement = document.createElement('span')
      messageElement.textContent = `${message.data || message}`
      messageElement.classList.add('bold')

      const deleteButton = document.createElement('button')
      deleteButton.textContent = 'Delete'
      deleteButton.classList.add('delete-button', 'hidden')
      deleteButton.addEventListener('click', () => this.deleteMessage(messageKey, myMessengeElement))

      myMessengeElement.addEventListener('click', () => {
        deleteButton.classList.toggle('hidden')
      })

      myMessengeElement.appendChild(myUserNameElement)
      myMessengeElement.appendChild(messageElement)
      myMessengeElement.appendChild(deleteButton)

      this.#messageArea.appendChild(myMessengeElement)
      this.#messageArea.scrollTop = this.#messageArea.scrollHeight
      this.#userNameShower.classList.add('username2')
      this.#userNameShower.textContent = `Chatting as: ${this.#userName}`
    }

    /**
     * Deletes a message from the chat and local storage.
     *
     * @param {string} messageKey - The unique key of the message to delete.
     * @param {HTMLElement} messageElement - The HTML element representing the message.
     */
    deleteMessage (messageKey, messageElement) {
      // Remove from local storage
      const messages = JSON.parse(localStorage.getItem('messages')) || []
      const updatedMessages = messages.filter(message => {
        const currentMessageKey = `${message.username}-${message.data}`
        return currentMessageKey !== messageKey
      })
      localStorage.setItem('messages', JSON.stringify(updatedMessages))

      // Remove from DOM
      messageElement.remove()
      this.#processedMessages.delete(messageKey)

      console.log(`Message with key "${messageKey}" deleted`)
    }

    /**
     * Sends a message through the WebSocket.
     */
    getMessage () {
      const theMessage = this.#textInput.value.trim()

      if (theMessage) {
        const messageData = {
          type: 'message',
          data: theMessage,
          username: this.#userName,
          channel: 'default-channel',
          key: 'eDBE76deU7L0H9mEBgxUKVR0VCnq0XBd'
        }
        if (this.#socket && this.#socket.readyState === WebSocket.OPEN) {
          this.#socket.send(JSON.stringify(messageData))
        } else {
          console.warn('WebSocket not open no message sent')
        }
        this.#textInput.value = ''
      } else {
        console.log('Message is empty')
      }
    }

    /**
     * Saves a message to local storage.
     *
     * @param {object} message - The message to save.
     */
    saveMessageToLocalStorage (message) {
      const messages = JSON.parse(localStorage.getItem('messages')) || []
      messages.push(message)

      if (messages.length > 20) {
        messages.shift()
      }
      localStorage.setItem('messages', JSON.stringify(messages))
    }

    /**
     * Loads messages from local storage and displays them.
     */
    loadMessageFromLocalStorage () {
      const messages = JSON.parse(localStorage.getItem('messages')) || []
      messages.forEach(message => this.#displayMessages(message))
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      this.#abortController.abort()
      if (this.#socket) {
        this.#socket.close()
      }
    }
  })
