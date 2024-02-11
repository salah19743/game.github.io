const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const multiplierDisplay = document.getElementById('multiplierValue');
const clickSound = document.getElementById('clickSound');

let score = 0;
let multiplier = 1;

// Load score and multiplier from local storage
window.onload = function() {
  if(localStorage.getItem('clickerScore')) {
    score = parseInt(localStorage.getItem('clickerScore'));
    updateScore();
  }

  if(localStorage.getItem('clickerMultiplier')) {
    multiplier = parseInt(localStorage.getItem('clickerMultiplier'));
    updateMultiplier();
  }
}

// Update the score display
function updateScore() {
  scoreDisplay.textContent = score;
}

// Update the multiplier display
function updateMultiplier() {
  multiplierDisplay.textContent = multiplier;
}

// Increment score when button is clicked
clickButton.addEventListener('click', function() {
  score += multiplier;
  updateScore();
  clickSound.currentTime = 0;
  clickSound.play();
});

// Save score and multiplier to local storage
function saveData() {
  localStorage.setItem('clickerScore', score);
  localStorage.setItem('clickerMultiplier', multiplier);
}

// Increase multiplier
function upgradeMultiplier() {
  if (score >= 100) {
    score -= 100;
    multiplier += 1;
    updateScore();
    updateMultiplier();
    saveData();
  } else {
    alert("You need at least 100 score to upgrade the multiplier!");
  }
}
