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
debugger;
let firstClicked = null;
let secondClicked = null;
let firstColor = '';
let secondColor = '';
let score = 0;
let matchCount = 0
let lowestScore = localStorage.getItem('lowestScore') || 100;
let totalPossibleMatches = 5
let scoreboard = document.querySelector('#score span');


// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked

  if(firstClicked === null) {
    gameContainer.classList.toggle('noClicks')
    firstClicked = event.target;
    firstColor = firstClicked.classList.value;
    firstClicked.style.backgroundColor = firstColor;
    firstClicked.classList.add('clicked');
    setTimeout(function(){
      gameContainer.classList.toggle('noClicks');
    },1000)
  } else {
    gameContainer.classList.toggle('noClicks')
    secondClicked = event.target;
    secondColor = secondClicked.classList.value;
    secondClicked.style.backgroundColor = secondColor;
    secondClicked.classList.add('clicked');
    setTimeout(function(){
      gameContainer.classList.toggle('noClicks');
    },1000)
    

    if (firstColor === secondColor) {
      ++score;
      scoreboard.innerText = score;
      ++matchCount;
      firstColor = '';
      secondColor = '';
      firstClicked.classList.add('noClicks');
      secondClicked.classList.add('noClicks');
      firstClicked = null;
      secondClicked = null;

      if(matchCount === totalPossibleMatches) {
        let wonbanner = document.createElement('div');
        wonbanner.setAttribute('id',"winner");
        wonbanner.innerText = 'Winner, winner, chicken brunch!';
        gameContainer.insertAdjacentElement('beforebegin', wonbanner);
        debugger;
        if(score < lowestScore) {
          debugger;
          localStorage.setItem('lowestScore', score);
        }
      }
    } else {
      setTimeout(function () {
        ++score;
        scoreboard.innerText = score;
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
let startBtn = document.querySelector('#start-btn');
let bestScore = document.querySelector('#best-score span');
bestScore.innerText = lowestScore || 0;
startBtn.addEventListener('click', function(evt) {
  evt.preventDefault;
  createDivsForColors(shuffledColors);
});

let restartBtn = document.querySelector('#restart-btn');
restartBtn.addEventListener('click', function(evt) {
  gameContainer.innerHTML = '';
  let container = document.querySelector('.container');
  container.appendChild(gameContainer);
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
});
