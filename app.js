let balance = 0;
let winnings = 0;
let symbols = ['A', 'B', 'C', 'D'];
let symbolValues = { 'A': 5, 'B': 4, 'C': 3, 'D': 2 };

const depositBtn = document.getElementById('deposit-btn');
const spinBtn = document.getElementById('spin-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const balanceDisplay = document.getElementById('balance');
const winningsDisplay = document.getElementById('winnings');
const reel1 = document.getElementById('reel-1');
const reel2 = document.getElementById('reel-2');
const reel3 = document.getElementById('reel-3');
const depositAmountInput = document.getElementById('deposit-amount');
const betPerLineInput = document.getElementById('bet-per-line');
const linesInput = document.getElementById('lines');
const playAgainContainer = document.querySelector('.play-again-container');

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const spinReels = () => {
  const reelResults = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];
  reel1.textContent = reelResults[0];
  reel2.textContent = reelResults[1];
  reel3.textContent = reelResults[2];
  return reelResults;
};

const checkWinnings = (reels, bet, lines) => {
  let winnings = 0;
  for (let i = 0; i < lines; i++) {
    if (reels[i][0] === reels[i][1] && reels[i][1] === reels[i][2]) {
      winnings += bet * symbolValues[reels[i][0]];
    }
  }
  return winnings;
};

const updateBalance = (amount) => {
  balance += amount;
  balanceDisplay.textContent = `$${balance}`;
};

const enableUI = () => {
  depositAmountInput.disabled = false;
  betPerLineInput.disabled = false;
  linesInput.disabled = false;
  depositBtn.disabled = false;
  spinBtn.disabled = true;
  playAgainContainer.style.display = 'none';
};

const disableUI = () => {
  depositAmountInput.disabled = true;
  betPerLineInput.disabled = true;
  linesInput.disabled = true;
  depositBtn.disabled = true;
  spinBtn.disabled = false;
};

depositBtn.addEventListener('click', () => {
  const depositAmount = parseFloat(depositAmountInput.value);
  if (isNaN(depositAmount) || depositAmount <= 0) {
    alert('Please enter a valid deposit amount.');
    return;
  }
  balance = depositAmount;
  updateBalance(0);
  disableUI();
});

spinBtn.addEventListener('click', () => {
  const betPerLine = parseFloat(betPerLineInput.value);
  const lines = parseInt(linesInput.value);
  if (isNaN(betPerLine) || betPerLine <= 0 || betPerLine > balance / lines || isNaN(lines) || lines <= 0 || lines > 3) {
    alert('Please enter valid bet and lines.');
    return;
  }

  balance -= betPerLine * lines;
  const reels = [];
  for (let i = 0; i < lines; i++) {
    reels.push(spinReels());
  }
  
  const totalWinnings = checkWinnings(reels, betPerLine, lines);
  winnings = totalWinnings;
  updateBalance(winnings);

  winningsDisplay.textContent = `$${winnings}`;

  if (balance <= 0) {
    alert('You have run out of money!');
    playAgainContainer.style.display = 'block';
  }
});

playAgainBtn.addEventListener('click', () => {
  enableUI();
  winningsDisplay.textContent = '$0';
  playAgainContainer.style.display = 'none';
});
