export const template = document.createElement('template')

template.innerHTML = `
<memory-timer id='memoryTimer'> </memory-timer>
<div id='memory-board'> 

</div>

<div id='buttonContainer'> 
<button id='resetButton'> Reset Game</button>
<button id='button4x4'>4x4</button>
<button id='button4x2'>4x2</button>
<button id='button2x2'>2x2</button>
</div>




<style>

#memory-board {
    color: black;
    display: grid;
    gap: 0.5rem;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 2px;
}

#resetButton {
    width: 100px;
    height: 55px;
    background-color: rgb(63, 104, 192);
    border-radius: 15px;
}
#button4x4 {
    width: 100px;
    height: 55px;
    background-color: rgb(63, 104, 192);
    border-radius: 15px;
}
#button4x2 {
    width: 100px;
    height: 55px;
    background-color: rgb(63, 104, 192);
    border-radius: 15px;
}
#button2x2 {
    width: 100px;
    height: 55px;
    background-color: rgb(63, 104, 192);
    border-radius: 15px;
}

#buttonContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    margin-top: 20px;
}

</style>

`
