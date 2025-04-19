// Memory Game - JavaScript DOM Manipulation Task

// A 4x4 memory game with matching pairs A-H (each appearing twice)

const gameContainer = document.createElement("div");
gameContainer.className = "game-board";
document.body.appendChild(gameContainer);

const letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
const cardValues = [...letters, ...letters];

// Shuffle the cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(cardValues);

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;

function createCard(letter) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.letter = letter;

  const inner = document.createElement("div");
  inner.className = "card-inner";

  const front = document.createElement("div");
  front.className = "front";
  front.textContent = "?";

  const back = document.createElement("div");
  back.className = "back";
  back.textContent = letter;

  inner.appendChild(front);
  inner.appendChild(back);
  card.appendChild(inner);

  card.addEventListener("click", () => flipCard(card));
  return card;
}

function flipCard(card) {
  if (lockBoard || card === firstCard || card.classList.contains("matched"))
    return;

  card.classList.add("flipped");

  if (!firstCard) {
    firstCard = card;
  } else {
    secondCard = card;
    checkForMatch();
  }
}

function checkForMatch() {
  const isMatch = firstCard.dataset.letter === secondCard.dataset.letter;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  firstCard.querySelector(".card-inner").style.transform = "rotateY(180deg)";
  secondCard.querySelector(".card-inner").style.transform = "rotateY(180deg)";
  resetBoard();
  matchedPairs++;
  if (matchedPairs === 8) {
    setTimeout(
      () => alert("🎉 Congratulations! You've matched all pairs!"),
      500
    );
  }
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

// Display game instructions and wish the player good luck
const instructions = document.createElement("div");
instructions.className = "instructions";
instructions.innerHTML = `
  <h2>🎯 Memory Game Instructions</h2>
  <p>Find all the matching pairs of cards. You can flip only two cards at a time.</p>
  <ul>
    <li>Click on a card to reveal its hidden letter.</li>
    <li>If two cards match, they will stay face up.</li>
    <li>If they don’t match, they will flip back after 1 second.</li>
    <li>The game ends when all 8 pairs are matched.</li>
  </ul>
  <p style="font-weight: bold;">💖 Good luck and have fun!</p>
`;

document.body.prepend(instructions);

cardValues.forEach((letter) => {
  const card = createCard(letter);
  gameContainer.appendChild(card);
});


cardValues.forEach((letter) => {
  const card = createCard(letter);
  gameContainer.appendChild(card);
});
