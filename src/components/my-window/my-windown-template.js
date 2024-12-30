export const template = document.createElement('template')

template.innerHTML = `
<div id="myWindow">
  <div id="windowHeader">
    <span id="windowTitle">Hala Madrid</span>
    <button id="closeButton">&times</button>
  </div>
  <div id="windowContent"> 
    <slot></slot>
  </div>
</div>

<style>

    .hidden {
        display: none;
    }
#myWindow {
  top: 5%;
  left: 5%;
  height: min-content;
  border-radius: 8px;
  border: solid 1px #e2e2e2;
  background-color: white;
  z-index: 1;
  position: fixed;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  overflow: hidden;
}

#windowHeader {
  cursor: move;
  background-color:rgb(63, 104, 192);
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-size: 16px;
  font-weight: bold;
  border-bottom: 1px solid #ddd;
}

#windowTitle {
  flex-grow: 1;
  text-align: left;
}

#closeButton {
  background-color: red;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  width: 30px;
  height: 30px;
  line-height: 28px;
  text-align: center;
  border-radius: 20%;
  cursor: pointer;
  transition: background-color 0.3s;
}

#closeButton:hover {
  background-color: darkred;
}

#closeButton:active {
  background-color: crimson;
}

#windowContent {
  padding: 10px;
  font-family: Arial, sans-serif;
  font-size: 14px;
  color: #333;
}
</style>
`
