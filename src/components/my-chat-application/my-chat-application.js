import { template } from './my-chat-application-template.js'

customElements.define('my-chat-application',


class extends HTMLElement {
    #myChat
    constructor () {
    super ()

    this.attachShadow({ mode: 'open' })
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.#myChat = this.shadowRoot.querySelector('#my-chat-application')
}

connectedCallback () {

}

disconnectedCallback () {
    
}

})