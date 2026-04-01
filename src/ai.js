import { checkWin } from './game.js';

// Evaluate board for minimax
function evaluate(board) {
  const winState = checkWin(board);
  if (winState) {
    if (winState.winner === 'o') return 10;
    if (winState.winner === 'x') return -10;
  }
  return 0;
}

// Minimax algorithm for unbeatable AI
function minimax(board, depth, isMax) {
  const score = evaluate(board);

  // If Maximizer has won
  if (score === 10) return score - depth;
  // If Minimizer has won
  if (score === -10) return score + depth;
  // Tie
  if (!board.includes(null)) return 0; 

  if (isMax) {
    let best = -1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'o';
        best = Math.max(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = 1000;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'x';
        best = Math.min(best, minimax(board, depth + 1, !isMax));
        board[i] = null;
      }
    }
    return best;
  }
}

export function getBestMove(board) {
  let bestVal = -1000;
  let bestMove = -1;

  for (let i = 0; i < 9; i++) {
    if (board[i] === null) {
      board[i] = 'o';
      const moveVal = minimax(board, 0, false);
      board[i] = null; // undo

      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
}
