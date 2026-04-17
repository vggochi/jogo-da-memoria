const board = document.getElementById("gameBoard");
const score1Display = document.getElementById("score1");
const score2Display = document.getElementById("score2");
const currentPlayerDisplay = document.getElementById("currentPlayer");

let score1 = 0;
let score2 = 0;
let currentPlayer = 1;

// muitos emojis novos
const symbols = [
  "🐶","🐱","🐭","🐹","🐰","🦊","🐻","🐼","🐨","🐯","🦁","🐮",
  "🐷","🐸","🐵","🐔","🐧","🐦","🐤","🐺","🦄","🐢","🐍","🦖",
  "🐙","🦑","🦀","🐡","🐠","🐳","🐬","🦋","🐞","🐝","🌸","🌻",
  "🌼","🌹","🌷","🌺","🍎","🍌","🍇","🍉","🍒","🍍","🥝","🍓"
];

let cards = [...symbols, ...symbols]; // duplicar pares
cards.sort(() => Math.random() - 0.5);

let firstCard = null;
let lockBoard = false;

// criar cartas
cards.forEach(symbol => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.dataset.symbol = symbol;
  card.innerHTML = "?";
  card.addEventListener("click", flipCard);
  board.appendChild(card);
});

function flipCard() {
  if (lockBoard || this.classList.contains("flipped")) return;

  this.innerHTML = this.dataset.symbol;
  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  if (firstCard.dataset.symbol === this.dataset.symbol) {
    // acerto
    if (currentPlayer === 1) {
      score1++;
      score1Display.textContent = score1;
    } else {
      score2++;
      score2Display.textContent = score2;
    }
    firstCard = null;
  } else {
    // erro
    lockBoard = true;
    setTimeout(() => {
      firstCard.innerHTML = "?";
      firstCard.classList.remove("flipped");
      this.innerHTML = "?";
      this.classList.remove("flipped");
      firstCard = null;
      lockBoard = false;
      // troca jogador
      currentPlayer = currentPlayer === 1 ? 2 : 1;
      currentPlayerDisplay.textContent = `Jogador ${currentPlayer}`;
    }, 1000);
  }
}
