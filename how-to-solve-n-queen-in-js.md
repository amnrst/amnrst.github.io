[back to home](./index.html)

## How to solve n-queen in JavaScript

The $n-queen$ puzzle is the problem of placing $n$ queen chess pieces on a $n×n$ board.

Here is one of the possible solutions for a $5×5$ board.
As you can see, no two queens threaten each other.
@import "assets/5x5-queen.svg" { width=320px height=320px title="5 by 5 solution"}

We want to count all possible solutions for a given $n×n$ board.

We will write a naive implementation to check all the possibilities.

```javascript {cmd="node"}
function nQueen(n) {

  // create a "n x n" array
  const board = Array(n).fill()
        .map(() => Array(n).fill(0));

  const threatensCol = (j) => {
    for (let i = 0; i < n; ++i) {
      if (board[i][j]) {
        return true;
      }
    }
  };

  // ...
```

The *threatensCol* is self explanatory, it checks previous columns to see if a flag is set.

Checking the board diagonally is a bit of trouble.

@import "assets/5x5-queen-diagonally.svg" { width=320px height=320px title="checking the board diagonally"}

We need to play a bit with the indices $i$ and $j$.
```javascript
function nQueen(n) {
  const board = Array(n).fill(Array(n).fill(false));
  const threatensRow = (i) => { /* ... */ }
  const threatensCol = (j) => { /* ... */ };

  const threatensDiagonally = (i, j) => {
    for (let k = 1; k < n; ++k) {
      // check up and left
      if (i - k >= 0 && j - k >= 0) {
        if (board[i - k][j - k]) {
          return true;
        }
      }
      // check up and right
      if (i - k >= 0 && j + k < n) {
        if (board[i - k][j + k]) {
          return true;
        }
      }
    }
  };

  // ...
```

The next step is to traverse the board, for that we use the *nQueen* function recursively. We start at the first row, try to put a new *queen* at that row, and call *nQueen* for the next row.

```javascript
// row, is the where we are trying to put a new queen
// n, is the dimension of the board
// board, holds the current state as a 2d array
function nQueen(row, n, board) {
  let solutions = 0;
  // ...
  return solutions;
}
```

If we ever get to the last row, that means we've found a solution. Otherwise try to sum up all possible solutions by calling *nQueen* recursively for the next row.

```javascript
function nQueen(row, n, board) {
  // ...
  let solutions = 0;
  for(let j = 0; j < n; ++j) {
      if(!threatensCol(j) && !threatensDiagonally(row, j)) {
          board[row][j] = 1;
          solutions += nQueen(row + 1, n, board);
          board[row][j] = 0;
      }
  }
  return solutions;
```

Here is the full source code, [n-queen.js](./code-samples/n-queen.js).

Let's try it for $n = 5$.

```javascript
const n = 5;
const board = Array(n).fill()
  .map(() => Array(n).fill(0));

const solutions = nQueen(0, n, board)
console.log({solutions})
```

Here is the output

```
[
  [ 1, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 1 ],
  [ 0, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0 ]
]
[
  [ 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 0, 1, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1 ],
  [ 0, 0, 1, 0, 0 ]
]
...
[
  [ 0, 0, 0, 0, 1 ],
  [ 0, 0, 1, 0, 0 ],
  [ 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0 ],
  [ 0, 1, 0, 0, 0 ]
]
{ solutions: 10 }
```