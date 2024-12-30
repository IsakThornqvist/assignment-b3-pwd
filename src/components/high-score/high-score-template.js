export const template = document.createElement('template')

template.innerHTML = `
<div id='highScoreContainer'>
    <h2 id='highScoreHeader'>Highscore List!</h2>
    <ul id='highScoreList'> 

    </ul>
    <p id='highScoreMessage'>Great job if you see your name!</p>
    <button id='resetButton'> Restart Quiz</button>
    <button id='clearHighScores'> Clear Highscores</button>
</div>

<style> 
#highScoreContainer {
    background-color: #f9f9f9;
    border: 2px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    max-width: 400px;
    margin: auto;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    font-family: 'Arial', sans-serif;
}

#highScoreHeader {
    text-align: center;
    font-size: 1.8rem;
    color: rgb(241, 190, 48);
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    border-bottom: 2px solid #4a4a4a;
    padding-bottom: 10px;
}

#highScoreHeader:hover {
    color: orange;
    transition: 1s;
}

#highScoreList {
    list-style-type: none;
    padding: 0;
    margin: 0;
    font-size: 1.2rem;
    color: #333;
}

#highScoreList li {
    padding: 10px;
    margin: 5px 0;
    border-radius: 5px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    border-left: 4px solid rgb(241, 190, 48);
    transition: all 0.3s ease;
}

#highScoreList li:hover {
    background-color: #f0f8ff;
    border-left: 4px solid orange;
    transform: translateX(5px);
}


#highScoreMessage {
    text-align: center;
    font-size: 1rem;
    color: rgb(241, 190, 48);
    margin-top: 15px;
    font-style: arial;
}

#highScoreMessage:hover {
    color: orange;
    transition: 1s;
}

#resetButton {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgb(241, 190, 48);
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #resetButton:hover {
    background-color: orange;
    transition: 1s;
    color: black;
  }

  #clearHighScores {
    margin-top: 20px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: rgb(63, 104, 192);
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  #clearHighScores:hover {
    background-color: orange;
    transition: 1s;
    color: black;
  }
</style>
`
