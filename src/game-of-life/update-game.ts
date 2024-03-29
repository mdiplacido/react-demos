function finalizeBoard(board: number[][]) {
  let hasChanges = false;
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
      const state = board[rowIdx][colIdx];
      if (state === 1) {
        hasChanges = true;
      }
      board[rowIdx][colIdx] = state >> 1;
    }
  }

  return hasChanges;
}

function getNeighborSum(board: number[][], row: number, col: number): number {
  // max case is that we sum eight neighbors, must consider corner cases.
  // check north, south, east, west and if we go off the board nothing to
  // consider there.
  const north = row > 0 ? board[row - 1][col] : 0;
  const south = row < board.length - 1 ? board[row + 1][col] : 0;
  const east = board[row][col + 1] || 0;
  const west = board[row][col - 1] || 0;

  // other positions
  const northEast = (row > 0 && board[row - 1][col + 1]) || 0;
  const northWest = (row > 0 && board[row - 1][col - 1]) || 0;
  const southEast = (row < board.length - 1 && board[row + 1][col + 1]) || 0;
  const southWest = (row < board.length - 1 && board[row + 1][col - 1]) || 0;

  return (
    (north & 1) +
    (south & 1) +
    (east & 1) +
    (west & 1) +
    (northEast & 1) +
    (northWest & 1) +
    (southEast & 1) +
    (southWest & 1)
  );
}

/**
 Do not return anything, modify board in-place instead.
 */
function updateGameState(board: number[][]): boolean {
  for (let rowIdx = 0; rowIdx < board.length; rowIdx++) {
    for (let colIdx = 0; colIdx < board[rowIdx].length; colIdx++) {
      const state = board[rowIdx][colIdx];
      const neighborSum = getNeighborSum(board, rowIdx, colIdx);

      // single dead to
      if (state === 0) {
        if (neighborSum === 3) {
          // bring back to life
          board[rowIdx][colIdx] = board[rowIdx][colIdx] | 2;
        }
        continue;
      }

      // alive cases:
      if (!(neighborSum < 2 || neighborSum > 3)) {
        // got this far cell lives on.
        // turn cell on.
        board[rowIdx][colIdx] = board[rowIdx][colIdx] | 2;
      }
    }
  }

  return finalizeBoard(board);
}

export { updateGameState };
