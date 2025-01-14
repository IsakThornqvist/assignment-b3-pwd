export const template = document.createElement('template')

template.innerHTML = `
<button id="flipping-tile">
  <div part="frontSide" id="front">?</div>
  <div part="backSide" id="back">
  </div>
</button>

<style>
#flipping-tile {
  position: relative;
  width: 80px;
  height: 80px;
  perspective: 1000px; /* Enables 3D perspective */
  cursor: pointer;
  transform-style: preserve-3d; /* Preserve 3D positions */
  transition: transform 0.6s; /* Smooth rotation */
  border-radius: 20px;
}

#flipping-tile.flipped {
  transform: rotateY(180deg);
}

.hidden {
  display: none;
}

#front,
#back {
  position: absolute; /* Relative to the parent (#flipping-tile) */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  font-size: 50px;
  font-weight: bold;
  color: black;
  border: solid 2px black;
}

#front {
  background-color: rgb(241, 190, 48);
  transform: rotateY(0deg);
}

#back {
  background-color: rgb(63, 104, 192);
  transform: rotateY(180deg);
}

</style>
`
