export const template = document.createElement('template')

template.innerHTML = `
<div id='desktopContainer'> 
<img id='backGroundImage' src='img/RM-LOGO.png' alt='Real Madrid logo'>
    <div id='desktop'>

    </div>
</div>

<div id='taskBar'>
    <button class='appIcon' id='appLogo1'>
        <img class='iconImage' src='img/MEMORY-ICON.png' alt='Memory Logo'>
    </button>
    <button class='appIcon' id='appLogo2'>
        <img class='iconImage' src='img/CHAT-LOGO.png' alt='Chat Logo'>
    </button>
    <button class='appIcon' id='appLogo3'>
        <img class='iconImage' src='img/QUIZ-LOGO.png' alt='Quiz Logo'>
    </button>
</div>

<style>
   .iconImage {
        width: 40px; /* Sätt storleken på bilderna */
        height: auto; /* Bevarar proportionerna */
        display: block;
        margin: auto;
    }
#backGroundImage {
        width: 800px; /* Bredden på bilden */
        height: auto; /* Bevarar proportionerna */
        margin: 100px auto; /* Centrerar bilden horisontellt */
        display: block; 
}
#desktopContainer {
    height: 100vh;
    width: 100%;
    background: white; 
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    font-family: 'Arial', sans-serif;
}

#desktop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1; 
    padding: 20px;
    flex-wrap: wrap;
}


#taskBar {
    background-color: #333;
    height: 60px;
    display: flex;
    justify-content: flex-start; 
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-top: 2px solid #ccc;
    padding-left: 20px; 
}

.appIcon {
    background-color: #333;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    border: 2px solid yellow;
    cursor: pointer;
    transition: 0.5s;
    margin-right: 10px;
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.appIcon:hover {
    background-color: yellow;
}
</style>
`
