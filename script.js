let score = 0;
let timer = 30;
let gameInterval;
let objectInterval;
let difficulty = 'easy';

const object = document.getElementById('object');
const scoreValue = document.getElementById('score');
const timeLeft = document.getElementById('time-left');
const startBtn = document.getElementById('start-btn');
const difficultySelect = document.getElementById('difficulty-select');

startBtn.addEventListener('click', startGame);
object.addEventListener('click', () => {
    score++;
    scoreValue.textContent = score;
    moveObject();
});

function startGame() {
    score = 0;
    scoreValue.textContent = score;
    timer = 30;
    timeLeft.textContent = timer;
    clearInterval(gameInterval);
    clearInterval(objectInterval);

    gameInterval = setInterval(updateTimer, 1000);
    updateDifficulty();
    moveObject();
}

function updateTimer() {
    timer--;
    timeLeft.textContent = timer;
    if (timer === 0) {
        clearInterval(gameInterval);
        clearInterval(objectInterval);
        alert(`Time's up! Your final score is ${score}.`);
    }
}

function moveObject() {
    const maxX = document.getElementById('game-container').offsetWidth - object.offsetWidth;
    const maxY = document.getElementById('game-container').offsetHeight - object.offsetHeight;

    object.style.left = '0px';
    object.style.top = '0px';

    objectInterval = setInterval(() => {
        const newX = Math.floor(Math.random() * maxX);
        const newY = Math.floor(Math.random() * maxY);
        object.style.left = `${newX}px`;
        object.style.top = `${newY}px`;
    }, getSpeed());
}

function getSpeed() {
    switch (difficulty) {
        case 'easy':
            return 2000;
        case 'medium':
            return 1500;
        case 'hard':
            return 1000;
    }
}

function updateDifficulty() {
    difficulty = difficultySelect.value;
}
