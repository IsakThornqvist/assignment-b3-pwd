export const template = document.createElement('template')

template.innerHTML = `
<!--     <p id="scoreAndTime">Score: <span id="score"></span> | Time:<span id="time"></span></p> -->
    <div id="scoreAndTime">
    <p id="score"> Score:</p>
    <p id="time"> Time:</p>
</div>

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
