# My Window Web Component
A web component that represents a draggable and closeable window. This component allows users to move the window by dragging its title bar, close it with a button, and provides events for interaction.

# Attributes
The <my-window> component does not use any custom attributes. It is fully functional as-is and manages its behavior internally.

# Events
Event Name	Fired When
window-clicked	The window is clicked or focused.
window-closed	The close button is clicked, and the window is closed.


window-closed
Fired when the close button is clicked, and the window is removed.
detail.window: The instance of the window element.

newTitle (string): The new title to display in the window's title bar.
# Example

<my-window></my-window>

# Result
A draggable and closeable window component. Users can move the window by dragging the title bar and close it by clicking the close button. Can be used to place apps inside of.