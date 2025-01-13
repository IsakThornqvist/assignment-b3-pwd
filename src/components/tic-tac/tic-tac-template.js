export const template = document.createElement('template')

template.innerHTML = `
<div id="gameBoard"></div>
<div id="gameStatus" class = 'statusDesign'></div>
<button id="restartButton">Restart Game!</button>

<style>
  #gameBoard {
    display: grid;
    grid-template-columns: repeat(3, 100px);
    grid-gap: 5px;
    margin: 20px auto;
    justify-content: center;
  }
.statusDesign {
    color: rgb(63, 104, 192);
}
  .box {
    width: 100px;
    height: 100px;
    background-color: #fff;
    border: 1px solid rgb(241, 190, 48);
    font-size: 2rem;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .oStyle {
    color: rgb(63, 104, 192);
  }

  .xStyle {
    color: red;
  }

  .box:hover {
    background-color: #f0f0f0;
  }

  #gameStatus {
    text-align: center;
    margin-top: 10px;
    font-size: 1.2rem;
  }

  #restartButton {
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    background-color:rgb(241, 190, 48);
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

</style>
`
