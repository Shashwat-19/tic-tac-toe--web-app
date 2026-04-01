export const state = {
  player1Name: '',
  player2Name: '',
  mode: 'single', // 'single' or 'multi'
  board: Array(9).fill(null), // null, 'x', or 'o'
  currentPlayer: 'x', // 'x' always goes first
  gameActive: false,
};

export function resetBoard() {
  state.board = Array(9).fill(null);
  state.currentPlayer = 'x';
  state.gameActive = true;
}
