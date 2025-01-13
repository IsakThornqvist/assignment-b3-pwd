export const template = document.createElement('template')

template.innerHTML = `
<div id='my-chat-application'>
    <my-username> </my-username>
        <div id='messageContainer' class='hidden'> </div>
        <textarea id="textField" cols='35' rows='2' placeholder="Send a message" class='hidden'></textarea>
    </div>
    <p id='chattingName' class='hidden'></p>  
      <button type="submit" id="sendButton" class='hidden'>Send</button>
</div>


<style> 
.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  cursor: pointer;
  margin-left: 10px;
}


#sendButton {
    background-color: rgb(241, 190, 48);
    color: rgb(63, 104, 192);
    border: none;
    padding: 10px 20px;
    font-size: 12px;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;
    margin-top: 5px;
    border: 2px solid rgb(63, 104, 192);
}



#sendButton:hover {
    transition: 1s;
    color: rgb(63, 104, 192);
    background-color: rgb(255, 187, 0);
  }

  #textInput {
    border: 2px solid rgb(241, 190, 48);
    margin-top: 10px;
  }

  .hidden {
    display: none;
    
  }
  #messageArea {
  max-height: 400px; 
  overflow-y: auto;
  padding: 10px; 
  border: 1px solid #ccc; 
  background-color: #f9f9f9;
  }

  .username {
    color: rgb(241, 190, 48);
    font-weight: bold;
    margin-right: 5px; 
  }

  .username2 {
    color: rgb(63, 104, 192);
    font-weight: bold;
    margin-right: 5px;
  }

  .bold {
    font-weight: bold;
  }

.messageStyle {
    padding-bottom: 10px;
}



</style>
`
