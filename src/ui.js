import { state, resetBoard } from './state.js';
import { checkWin } from './game.js';
import { getBestMove } from './ai.js';

export function renderScreens() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <!-- Modal for game over -->
    <div id="game-modal" class="modal">
      <div class="modal-content card">
        <h2 id="modal-title" class="modal-title"></h2>
        <button id="btn-restart" class="btn btn-primary">Play Again</button>
        <button id="btn-home" class="btn btn-secondary">Main Menu</button>
      </div>
    </div>

    <!-- Screen 1: Player 1 Name -->
    <div id="screen-name1" class="screen card active">
      <h1>Tic Tac Toe</h1>
      <p>Enter your core identity.</p>
      <input type="text" id="input-name1" placeholder="Player 1 Name" autocomplete="off" />
      <button id="btn-next1" class="btn btn-primary">Continue</button>
    </div>

    <!-- Screen 2: Mode Selection -->
    <div id="screen-mode" class="screen card">
      <h1>Select Mode</h1>
      <p>Choose your opponent.</p>
      <button id="btn-single" class="btn btn-primary">Single Player vs AI</button>
      <button id="btn-multi" class="btn btn-secondary">Multiplayer (Local)</button>
    </div>

    <!-- Screen 3: Player 2 Name (Multiplayer) -->
    <div id="screen-name2" class="screen card">
      <h1>Challenger</h1>
      <p>Enter Player 2 name.</p>
      <input type="text" id="input-name2" placeholder="Player 2 Name" autocomplete="off" />
      <button id="btn-next2" class="btn btn-primary">Start Game</button>
    </div>

    <!-- Screen 4: Game Board -->
    <div id="screen-game" class="screen card" style="max-width: 600px; margin: 0 auto;">
      <div class="game-header">
        <div class="player-score player-x" id="score-p1">Player 1 (X)</div>
        <div class="status-badge" id="turn-indicator">X's Turn</div>
        <div class="player-score player-o" id="score-p2">Player 2 (O)</div>
      </div>
      <div class="board" id="board">
        ${Array(9).fill(0).map((_, i) => `<div class="cell" data-index="${i}"></div>`).join('')}
      </div>
      <button id="btn-quit" class="btn btn-secondary" style="margin-top: 2rem;">Quit Game</button>
    </div>
  `;
  attachListeners();
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function attachListeners() {
  document.getElementById('btn-next1').addEventListener('click', () => {
    const val = document.getElementById('input-name1').value.trim();
    if (val) {
      state.player1Name = val;
      switchScreen('screen-mode');
    } else {
      document.getElementById('input-name1').focus();
    }
  });

  // Support pressing enter
  document.getElementById('input-name1').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-next1').click();
  });

  document.getElementById('btn-single').addEventListener('click', () => {
    state.mode = 'single';
    state.player2Name = 'AI Interface';
    startGame();
  });

  document.getElementById('btn-multi').addEventListener('click', () => {
    state.mode = 'multi';
    switchScreen('screen-name2');
    setTimeout(() => document.getElementById('input-name2').focus(), 100);
  });

  document.getElementById('btn-next2').addEventListener('click', () => {
    const val = document.getElementById('input-name2').value.trim();
    if (val) {
      state.player2Name = val;
      startGame();
    } else {
      document.getElementById('input-name2').focus();
    }
  });

  document.getElementById('input-name2').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') document.getElementById('btn-next2').click();
  });

  document.getElementById('btn-quit').addEventListener('click', () => {
     switchScreen('screen-name1');
  });

  document.querySelectorAll('.cell').forEach(cell => {
    cell.addEventListener('click', handleCellClick);
  });

  document.getElementById('btn-restart').addEventListener('click', () => {
    document.getElementById('game-modal').classList.remove('show');
    startGame();
  });

  document.getElementById('btn-home').addEventListener('click', () => {
    document.getElementById('game-modal').classList.remove('show');
    switchScreen('screen-name1');
  });
}

function startGame() {
  resetBoard();
  document.getElementById('score-p1').innerText = `${state.player1Name}`;
  document.getElementById('score-p2').innerText = `${state.player2Name}`;
  updateBoardUI();
  updateTurnIndicator();
  switchScreen('screen-game');
}

function handleCellClick(e) {
  if (!state.gameActive) return;
  const index = e.target.getAttribute('data-index');
  
  // Prevent move if cell is filled or if AI's turn
  if (state.board[index] !== null) return;
  if (state.mode === 'single' && state.currentPlayer === 'o') return; 

  makeMove(index, state.currentPlayer);
}

function makeMove(index, player) {
  state.board[index] = player;
  updateBoardUI();
  
  const winState = checkWin(state.board);
  if (winState) {
    handleWin(winState);
    return;
  }

  // Swap turns
  state.currentPlayer = state.currentPlayer === 'x' ? 'o' : 'x';
  updateTurnIndicator();

  // Trigger AI move if single player
  if (state.mode === 'single' && state.currentPlayer === 'o' && state.gameActive) {
    setTimeout(makeAiMove, 500); // slight delay for realism
  }
}

function makeAiMove() {
  if (!state.gameActive) return;
  document.getElementById('turn-indicator').innerText = "AI is thinking...";
  setTimeout(() => {
    const bestMove = getBestMove(state.board);
    if (bestMove !== -1) {
      makeMove(bestMove, 'o');
    }
  }, 400); // UI visual time to "think"
}

function updateBoardUI() {
  const cells = document.querySelectorAll('.cell');
  cells.forEach((cell, i) => {
    const val = state.board[i];
    cell.className = 'cell'; // reset classes
    if (val) {
      cell.classList.add(val, 'occupied');
      cell.innerText = val.toUpperCase();
    } else {
      cell.innerText = '';
    }
  });
}

function updateTurnIndicator() {
  const indicator = document.getElementById('turn-indicator');
  const name = state.currentPlayer === 'x' ? state.player1Name : state.player2Name;
  indicator.innerText = `${name}'s Turn`;
  indicator.className = `status-badge ${state.currentPlayer === 'x' ? 'player-x' : 'player-o'}`;
}

function handleWin(winState) {
  state.gameActive = false;
  if (winState.winner !== 'tie') {
    const cells = document.querySelectorAll('.cell');
    winState.combo.forEach(idx => cells[idx].classList.add('win-highlight'));
  }

  setTimeout(() => showModal(winState), 800);
}

function showModal(winState) {
  const modal = document.getElementById('game-modal');
  const title = document.getElementById('modal-title');
  
  if (winState.winner === 'tie') {
    title.innerText = "It's a Draw!";
    title.className = 'modal-title win-tie';
  } else {
    const winnerName = winState.winner === 'x' ? state.player1Name : state.player2Name;
    title.innerText = `${winnerName} Wins!`;
    title.className = `modal-title win-${winState.winner === 'x' ? 'blue' : 'pink'}`;
  }
  
  modal.classList.add('show');
}
