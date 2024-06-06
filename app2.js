const btnRock = document.getElementById('rock');
const btnPaper = document.getElementById('paper');
const btnScissor = document.getElementById('scissors');
const btnReload = document.getElementById('reload');
const resultUser = document.getElementById('result-user');
const resultCpu = document.getElementById('result-cpu');
const selectedUser = document.getElementById('selected-user');
const selectedCpu = document.getElementById('selected-cpu');
const pSelectedUser = document.getElementById('p-selected-user');
const pSelectedCpu = document.getElementById('p-selected-cpu');
const PGanadorPartida = document.getElementById('ganador-partida');

let userScore = 0;
let cpuScore = 0;

const choices = {
    rock: { name: 'Piedra', src: './assets/rock.jpg', beats: 'scissors' },
    paper: { name: 'Papel', src: './assets/paper.jpg', beats: 'rock' },
    scissors: { name: 'Tijeras', src: './assets/scissors.jpg', beats: 'paper' }
};

function userPlay(choice) {
    if (userScore < 3 && cpuScore < 3) {
        pSelectedUser.textContent = `Usuario seleccionó ${choices[choice].name}.`;
        selectedUser.src = choices[choice].src;
        const cpuChoice = getCpuChoice();
        determineWinner(choice, cpuChoice);
    }
}

function getCpuChoice() {
    const keys = Object.keys(choices);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    pSelectedCpu.textContent = `CPU seleccionó ${choices[randomKey].name}.`;
    selectedCpu.src = choices[randomKey].src;
    return randomKey;
}

function determineWinner(userChoice, cpuChoice) {
    if (userChoice === cpuChoice) {
        PGanadorPartida.textContent = '¡Empate!';
    } else if (choices[userChoice].beats === cpuChoice) {
        userScore++;
        resultUser.textContent = `${userScore}`;
        PGanadorPartida.textContent = '¡Usuario gana esta ronda!';
    } else {
        cpuScore++;
        resultCpu.textContent = `${cpuScore}`;
        PGanadorPartida.textContent = '¡CPU gana esta ronda!';
    }
    checkForGameWinner();
}

function checkForGameWinner() {
    if (userScore === 3 || cpuScore === 3) {
        const winner = userScore === 3 ? 'Usuario' : 'CPU';
        disableButtons();
        Swal.fire({
            title: "¡Juego terminado!",
            text: `${winner} es el ganador!`,
            
        }).then(() => {
            resetGame();
        });
    }
}

function resetGame() {
    userScore = 0;
    cpuScore = 0;
    resultUser.textContent = '0';
    resultCpu.textContent = '0';
    pSelectedUser.textContent = '';
    pSelectedCpu.textContent = '';
    selectedUser.src = '';
    selectedCpu.src = '';
    PGanadorPartida.textContent = '';
    enableButtons();
}

function disableButtons() {
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissor.disabled = true;
}

function enableButtons() {
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissor.disabled = false;
}

btnRock.addEventListener('click', () => userPlay('rock'));
btnPaper.addEventListener('click', () => userPlay('paper'));
btnScissor.addEventListener('click', () => userPlay('scissors'));
btnReload.addEventListener('click', resetGame);


function disableButtons() {
    btnRock.disabled = true;
    btnPaper.disabled = true;
    btnScissor.disabled = true;
}

function enableButtons() {
    btnRock.disabled = false;
    btnPaper.disabled = false;
    btnScissor.disabled = false;
}

btnRock.addEventListener('click', () => userPlay('rock'));
btnPaper.addEventListener('click', () => userPlay('paper'));
btnScissor.addEventListener('click', () => userPlay('scissors'));
btnReload.addEventListener('click', resetGame);
