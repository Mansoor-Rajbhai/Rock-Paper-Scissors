// Safely parse stored JSON or fall back to default scores
let score = JSON.parse(localStorage.getItem("score")) || {
  won: 0,
  lost: 0,
  tie: 0,
};

const icons = {
  rock: '<i class="fa-solid fa-hand-back-fist"></i>',
  paper: '<i class="fa-solid fa-hand"></i>',
  scissors: '<i class="fa-solid fa-hand-scissors"></i>',
  none: '<i class="fa-solid fa-x"></i>',
};

// Helper function to update score display elements
function updateUI() {
  const won = document.getElementById("won");
  const lost = document.getElementById("lost");
  const tie = document.getElementById("tie");

  if (won && lost && tie) {
    won.innerHTML = `Won : ${score.won}`;
    lost.innerHTML = `Lost : ${score.lost}`;
    tie.innerHTML = `Tie : ${score.tie}`;
  }
}

const pDisplay = document.getElementById("player");
const cDisplay = document.getElementById("comp");

function play(move) {
  // Generate computer move
  const compSel = Math.random();
  let compMove = "";

  if (compSel < 1 / 3) {
    compMove = "rock";
  } else if (compSel < 2 / 3) {
    compMove = "paper";
  } else {
    compMove = "scissors";
  }

  // Determine winner
  if (move === compMove) {
    score.tie++;
  } else if (
    (move === "rock" && compMove === "scissors") ||
    (move === "paper" && compMove === "rock") ||
    (move === "scissors" && compMove === "paper")
  ) {
    score.won++;
  } else {
    score.lost++;
  }

  // Update choices display
  pDisplay.innerHTML = `You - ${icons[move]}`;
  cDisplay.innerHTML = `Computer - ${icons[compMove]}`;

  // Save to localStorage & refresh score UI
  localStorage.setItem("score", JSON.stringify(score));
  updateUI();
}

// Render saved scores immediately on load
updateUI();

function resetScore() {
  ((score.won = 0), (score.lost = 0), (score.tie = 0));
  localStorage.removeItem("score");
  updateUI();
  pDisplay.innerHTML = `You - ${icons["none"]}`;
  cDisplay.innerHTML = `Computer - ${icons["none"]}`;
}
