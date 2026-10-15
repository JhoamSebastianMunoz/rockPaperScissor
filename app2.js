const btnRock = document.getElementById('rock');
const btnPaper = document.getElementById('paper');
const btnScissor = document.getElementById('scissors');
const resultUser = document.getElementById('result-user');
const resultCpu = document.getElementById('result-cpu');
const selectedUser = document.getElementById('selected-user');
const selectedCpu = document.getElementById('selected-cpu');
const pSelectedUser = document.getElementById('p-selected-user');
const pSelectedCpu = document.getElementById('p-selected-cpu');
const verdict = document.getElementById('ganador-partida');
const ruleDetail = document.getElementById('rule-detail');
const pipsUser = document.querySelectorAll('#pips-user .pip');
const pipsCpu = document.querySelectorAll('#pips-cpu .pip');

const IDLE_HEADLINE = 'Elige tu jugada';
const IDLE_DETAIL = 'La piedra aplasta las tijeras. Las tijeras cortan el papel. El papel cubre la piedra.';
const IDLE_NOTE_USER = 'Aún no has jugado.';
const IDLE_NOTE_CPU = 'La CPU espera.';

let userScore = 0;
let cpuScore = 0;
let gameOver = false;

const choices = {
    rock: { name: 'Piedra', phrase: 'La piedra', verb: 'aplasta', src: './assets/icon-piedra.png', beats: 'scissors' },
    paper: { name: 'Papel', phrase: 'El papel', verb: 'cubre', src: './assets/icon-papel.png', beats: 'rock' },
    scissors: { name: 'Tijeras', phrase: 'Las tijeras', verb: 'corta', src: './assets/icon-tijera.png', beats: 'paper' }
};

function userPlay(choice) {
    if (gameOver || userScore >= 3 || cpuScore >= 3) {
        return;
    }
    pSelectedUser.textContent = `Elegiste ${choices[choice].phrase.toLowerCase()}.`;
    selectedUser.src = choices[choice].src;
    const cpuChoice = getCpuChoice();
    determineWinner(choice, cpuChoice);
}

function getCpuChoice() {
    const keys = Object.keys(choices);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    pSelectedCpu.textContent = `La CPU eligió ${choices[randomKey].phrase.toLowerCase()}.`;
    selectedCpu.src = choices[randomKey].src;
    return randomKey;
}

function setVerdict(outcome, headline, detail) {
    verdict.textContent = headline;
    verdict.dataset.outcome = outcome;
    ruleDetail.textContent = detail;
    verdict.classList.remove('is-in');
    void verdict.offsetWidth;
    verdict.classList.add('is-in');
}

function ruleSentence(winner, loser) {
    return `${winner.phrase} ${winner.verb} ${loser.phrase.toLowerCase()}.`;
}

function renderPips() {
    pipsUser.forEach((pip, index) => pip.classList.toggle('is-on', index < userScore));
    pipsCpu.forEach((pip, index) => pip.classList.toggle('is-on', index < cpuScore));
}

function determineWinner(userChoice, cpuChoice) {
    const user = choices[userChoice];
    const cpu = choices[cpuChoice];

    if (userChoice === cpuChoice) {
        setVerdict('draw', 'Empate', `Los dos eligieron ${user.phrase.toLowerCase()}.`);
    } else if (user.beats === cpuChoice) {
        userScore++;
        resultUser.textContent = `${userScore}`;
        setVerdict('user', 'Ganas la ronda', ruleSentence(user, cpu));
    } else {
        cpuScore++;
        resultCpu.textContent = `${cpuScore}`;
        setVerdict('cpu', 'La CPU gana la ronda', ruleSentence(cpu, user));
    }

    renderPips();
    checkForGameWinner();
}

function checkForGameWinner() {
    if (userScore < 3 && cpuScore < 3) {
        return;
    }
    gameOver = true;
    const winner = cpuScore > userScore ? 'CPU' : 'Usuario';
    const high = Math.max(userScore, cpuScore);
    const low = Math.min(userScore, cpuScore);
    disableButtons();
    Swal.fire({
        title: 'Fin de la partida',
        text: `${winner} gana ${high}–${low}.`,
        confirmButtonText: 'Jugar otra vez',
        allowOutsideClick: false
    }).then(() => {
        resetGame();
    });
}

function resetGame() {
    userScore = 0;
    cpuScore = 0;
    gameOver = false;
    resultUser.textContent = '0';
    resultCpu.textContent = '0';
    pSelectedUser.textContent = IDLE_NOTE_USER;
    pSelectedCpu.textContent = IDLE_NOTE_CPU;
    selectedUser.removeAttribute('src');
    selectedCpu.removeAttribute('src');
    setVerdict('idle', IDLE_HEADLINE, IDLE_DETAIL);
    renderPips();
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
document.getElementById('reload').addEventListener('click', resetGame);

renderPips();
