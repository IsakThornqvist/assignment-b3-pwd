export const template = document.createElement('template')

template.innerHTML = `
<div id="timerContainer">
  <p id="timerText">Time Left: <span id="timerValue"></span> seconds</p>
  <style>
    #timerContainer {
      margin-top: 10px;
      font-size: 20px;
      color: rgb(241, 190, 48);
      text-align: center;
    }

    #timerText {
      font-family: Arial, sans-serif;
      font-weight: bold;
      color: black;
    }

    #timerValue {
      font-size: 24px;
      color: rgb(241, 190, 48);
    }
  </style>
</div>
`
