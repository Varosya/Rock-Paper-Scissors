let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0, losses: 0, ties: 0
};

updateScoreElement();

const resetButton = document.querySelector('.reset-button');
resetButton.addEventListener('click', () => resetScore());

document.body.addEventListener('keydown', (event) => {
    event.key === 'Backspace' ? resetScore() : false;
});

function resetScore() {
    const message = document.querySelector('.confirmation-message');
    message.innerHTML = `<p class="confirmation-message">
                Are you sure you want to reset the score?
                <button class="yes-button">Yes</button>
                <button class="no-button">No</button>
            </p>`

    const yesButton = document.querySelector('.yes-button');
    const noButton = document.querySelector('.no-button');

    yesButton.addEventListener('click', () => {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
        message.innerHTML = '';
    });

    noButton.addEventListener('click', () => {
        message.innerHTML = '';
    });
}

const autoButton = document.querySelector('.auto-play-button');
autoButton.addEventListener('click', () => autoPlay());

document.body.addEventListener('keydown', (event) => {
    event.key === 'a' ? autoPlay() : false;
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
    if (!isAutoPlaying) {
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
        autoButton.innerHTML = 'Stop Playing';
    } else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoButton.innerHTML = 'Auto Play';
    }
}

document.querySelector('.js-rock-button')
    .addEventListener('click', () => {playGame('rock');});

document.querySelector('.js-paper-button')
    .addEventListener('click', () => {playGame('paper');});

document.querySelector('.js-scissors-button')
    .addEventListener('click', () => {playGame('scissors');});


document.body.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'r':
            playGame('rock');
            break;
        case 'p':
            playGame('paper');
            break;
        case 's':
            playGame('scissors');
            break;
    }
});

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    const outcomes = {
        rock:     { rock: 'Tie.',      paper: 'You lose.', scissors: 'You win!' },
        paper:    { rock: 'You win!',  paper: 'Tie.',      scissors: 'You lose.' },
        scissors: { rock: 'You lose.', paper: 'You win!',  scissors: 'Tie.' }
    };

    const result = outcomes[playerMove][computerMove];

    switch (result) {
        case 'You win!':
            score.wins += 1;
            break;
        case 'You lose.':
            score.losses += 1;
            break;
        case 'Tie.':
            score.ties += 1;
            break;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `
            You <img src="images/${playerMove}-emoji.png" class="move-icon">
            <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;
}

function updateScoreElement() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
    const moves = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * moves.length);
    
    return moves[randomIndex];
}