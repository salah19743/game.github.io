const clickButton = document.getElementById('clickButton');
const scoreDisplay = document.getElementById('score');
const multiplierDisplay = document.getElementById('multiplier');
const upgradeBtn = document.getElementById('upgradeBtn');
const questList = document.getElementById('questList');
const leaderboardList = document.getElementById('leaderboardList');
const clickSound = new Audio('click-sound.mp3');

let score = 0;
let multiplier = 1;
let upgradeCost = 10;
let quests = [];
let playerName = '';

// Load score, multiplier, and quests from local storage if available
if (localStorage.getItem('score')) {
  score = parseInt(localStorage.getItem('score'));
}

if (localStorage.getItem('multiplier')) {
  multiplier = parseInt(localStorage.getItem('multiplier'));
}

if (localStorage.getItem('quests')) {
  quests = JSON.parse(localStorage.getItem('quests'));
}

if (localStorage.getItem('playerName')) {
  playerName = localStorage.getItem('playerName');
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
  leaderboardList.innerHTML = '';
  const scores = Object.entries(localStorage)
                      .filter(([key, value]) => key.startsWith('score'))
                      .sort((a, b) => b[1] - a[1]);
  
  scores.forEach(([key, value], index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${index + 1}. ${value} points - ${localStorage.getItem(`name_${key}`) || 'Anonymous'}`;
    leaderboardList.appendChild(listItem);
  });
}

// Update the quest log
function updateQuestLog() {
  questList.innerHTML = '';
  quests.forEach((quest, index) => {
    const listItem = document.createElement('li');
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
      updateQuestLog();
      changeQuest(quest);
    }
  });
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

// Change quest after completion
function changeQuest(completedQuest) {
  const index = quests.indexOf(completedQuest);
  if (index !== -1) {
    quests.splice(index, 1); // Remove completed quest
    const newQuest = generateRandomQuest();
    quests.push(newQuest); // Add new quest
    updateQuestLog();
  }
}

// Generate a random quest
function generateRandomQuest() {
  const name = `Click ${Math.floor(Math.random() * 50) + 50} times`;
  const target = Math.floor(Math.random() * 500) + 500;
  const reward = Math.floor(Math.random() * 200) + 100;
  return { name, target, progress: 0, reward };
}

// Update the game state periodically
setInterval(function() {
  // Save score, multiplier, and quests to local storage
  localStorage.setItem('score', score);
  localStorage.setItem('multiplier', multiplier);
  localStorage.setItem('quests', JSON.stringify(quests));
  localStorage.setItem('playerName', playerName);
  updateLeaderboard();
}, 10000); // Save every 10 seconds

// Initialize quests
if (quests.length === 0) {
  quests.push(generateRandomQuest());
}
updateQuestLog();

// Prompt player for their name
if (!playerName) {
  playerName = prompt('Please enter your name for the leaderboard:');
}

updateLeaderboard();
