export const template = document.createElement('template')

template.innerHTML = `

<div id='memoryEndScreen'> 
<h2>🎉 Congratulations! 🎉</h2>
<h2> Memory Finished, attempts and time are shown below!</h2>
</div>



<style>

#memoryEndScreen {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 20px;
    width: 100%;
    max-width: 400px;
    margin: 50px auto;
    font-family: 'Arial', sans-serif;
  }

  #memoryEndScreen h2 {
    font-size: 1.8rem;
    color:rgb(241, 190, 48);
    margin-bottom: 10px;
  }


</style>
`
