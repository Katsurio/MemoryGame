const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

let firstClicked = null;
let secondClicked = null;
let firstColor = '';
let secondColor = '';
let attempts = 0;
let matchCount = 0
let totalPossibleMatches = 5


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  let gameBoard = document.querySelector('#game');
  

  if(firstClicked === null) {
    gameBoard.classList.toggle('noClicks')
    firstClicked = event.target;
    firstColor = firstClicked.classList.value;
    firstClicked.style.backgroundColor = firstColor;
    firstClicked.classList.add('clicked');
    setTimeout(function(){
      gameBoard.classList.toggle('noClicks');
    },1000)
  } else {
    gameBoard.classList.toggle('noClicks')
    secondClicked = event.target;
    secondColor = secondClicked.classList.value;
    secondClicked.style.backgroundColor = secondColor;
    secondClicked.classList.add('clicked');
    setTimeout(function(){
      gameBoard.classList.toggle('noClicks');
    },1000)
    

    if (firstColor === secondColor) {
      console.log("Match");
      ++attempts;
      ++matchCount;
      firstColor = '';
      secondColor = '';
      firstClicked.classList.add('noClicks');
      secondClicked.classList.add('noClicks');
      firstClicked = null;
      secondClicked = null;

      if(matchCount === totalPossibleMatches) {
        console.log("YOU WON!!!");
      }
      // debugger;
    } else {
      console.log("NOT A MATCH");
      setTimeout(function () {
        ++attempts;
        firstColor = '';
        secondColor = '';
        firstClicked.classList.remove('clicked');
        secondClicked.classList.remove('clicked');
        firstClicked.style.backgroundColor = '';
        secondClicked.style.backgroundColor = '';
        firstClicked = null;
        secondClicked = null;
      }, 1000)
    }
  } 

}

// when the DOM loads
createDivsForColors(shuffledColors);
