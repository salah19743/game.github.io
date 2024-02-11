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
let quests = []; // Array to store active quests

// Load score, multiplier, and quests from local storage if available
let savedScore = localStorage.getItem('score');
let savedMultiplier = localStorage.getItem('multiplier');
let savedQuests = localStorage.getItem('quests');

if (savedScore !== null) {
  score = parseInt(savedScore);
}

if (savedMultiplier !== null) {
  multiplier = parseInt(savedMultiplier);
  updateMultiplierDisplay();
}

if (savedQuests !== null) {
  quests = JSON.parse(savedQuests);
  updateQuestLog();
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
  quests.forEach((quest, index) => {
    let listItem = document.createElement('li');
    listItem.textContent = `Quest ${index + 1}: ${quest.name} - Progress: ${quest.progress}/${quest.target}`;
    questList.appendChild(listItem);
  });
}

// Increase score when button is clicked
clickButton.addEventListener('click', function() {
  score += multiplier;
  updateScore();
  clickSound.play();

  // Check quest progress
  quests.forEach(quest => {
    quest.progress += multiplier;
    if (quest.progress >= quest.target) {
      score += quest.reward;
      quest.progress = 0; // Reset quest progress
      updateScore();
    }
  });
  updateQuestLog();
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
  // Save score, multiplier, and quests to local storage
  localStorage.setItem('score', score);
  localStorage.setItem('multiplier', multiplier);
  localStorage.setItem('quests', JSON.stringify(quests));
  updateLeaderboard();
  updateQuestLog();
}, 10000); // Save every 10 seconds

// Initialize quests
quests.push({ name: 'Click 100 times', target: 100, progress: 0, reward: 50 });
quests.push({ name: 'Score 1000 points', target: 1000, progress: 0, reward: 100 });
updateQuestLog();
