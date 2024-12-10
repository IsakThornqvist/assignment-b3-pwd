export const template = document.createElement('template')

template.innerHTML = `
<div id='desktopContainer'> 
    <div id='desktop'>

    </div>
</div>

<div id='taskBar'>
    <button class='appIcon' id='appLogo1'>1</button>
    <button class='appIcon' id='appLogo2'>2</button>
    <button class='appIcon' id='appLogo3'>3</button>
</div>

<style>
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
    background-color: lightgreen;
    color: black;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.5s;
    margin-right: 10px;
    width: 50px;
    height: 50px;
}

.appIcon:hover {
    background-color: yellow;
}
</style>
`
