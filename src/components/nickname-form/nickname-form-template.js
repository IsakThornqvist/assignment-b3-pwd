export const template = document.createElement('template')

template.innerHTML = `
<h2 id='nicknameHeader'> Enter your nickname to start the quiz</h2>
<form id='nicknameForm'> 
<input id='nicknameInput' placeholder='Input your nickname'> </input>
<button id='nicknameButton' type='submit'> Submit</button>
</form>

<style> 
#nicknameHeader {
    color: rgb(241, 190, 48);
    font-family: 'arial';
    text-align: center;
}

#nicknameHeader:hover {
    color: orange;
    transition: 1s;
}

#nicknameForm {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

#nicknameInput {
    width: 80%;
    max-width: 250px;
    padding: 10px;
    font-size: 16px;
    border: 2px solid rgb(241, 190, 48);
    border-radius: 5px;
    outline: none;
    transition: border-color 0.3s ease-in-out;
    margin-bottom: 5px;
}

#nicknameInput:focus {
    border-color: orange;
  }

  #nicknameInput:hover {
    border-color: orange;
    transition: 1s;
  }

  #nicknameButton {
    background-color: rgb(241, 190, 48);
    color: black;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

  }

  #nicknameButton:hover {
    background-color: orange;
  }
</style>
`
