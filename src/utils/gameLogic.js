const SIZE = 4;

export function getEmptyBoard() {
  return Array(SIZE)
    .fill()
    .map(() => Array(SIZE).fill(0));
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function addRandomTile(board) {
  const emptyTiles = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) emptyTiles.push([r, c]);
    }
  }
  if (emptyTiles.length === 0) return board;

  const newBoard = board.map((row) => [...row]);
  const [r, c] = emptyTiles[getRandomInt(emptyTiles.length)];
  newBoard[r][c] = Math.random() < 0.9 ? 2 : 4;
  return newBoard;
}

function transpose(board) {
  const newBoard = getEmptyBoard();
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      newBoard[c][r] = board[r][c];
    }
  }
  return newBoard;
}

function reverse(board) {
  return board.map((row) => [...row].reverse());
}

function compress(board) {
  const newBoard = board.map((row) => {
    let newRow = row.filter((val) => val !== 0);
    while (newRow.length < SIZE) {
      newRow.push(0);
    }
    return newRow;
  });
  return newBoard;
}

function merge(board) {
  const newBoard = board.map((row) => [...row]);
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE - 1; c++) {
      if (newBoard[r][c] !== 0 && newBoard[r][c] === newBoard[r][c + 1]) {
        newBoard[r][c] *= 2;
        newBoard[r][c + 1] = 0;
      }
    }
  }
  return newBoard;
}

export function moveLeft(board) {
  let boardCopy = board.map((row) => [...row]);
  boardCopy = compress(boardCopy);
  boardCopy = merge(boardCopy);
  boardCopy = compress(boardCopy);
  return boardCopy;
}

export function moveRight(board) {
  let boardCopy = board.map((row) => [...row]);
  boardCopy = reverse(boardCopy);
  boardCopy = moveLeft(boardCopy);
  return reverse(boardCopy);
}

export function moveUp(board) {
  let boardCopy = board.map((row) => [...row]);
  boardCopy = transpose(boardCopy);
  boardCopy = moveLeft(boardCopy);
  return transpose(boardCopy);
}

export function moveDown(board) {
  let boardCopy = board.map((row) => [...row]);
  boardCopy = transpose(boardCopy);
  boardCopy = moveRight(boardCopy);
  return transpose(boardCopy);
}

export function isGameOver(board) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] === 0) return false;
      if (c < SIZE - 1 && board[r][c] === board[r][c + 1]) return false;
      if (r < SIZE - 1 && board[r][c] === board[r + 1][c]) return false;
    }
  }
  return true;
}

export function initializeBoard() {
  let newBoard = getEmptyBoard();
  newBoard = addRandomTile(newBoard);
  newBoard = addRandomTile(newBoard);
  return newBoard;
}