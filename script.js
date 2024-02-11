const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const multiplierDisplay = document.getElementById('multiplier');
const upgradeBtn = document.getElementById('upgradeBtn');
const questList = document.getElementById('questList');
const leaderboardList = document.getElementById('leaderboardList');
const clickSound = document.getElementById('clickSound');

let score = 0;
let multiplier = 1;
let upgradeCost = 10;

// Load score from local storage if available
let savedScore = localStorage.getItem('score');
if (savedScore !== null) {
  score = parseInt(savedScore);
}

// Load multiplier from local storage if available
let savedMultiplier = localStorage.getItem('multiplier');
if (savedMultiplier !== null) {
  multiplier = parseInt(savedMultiplier);
  updateMultiplierDisplay();
}

// Update the score display
function updateScore() {
  scoreDisplay.textContent = score;
}

// Update the multiplier display
function updateMultiplierDisplay() {
  multiplierDisplay.textContent = `Multiplier: x${multiplier}`;
}

// Update the upgrade button display
function updateUpgradeBtn() {
  upgradeBtn.textContent = `Upgrade Multiplier (Cost: ${upgradeCost})`;
}

// Update the leaderboard
function updateLeaderboard() {
  // Clear previous entries
  leaderboardList.innerHTML = '';
  // Retrieve and display leaderboard from local storage
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith('score')) {
      let listItem = document.createElement('li');
      listItem.textContent = `${localStorage.getItem(key)} points`;
      leaderboardList.appendChild(listItem);
    }
  }
}

// Update the quest log
function updateQuestLog() {
  // Clear previous entries
  questList.innerHTML = '';
  // Populate quest log with available quests
  // Implement your quest system here
}

// Increase score when button is clicked
clickButton.addEventListener('click', function() {
  score += multiplier;
  updateScore();
  clickSound.play();
});

// Upgrade multiplier when upgrade button is clicked
upgradeBtn.addEventListener('click', function() {
  if (score >= upgradeCost) {
    score -= upgradeCost;
    multiplier++;
    upgradeCost *= 2;
    updateScore();
    updateMultiplierDisplay();
    updateUpgradeBtn();
  } else {
    alert('Not enough points to upgrade!');
  }
});

// Update the game state periodically
setInterval(function() {
  // Save score and multiplier to local storage
  localStorage.setItem('score', score);
  localStorage.setItem('multiplier', multiplier);
  updateLeaderboard();
  updateQuestLog();
}, 10000); // Save every 10 seconds
