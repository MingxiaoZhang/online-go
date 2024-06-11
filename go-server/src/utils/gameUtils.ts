import { Piece } from "../enum";

type Board = Piece[][];

export const playMove = (board: Board, row: number, col: number, color: keyof typeof Piece) => {
  if (!isValidMove(board, row, col, Piece[color])) {
    return color;
  }
  board[row][col] = Piece[color];
  console.log(board);
  const neighbors: [number, number][] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];
  const visited: boolean[][] = Array.from({ length: board.length }, () => Array(board.length).fill(false));
  visited[row][col] = true;
  for (const [r, c] of neighbors) {
    if (r < 0 || r >= board.length || c < 0 || c >= board.length || board[r][c] === color || board[r][c] === Piece.NONE) {
      continue
    }
    if (isGroupSurrounded(board, r, c, board[r][c], visited)) {
      removeSurrounded(board, r, c, board[r][c]);
    }
  }
  return color === 'BLACK' ? 'WHITE' : 'BLACK';
}

export const makeBotMove = (board: Board, color: Piece) => {
  const emptyCells = [];

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === Piece.NONE) {
        emptyCells.push({ row: i, col: j });
      }
    }
  }
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const {row, col} = emptyCells[randomIndex];

  board[row][col] = color;
  return
}
export const isGroupSurrounded = (board: Board, row: number, col: number, color: Piece, visited: boolean[][]): boolean => {
  if (
    row < 0 ||
    row >= board.length ||
    col < 0 ||
    col >= board[0].length ||
    visited[row][col] ||
    (board[row][col] !== color && board[row][col] !== Piece.NONE)
  ) {
    return true;
  } 
  if (board[row][col] === Piece.NONE) {
    return false;
  }

  visited[row][col] = true;
  const neighbors: [number, number][] = [
    [row - 1, col],
    [row + 1, col],
    [row, col - 1],
    [row, col + 1],
  ];

  for (const [r, c] of neighbors) {
    if (!isGroupSurrounded(board, r, c, color, visited)) {
      return false;
    }
  }

  return true;
}

export const removeSurrounded = (board: Board, row: number, col: number, color: Piece): void => {
    console.log(color);
    if (
        row < 0 ||
        row >= board.length ||
        col < 0 ||
        col >= board[0].length ||
        board[row][col] !== color
      ) {
        return;
      }
      board[row][col] = Piece.NONE;
      const neighbors: [number, number][] = [
        [row - 1, col],
        [row + 1, col],
        [row, col - 1],
        [row, col + 1],
      ];
      for (const [r, c] of neighbors) {
        removeSurrounded(board, r, c, color);
      }
      return;
}

export const isValidMove = (board: Board, row: number, col: number, color: Piece): boolean => {
  return true;
}