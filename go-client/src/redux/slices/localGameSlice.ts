// src/redux/slices/gameSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BoardSize, Piece, TimeControl } from '../../enum';
import { playMove } from '../../util/gameUtil';

export type LocalGameState = {
    isGameStarted: boolean;
    board: Piece[][];
    boardSize: keyof typeof BoardSize;
    timeControl: keyof typeof TimeControl;
    currentPlayer: Piece;
    playerName: string;
  }

const initialState: LocalGameState = {
    isGameStarted: false,
    board: [],
    boardSize: 'SMALL',
    timeControl: 'CLASSIC',
    currentPlayer: Piece.BLACK,
    playerName: 'Guest'
  }

const localGameSlice = createSlice({
  name: 'localGame',
  initialState,
  reducers: {
    initBoard: (state) => {
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
    },
    startGame: (state) => {
      state.isGameStarted = true;
    },
    endGame: (state) => {
      state.isGameStarted = false;
    },
    placePiece: (state, action: {payload: {row: number, col: number}}) => {
      const { row, col } = action.payload;
      if (playMove(state.board, row, col, state.currentPlayer)) {
        state.currentPlayer = state.currentPlayer === Piece.BLACK ? Piece.WHITE : Piece.BLACK;
      }
    },
    setBoardSize: (state, action: {payload: keyof typeof BoardSize}) => {
      const dimensions = action.payload;
      state.boardSize = dimensions;
      const size = BoardSize[dimensions];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
    },
    resetBoard: (state) => {
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
    },
    setTimeControl: (state, action) => {
      state.timeControl = action.payload;
    },
  },
});

export const { initBoard, startGame, endGame, placePiece, resetBoard, setBoardSize, setTimeControl } = localGameSlice.actions;
export default localGameSlice.reducer;
