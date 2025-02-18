const computerScore = document.querySelector(".computerScore");
const playerScore = document.querySelector(".yourScore");
const keys = document.querySelectorAll(".choice-card");
const playingZone = document.querySelector(".choices");
const resultZone = document.querySelector(".result-zone");
const winText = document.querySelector("#win-text");
const lostText = document.querySelector("#lost-text");
const tieText = document.querySelector("#tie-text");
const subText = document.querySelector(".sub-text");
const playAgainBtn = document.querySelector(".playBtn");
const replayBtn = document.querySelector(".replayBtn");
const userRock = document.querySelector("#user-rock");
const pcRock = document.querySelector("#pc-rock");
const userPaper = document.querySelector("#user-paper");
const pcPaper = document.querySelector("#pc-paper");
const userScissor = document.querySelector("#user-scissor");
const pcScissor = document.querySelector("#pc-scissor");
const userIcon = document.querySelector(".user-side-icon");
const pcIcon = document.querySelector(".pc-side-icon");
const rulesBtn = document.querySelector(".rules-btn");
const nextBtn = document.querySelector(".next-btn");
const modal = document.getElementById('rulesModal');
const closeBtn = document.querySelector('.close-btn');

// Open the modal when rules button is clicked
rulesBtn.onclick = function () {
  modal.style.display = 'block';
};

// Close the modal when close button is clicked
closeBtn.onclick = function () {
  modal.style.display = 'none';
};

// Close modal when clicking outside of it
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Close modal when pressing the Escape key
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.style.display === "block") {
    modal.style.display = "none";
  }
});

// Convert the list of keys (rock, paper, scissors) into an array
const keysArray = Array.from(keys);

// Function to get scores from local storage
function updateScoreDisplay() {
  const scoresJSON = localStorage.getItem("scores");
  const updatedScores = scoresJSON
    ? JSON.parse(scoresJSON)
    : { user: 0, computer: 0 };
  computerScore.innerText = updatedScores.computer;
  playerScore.innerText = updatedScores.user;
}
updateScoreDisplay();

// Convert choice to numerical value
const valueOfKey = (name) => {
  let keyVal = 0;
  if (name === "rock") {
    keyVal = 1;
  } else if (name === "paper") {
    keyVal = 2;
  } else if (name === "scissors") {
    keyVal = 3;
  }
  return keyVal;
};

// Random number generator for computer's choice
const getRandomNumber = () => {
  const randomDecimal = Math.random();
  const randomNumber = Math.floor(randomDecimal * 3) + 1;
  return randomNumber;
};

// Function to play Rock, Paper, Scissors and determine the winner
const playRockPaperScissors = (userChoice, compChoice) => {
  if (userChoice === compChoice) {
    return "tie";
  } else if (
    (userChoice === 1 && compChoice === 3) ||
    (userChoice === 2 && compChoice === 1) ||
    (userChoice === 3 && compChoice === 2)
  ) {
    return "user";
  } else {
    return "comp";
  }
};

// Update scores in local storage and on the scoreboard
const updateScores = (result) => {
  const scoresJSON = localStorage.getItem("scores");
  const scores = scoresJSON ? JSON.parse(scoresJSON) : { user: 0, computer: 0 };

  if (result === "user") {
    scores.user += 1;
  } else if (result === "comp") {
    scores.computer += 1;
  }

  localStorage.setItem("scores", JSON.stringify(scores));
  updateScoreDisplay();
};

// Update the display of the user's and computer's choices
const updateResultSides = (userChoice, compChoice) => {
  userRock.style.display = userChoice === 1 ? "block" : "none";
  userPaper.style.display = userChoice === 2 ? "block" : "none";
  userScissor.style.display = userChoice === 3 ? "block" : "none";

  pcRock.style.display = compChoice === 1 ? "block" : "none";
  pcPaper.style.display = compChoice === 2 ? "block" : "none";
  pcScissor.style.display = compChoice === 3 ? "block" : "none";
};

// Reset animation classes for icons
const resetAnimationClasses = () => {
  userRock.classList.remove("winner-animation");
  pcRock.classList.remove("winner-animation");
  userPaper.classList.remove("winner-animation");
  pcPaper.classList.remove("winner-animation");
  userScissor.classList.remove("winner-animation");
  pcScissor.classList.remove("winner-animation");
};

// Update the result zone with the outcome of the game
const updateResultZone = (result, userChoice, compChoice) => {
  playingZone.style.display = "none";
  resultZone.style.display = "flex";
  resetAnimationClasses();

  winText.style.display = result === "user" ? "block" : "none";
  lostText.style.display = result === "comp" ? "block" : "none";
  tieText.style.display = result === "tie" ? "block" : "none";
  subText.style.display = result !== "tie" ? "block" : "none";
  playAgainBtn.style.display = result !== "tie" ? "block" : "none";
  replayBtn.style.display = result === "tie" ? "block" : "none";
  nextBtn.style.display = result === "user" ? "inline" : "none";

  updateResultSides(userChoice, compChoice);

  if (result === "user") {
    if (userChoice === 1) userRock.classList.add("winner-animation");
    if (userChoice === 2) userPaper.classList.add("winner-animation");
    if (userChoice === 3) userScissor.classList.add("winner-animation");
  } else if (result === "comp") {
    if (compChoice === 1) pcRock.classList.add("winner-animation");
    if (compChoice === 2) pcPaper.classList.add("winner-animation");
    if (compChoice === 3) pcScissor.classList.add("winner-animation");
  }
};

// Handler for when a choice is clicked
const keyClickHandler = (event) => {
  const parentDiv = event.target.closest(".choice-card");
  if (parentDiv) {
    const keyClicked = parentDiv.id;
    const userChoice = valueOfKey(keyClicked);
    const compChoice = getRandomNumber();
    const result = playRockPaperScissors(userChoice, compChoice);

    updateScores(result);
    updateResultZone(result, userChoice, compChoice);
  }
};

// Handler for Play Again or Replay
const playAgainHandler = () => {
  playingZone.style.display = "flex";
  resultZone.style.display = "none";
  resetAnimationClasses();
};

// Event listeners for choices and play again button
keysArray.forEach((key) => key.addEventListener("click", keyClickHandler));
replayBtn.addEventListener("click", playAgainHandler);
playAgainBtn.addEventListener("click", playAgainHandler);
nextBtn.addEventListener("click", () => {
  window.location.href = "main.html";
});