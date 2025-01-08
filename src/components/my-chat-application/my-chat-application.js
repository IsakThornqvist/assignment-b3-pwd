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
    }

    /**
     * Called when the element is added to the DOM.
     */
    connectedCallback () {
      const savedUsername = LocalStorage.getSavedUsername()
      if (savedUsername) {
        this.#userName = savedUsername
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
        console.log('welcome back', savedUsername)
      } else {
        this.shadowRoot.querySelector('my-username').classList.remove('hidden')
      }

      this.#sendButton.addEventListener('click', () => this.getMessage())
      this.#textInput.addEventListener('keydown', event => {
        if (event.key === 'Enter') {
          event.preventDefault()
          this.getMessage()
        }
      })

      this.shadowRoot.addEventListener('username-submitted', event => {
        this.#userName = event.detail.nickname
        localStorage.setItem('username', this.#userName)
        this.#sendButton.classList.remove('hidden')
        this.#textInput.classList.remove('hidden')
      })

      const clearLocalStorageButton = this.shadowRoot.querySelector('#clearLocalStorageButton')
      clearLocalStorageButton.addEventListener('click', () => {
        localStorage.clear()
        console.log('Local Storage cleared')
        this.#userName = null
        this.shadowRoot.querySelector('my-username').classList.remove('hidden')
        this.#sendButton.classList.add('hidden')
        this.#textInput.classList.add('hidden')
      })

      this.loadMessageFromLocalStorage()
      this.connectWebSocket()
    }

    /**
     *
     */
    connectWebSocket () {
      if (this.#socket) {
        this.#socket.removeEventListener('message', this.#onMessageHandler)
      }

      this.#socket = new window.WebSocket('wss://courselab.lnu.se/message-app/socket')

      /**
       *
       * @param event
       */
      this.#onMessageHandler = event => {
        const receivedData = JSON.parse(event.data)
        if (receivedData.type !== 'heartbeat') {
          this.#displayMessages(receivedData)
          this.saveMessageToLocalStorage(receivedData)
        }
      }

      this.#socket.addEventListener('open', event => {
        console.log('WebSocket connection established')
      })

      this.#socket.addEventListener('message', this.#onMessageHandler)

      this.#socket.addEventListener('close', event => {
        console.warn('WebSocket connection closed, attempting to reconnect')
        setTimeout(() => this.connectWebSocket(), 5000)
      })

      this.#socket.addEventListener('error', error => {
        console.error('websocket error', error)
      })
    }

    /**
     *
     * @param message
     */
    #displayMessages (message) {
      const messageKey = `${message.username}-${message.data}`
      if (this.#processedMessages.has(messageKey)) {
        return
      }
      this.#processedMessages.add(messageKey)
      const myMessengeElement = document.createElement('div')

      const myUserNameElement = document.createElement('span')
      myUserNameElement.textContent = `${message.username || 'Unknown'}:`
      myUserNameElement.classList.add('username')

      const messageElement = document.createElement('span')
      messageElement.textContent = `${message.data || message}`
      messageElement.classList.add('bold')

      myMessengeElement.appendChild(myUserNameElement)
      myMessengeElement.appendChild(messageElement)
      myMessengeElement.classList.add('messageStyle')

      this.#messageArea.appendChild(myMessengeElement)
    }

    /**
     *
     * @param message
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
     *
     * @param message
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
     *
     */
    loadMessageFromLocalStorage () {
      const messages = JSON.parse(localStorage.getItem('messages')) || []
      messages.forEach(message => this.#displayMessages(message))
    }

    /**
     * Called when the element is removed from the DOM.
     */
    disconnectedCallback () {
      if (this.#socket) {
        this.#socket.close()
      }
    }
  })
