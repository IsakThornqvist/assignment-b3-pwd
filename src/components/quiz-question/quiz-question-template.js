export const template = document.createElement('template')

template.innerHTML = `
<form id="quizForm">
  <p id="questionText">The question will be shown here:</p>
  <input id="questionInput" type="text" placeholder="Answer here">
  <button id="questionButton" type="submit">Submit Answer</button>
  <ul id='questionAlternatives'> 

  </ul>
</form>

<style>
  #quizForm {
    padding: 20px;
    margin-top: 20px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

  }
  #questionText {
    font-size: 25px;
    margin-bottom: 10px;
    font-family: 'arial';
    color: rgb(241, 190, 48);
  }
   .alternative-button {
    padding: 10px;
    margin: 5px;
    background-color: rgb(241, 190, 48);
    border: 2px solid orange;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
  }
  .alternative-button:hover {
    background-color: orange;
    border-color: rgb(241, 190, 48);
  } 

  .alternative-button.selected {
  background-color: orange; 
  color: black;
  border-color:rgb(241, 190, 48);
}
  #questionText:hover {
    color: orange;
    transition: 1s;
  }
  #questionInput {
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
  #questionInput:focus {
    border-color: orange;
  }
  #questionInput:hover {
    border-color: orange;
  }
  #questionButton {
    background-color: rgb(241, 190, 48);
    color: black;
    border: 2px solid orange;
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s ease-in-out;

  }
  #questionButton:hover {
    background-color: orange;
    transition: 1s;
    border-color: rgb(241, 190, 48);
  }
</style>
`
