export const template = document.createElement('template')

template.innerHTML = `

<div id='my-nickname'>
      <form id="textArea">
        <textarea id="textInput" rows='10' cols='35' placeholder="Enter your Username"></textarea>
      </form>
    </div>  
      <button type="submit" id="sendButton">Submit Username</button>
</div>


<style> 

#sendButton {
    background-color: rgb(241, 190, 48);
    color: rgb(63, 104, 192);
    border: none;
    padding: 10px 20px;
    font-size: 16px;
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
  }


</style>



`
