function nQueen(row, n, board) {
  const threatensCol = (j) => {
    for (let i = 0; i < row; ++i) {
      if (board[i][j]) {
        return true;
      }
    }
  };
  const threatensDiagonally = (i, j) => {
    for (let k = 1; k < n; ++k) {
      // check top - left
      if (i - k >= 0 && j - k >= 0) {
        if (board[i - k][j - k]) {
          return true;
        }
      }
      // check top - right
      if (i - k >= 0 && j + k < n) {
        if (board[i - k][j + k]) {
          return true;
        }
      }
    }
  };

  if(row === n) {
    console.log(board);
    return 1;
  }

  let solutions = 0;
  // try to put a queen in the current row
  for(let j = 0; j < n; ++j) {
      if(!threatensCol(j) && !threatensDiagonally(row, j)) {
          board[row][j] = 1;
          solutions += nQueen(row + 1, n, board);
          board[row][j] = 0;
      }
  }
  return solutions;
}

const n = 5;
const board = Array(n).fill().map(() => Array(n).fill(0));

const solutions = nQueen(0, n, board)
console.log({solutions})
