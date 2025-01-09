export const template = document.createElement('template')

template.innerHTML = `
    <p id="scoreAndTime">Score: <span id="score">0</span> | Time: <span id="time">00:00</span></p>

<style>
    #scoreAndTime {
        font-size: 1.5rem;
        font-weight: bold;
        align-items: center;
        margin: 0;
        color: rgb(63, 104, 192);
        display: flex;
        justify-content: space-between;
        width: 300px;
        padding: 10px;
      }
      </style>
`
