// src/redux/slices/boardSlice.ts
import { createSlice } from '@reduxjs/toolkit';
import { BoardSize, Piece, PlayerType, TimeControl } from '../../enum';
import { playMove } from '../../util/gameUtil';
import { Player } from '../../types';

export type OnlineGameState = {
  playerId?: number;
  playerName: string;
  roomName: string;
  playerColor: Piece;
  board: Piece[][];
  boardSize: keyof typeof BoardSize;
  timeControl: keyof typeof TimeControl;
  currentPlayer: Piece;
  players: {[key in Piece]: Player};
  isGameStarted: boolean;
  isCreated: boolean;
}

const initialState: OnlineGameState = {
  playerName: 'Guest',
  roomName: '',
  playerColor: Piece.BLACK,
  board: [],
  boardSize: 'SMALL',
  timeControl: 'CLASSIC',
  currentPlayer: Piece.BLACK,
  players: {
    [Piece.BLACK]: {
      name: 'Guest',
    },
    [Piece.WHITE]: {
      name: '',
    },
    [Piece.NONE]: {
      name: '',
    },
  },
  isGameStarted: false,
  isCreated: false
};

const onlineGameSlice = createSlice({
  name: 'onlineGame',
  initialState,
  reducers: {
    setIsCreated: (state, action) => {
      state.isCreated = action.payload;
    },
    startGame: (state, action?) => {
      state.isGameStarted = true;
      if (action?.payload) {
        state.roomName = action.payload.roomName;
        state.boardSize = action.payload.boardSize;
        state.timeControl = action.payload.timeControl;
        const players = action.payload.players;
        state.players = players;
        if (players[Piece.BLACK].id === state.playerId) {
          state.playerColor = Piece.BLACK;
        } else {
          state.playerColor = Piece.WHITE;
        }
      }
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
  },
    updateBoard: (state, action) => {
      const { board, currentPlayer } = action.payload;
      state.board = board;
      state.currentPlayer = currentPlayer;
    },
    setPlayers: (state, action) => {
      const players = action.payload;
      state.players = players;
      if (players[Piece.BLACK].id === state.playerId) {
        state.playerColor = Piece.BLACK;
      } else {
        state.playerColor = Piece.WHITE;
      }
    },
    setPlayerID: (state, action) => {
      state.playerId = action.payload;
      state.players[state.playerColor].id = action.payload;
    },
    setBoardSize: (state, action) => {
        const dimensions = action.payload;
        state.boardSize = dimensions;
        const size = BoardSize[dimensions as keyof typeof BoardSize];
        state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
    },
    resetBoard: (state) => {
      const size = BoardSize[state.boardSize as keyof typeof BoardSize];
      state.board = Array.from({ length: size }, () => Array(size).fill(Piece.NONE));
      state.currentPlayer = Piece.BLACK;
    },
    setPlayerName: (state, action) => {
      state.playerName = action.payload;
      state.players[state.playerColor].name = action.payload;
      console.log(state.playerName);
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    setTimeControl: (state, action) => {
      state.timeControl = action.payload;
    },
    setPlayerColor: (state, action) => {
      state.playerColor = action.payload;
    }
  },
});

export const {
  setIsCreated,
  setPlayerColor,
  setPlayerID,
  startGame,
  setPlayerName,
  setBoardSize,
  resetBoard,
  setPlayers,
  updateBoard,
  setRoomName,
  setTimeControl
} = onlineGameSlice.actions;
export default onlineGameSlice.reducer;
