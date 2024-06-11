import { ErrorCause, Piece } from "../enum";

type Board = Piece[][];

export const playMove = (board: Board, row: number, col: number, color: Piece) => {
    board[row][col] = color;
    const neighbors: [number, number][] = [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ];
    let isValid = false;
    for (const [r, c] of neighbors) {
      if (r < 0 || r >= board.length || c < 0 || c >= board.length) {
        continue
      }
      if (board[r][c] === Piece.NONE) {
        isValid = true;
        continue
      }
      const visited: boolean[][] = Array.from({ length: board.length }, () => Array(board.length).fill(false));
      if (isGroupSurrounded(board, r, c, board[r][c], visited)) {
        if (board[r][c] !== color) {
          removeSurrounded(board, r, c, board[r][c]);
          isValid = true;
        }
      } else {
        if (board[r][c] === color) {
          isValid = true;
        }
      }
    }
    if (!isValid) {
      board[row][col] = Piece.NONE;
      return false;
    }
    return true;
}

export const isGroupSurrounded = (board: Board, row: number, col: number, color: Piece, visited: boolean[][]): boolean => {
  if (
    row < 0 ||
    row >= board.length ||
    col < 0 ||
    col >= board[0].length
  ) {
    console.log(row, col, 'Out of bounds');
    return true;
  } 
  if (visited[row][col] ||
    (board[row][col] !== color && board[row][col] !== Piece.NONE)) {
      console.log(row, col, visited[row][col]);
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