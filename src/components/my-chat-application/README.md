# my-chat-application Web Component
A custom element that represents a chat application with features such as sending and receiving messages via WebSocket, local storage for message persistence, and user name management.

# Attributes
The <my-chat-application> component does not have any custom attributes. Its functionality is managed internally and is based on user interaction and WebSocket communication.

# Events
Event Name	Fired When
username-submitted	The username is successfully submitted by the user.

# Example
<my-chat-application></my-chat-application>

# Result
A chat application where:

Users can submit a username.
After the username is set, they can send messages to the WebSocket server.
Messages are displayed in the chat window, with a button to delete messages.
Previous messages are loaded from local storage and displayed upon re-entering the app.
